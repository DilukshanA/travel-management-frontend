// components/CheckboxAutocomplete.tsx
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeReason, AutocompleteChangeDetails } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type CheckboxAutocompleteProps<T> = {
  label?: string;
  placeholder?: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  value?: T[];
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    value: T[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>
  ) => void;
  disableCloseOnSelect?: boolean;
  width?: number | string;
};

export function CheckboxAutocomplete<T>(props: CheckboxAutocompleteProps<T>) {
  const {
    label = '',
    placeholder = '',
    options,
    getOptionLabel,
    value,
    onChange,
    disableCloseOnSelect = true,
    width = 300,
  } = props;

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect={disableCloseOnSelect}
      options={options}
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={onChange}
      renderOption={(optionProps, option, { selected }) => {
        const { key, ...restProps } = optionProps;
        return (
          <li key={key} {...restProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {getOptionLabel(option)}
          </li>
        );
      }}
      style={{ width }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
}
