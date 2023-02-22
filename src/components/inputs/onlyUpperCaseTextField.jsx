import { TextField } from '@mui/material';

export default function OnlyUpperCaseTextField({ label, register, disabled }) {
    return (
        <TextField
            label={label}
            {...register}
            disabled={disabled}
            fullWidth
            onChange={(event) => {
                event.target.value = event.target.value.toUpperCase();
            }}
        />
    )
} 