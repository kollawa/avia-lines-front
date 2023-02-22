import { Box, Button } from '@mui/material';
import { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';

import { travelerTypes } from '../../constants/selectOptions';
import ControllableSelect from './controllableSelect';

const Travelers = ({ control, name }) => {

    const { fields, append, remove } = useFieldArray({
        control,
        name: name
    });

    const appendField = () => append({ travelerType: '' })
    const removeField = (id) => () => remove(id)

    useEffect(() => {
        if (fields?.length === 0) {
            appendField()
        }
    }, [fields]);

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            {
                fields.map((field, index) => (
                    <Box display={'flex'} key={field.id} gap={2}>
                        <ControllableSelect
                            name={`${name}.${index}.travelerType`}
                            options={travelerTypes}
                            label={'Traveler type'}
                            control={control}
                        />
                        <Button onClick={removeField(index)} color='error' sx={{ width: 85 }}>Remove</Button>
                    </Box>
                ))
            }<Box>
                <Button
                    color='primary'
                    onClick={appendField}
                >
                    + Add Travelers
                </Button></Box>

        </Box>
    )
}

export default Travelers