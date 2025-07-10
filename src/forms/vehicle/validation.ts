import * as Yup from "yup";

export const vehicleValidationSchema = Yup.object().shape({
    vehicleName: Yup.string().required('Vehicle name is required'),
    vehicleType: Yup.string().required('Vehicle type is required'),
    vehicleNumber: Yup.string().required('Vehicle number is required'),
    status: Yup.string().required('Vehicle status is required'),
    ownerName: Yup.string().required('Owner name is required'),
    ownerPhone: Yup.string()
        .required('Owner phone number is required')
        .matches(/^\d{10}$/, 'Owner phone number must be 10 digits'),
    totalSeats: Yup.number().required('Number of seats is required').positive().integer(),
})