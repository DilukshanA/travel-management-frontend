"use client";

import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MapPinIcon from "@mui/icons-material/LocationOn";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Ride, Location } from "@/types/ride";
import LocationInput from "./../../components/map/LocationInput";
import { CheckboxAutocomplete } from "../ui/CheckboxAutocomplete";
import DatePicker from "../ui/DateTimePicker";
import dayjs from 'dayjs';

interface TripFormProps {
  onAddTrip: (trip: Ride) => void;
}

const driversList = [
  { Name: 'The Shawshank Redemption', id: 1994 },
  { Name: 'The Godfather', id: 1972 },
  { Name: 'The Dark Knight', id: 2008 },
  { Name: '12 Angry Men', id: 1957 },
];
const driversList2 = [
  { Name: 'The Shawshank Redemption', id: 1994 },
  { Name: 'The Godfather', id: 1972 },
  { Name: 'The Dark Knight', id: 2008 },
  { Name: '12 Angry Men', id: 1957 },
];

export default function TripForm({ onAddTrip }: TripFormProps) {
  const [distance, setDistance] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [startLocation, setStartLocation] = useState<Location | null>(null);
  const [endLocation, setEndLocation] = useState<Location | null>(null);

  const [selected, setSelected] = React.useState<typeof driversList>([]);

  const [selectedDateTime, setSelectedDateTime] = React.useState<dayjs.Dayjs | null>(dayjs());


  const calculateDistance = async (start: Location, end: Location) => {
    setIsCalculating(true);
    try {
      let response = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248d5c5c8a8a4e64b8bb5c5c8a8a4e64b8b&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`
      );

      if (response.ok) {
        const data = await response.json();
        const distanceInKm = Math.round(
          data.features[0].properties.segments[0].distance / 1000
        );
        setDistance(distanceInKm);
      } else {
        response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=false`
        );
        if (response.ok) {
          const data = await response.json();
          const distanceInKm = Math.round(data.routes[0].distance / 1000);
          setDistance(distanceInKm);
        } else {
          const straight = calculateStraightLineDistance(start, end);
          setDistance(Math.round(straight * 1.3));
        }
      }
    } catch {
      const straight = calculateStraightLineDistance(start, end);
      setDistance(Math.round(straight * 1.3));
    }
    setIsCalculating(false);
  };

  const calculateStraightLineDistance = (start: Location, end: Location): number => {
    const R = 6371;
    const dLat = ((end.lat - start.lat) * Math.PI) / 180;
    const dLon = ((end.lng - start.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((start.lat * Math.PI) / 180) *
        Math.cos((end.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const formik = useFormik({
    initialValues: {
      tripName: "",
    },
    validationSchema: Yup.object({
      tripName: Yup.string().required("Trip name is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!startLocation || !endLocation) {
        alert("Please select start and end locations");
        return;
      }
      const newTrip: Ride = {
        id: Date.now().toString(),
        name: values.tripName,
        startLocation,
        endLocation,
        distance,
        createdAt: new Date().toISOString(),
      };
      onAddTrip(newTrip);
      resetForm();
      setStartLocation(null);
      setEndLocation(null);
      setDistance(0);
    },
  });

  const handleStartLocationChange = (loc: Location | null) => {
    setStartLocation(loc);
    if (loc && endLocation) calculateDistance(loc, endLocation);
  };

  const handleEndLocationChange = (loc: Location | null) => {
    setEndLocation(loc);
    if (startLocation && loc) calculateDistance(startLocation, loc);
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: 600,}}
    >
      <TextField
        label="Ride Name"
        name="tripName"
        value={formik.values.tripName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.tripName && Boolean(formik.errors.tripName)}
        helperText={formik.touched.tripName && formik.errors.tripName}
        fullWidth
      />

      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
        </Stack>
        <LocationInput
          value={startLocation}
          onChange={handleStartLocationChange}
          placeholder="Enter start location"
          label="Start Location"
        />
      </Box>

      <Box>
        <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
        </Stack>
        <LocationInput
          value={endLocation}
          onChange={handleEndLocationChange}
          placeholder="Enter end location"
          label="End Location"
        />
      </Box>

      <TextField
        label="Allocated Distance (km)"
        type="number"
        value={isCalculating ? "" : distance}
        InputProps={{
          readOnly: true,
        }}
        placeholder={isCalculating ? "Calculating..." : "Distance will be calculated automatically"}
        fullWidth
      />

      <CheckboxAutocomplete
        label="Drivers"
        placeholder="Select drivers"
        options={driversList}
        getOptionLabel={(option) => option.Name}
        value={selected}
        onChange={(e, newValue) => setSelected(newValue)}
        width={400}
      />

      <CheckboxAutocomplete
        label="Assistant"
        placeholder="Select Assistant"
        options={driversList}
        getOptionLabel={(option) => option.Name}
        value={selected}
        onChange={(e, newValue) => setSelected(newValue)}
        width={400}
      />

      {/* Vehicle selction */}
      <Autocomplete
        disablePortal
        options={driversList2}
        getOptionLabel={(option) => option.Name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Vehicle" />}
      />

      { /* Date Time*/}
      <DatePicker
        label="Start Date & Time"
        value={selectedDateTime}
        onChange={(newValue) => setSelectedDateTime(newValue)}
        minDateTime={dayjs()}
      />
      <DatePicker
        label="End Date & Time"
        value={selectedDateTime}
        onChange={(newValue) => setSelectedDateTime(newValue)}
        minDateTime={dayjs()}
      />

      {/* seats */}
      <TextField
        label="Total Seats"
        type="number"
        name="seatsAvailable"
        fullWidth
      />
      
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={
          !formik.values.tripName ||
          !startLocation ||
          !endLocation ||
          isCalculating
        }
      >
        {isCalculating ? "Calculating Distance..." : "Add Trip"}
      </Button>
    </Box>
  );
}
