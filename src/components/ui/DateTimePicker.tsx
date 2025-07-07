import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker, MobileDateTimePickerProps } from '@mui/x-date-pickers/MobileDateTimePicker';
import { TextFieldProps } from '@mui/material';

export interface DatePickerProps {
  label?: string;
  value?: Dayjs | null;
  defaultValue?: Dayjs | null;
  onChange?: (newValue: Dayjs | null) => void;
  minDateTime?: Dayjs;
  maxDateTime?: Dayjs;
  slotProps?: MobileDateTimePickerProps['slotProps'];
}

export default function DatePicker({
  label = 'Select date & time',
  value,
  defaultValue,
  onChange,
  minDateTime,
  maxDateTime,
  slotProps,
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker
        label={label}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        minDateTime={minDateTime}
        maxDateTime={maxDateTime}
        slotProps={{
          textField: {
            fullWidth: true,
            error: false,
          } as TextFieldProps,
          ...slotProps,
        }}
      />
    </LocalizationProvider>
  );
}
