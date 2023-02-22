import { Box, Button, TextField, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';

import { cabins as cabinsSelectOptions, dateWindow } from '../../constants/selectOptions';
import ControllableSelect from './controllableSelect';
import OnlyUpperCaseTextField from './onlyUpperCaseTextField';


const DestinationsInput = ({ setValue, control, register, watch, name, oneWay }) => {

    const { fields, append, remove } = useFieldArray({
        control,
        name: name
    });

    const lastField = watch(name)
    const lastDestinationLocationCode = lastField?.length ? lastField[lastField.length - 1].destinationLocationCode : null
    const lastCabin = lastField?.length ? lastField[lastField.length - 1].cabin : ''

    const appendNewFields = () => {
        if (fields.length < 8) {
            append({ cabin: lastCabin, originLocationCode: lastDestinationLocationCode, departureDateTimeRange: {} })
        }
    }
    const removeField = () => remove(lastField?.length - 1)

    const handleDate = (fieldName) => (e) => setValue(fieldName, moment(e.target.value).format('YYYY-MM-DD'))

    useEffect(() => {
        if (fields?.length === 0) {
            appendNewFields()
        }
    }, [fields]);

    return (
        <Box display={'flex'} gap={2} flexDirection={'column'}>
            {fields.map((field, index) => (
                <Box key={index} display={'flex'} gap={2} flexDirection={'column'}>
                    {
                        !oneWay &&
                        (
                            <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Destination {index + 1}</Typography>
                        )
                    }
                    <Box display={'flex'} gap={2}>
                        <OnlyUpperCaseTextField
                            label={'Departing from'}
                            register={register(`${name}.${index}.originLocationCode`)}
                        />
                        <OnlyUpperCaseTextField
                            label={'Destination'}
                            register={register(`${name}.${index}.destinationLocationCode`)}
                        />
                    </Box>
                    <Box display={'flex'} gap={2}>
                        <TextField
                            onChange={handleDate(`${name}.${index}.departureDateTimeRange.date`)}
                            value={watch(`${name}.${index}.departureDateTimeRange.date`)}
                            label={'Departure Date from'}
                            InputLabelProps={{ shrink: true }}
                            type={'date'}
                            fullWidth
                        />
                        <ControllableSelect
                            options={dateWindow}
                            label={'Date window'}
                            control={control}
                            name={`${name}.${index}.departureDateTimeRange.dateWindow`}
                        />
                    </Box>
                    <ControllableSelect
                        options={cabinsSelectOptions}
                        label={'Cabin'}
                        control={control}
                        name={`${name}.${index}.cabin`}
                    />
                </Box>
            ))}
            {
                !oneWay &&
                (<Box display={'flex'} gap={2}>
                    <Button
                        disabled={lastField?.length && !lastDestinationLocationCode}
                        color='primary'
                        variant='contained'
                        onClick={appendNewFields}
                    >
                        + Add Destinations
                    </Button>
                    <Button
                        disabled={!lastField || lastField.length < 2}
                        color='error'
                        variant='contained'
                        onClick={removeField}
                    >
                        Remove
                    </Button>
                </Box>)
            }

        </Box>
    )
}



export default DestinationsInput