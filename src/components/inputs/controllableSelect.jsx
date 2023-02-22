import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useId } from 'react';
import { Controller } from 'react-hook-form';

const ControllableSelect = ({control, name, options, label}) => {

    const id = useId()

    return(
        <FormControl fullWidth>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <Select  {...field} fullWidth label={label} labelId={id}>
              {options.map((item, index) => {
                return (
                  <MenuItem key={index + item.label} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
      </FormControl>
    )
}

export default ControllableSelect