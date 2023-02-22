import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, TextField } from '@mui/material';
import moment from 'moment';
import { useForm } from 'react-hook-form';

import { formDefaultValues } from '../constants/formDafaultValues';
import { cabins, pages } from '../constants/selectOptions';
import { useHandleFetch } from '../hooks/useFetch';
import ControllableSelect from './inputs/controllableSelect';
import OnlyUpperCaseTextField from './inputs/onlyUpperCaseTextField';

const defaultValues = {
    adults: 0,
    children: 0,
    infants: 0,
    ...formDefaultValues
}

const RoundTrip = ({ setData, setError }) => {
    const { handleSubmit, control, register, reset, setValue, watch } = useForm({ defaultValues: defaultValues })

    const { handleFetch, isLoading } = useHandleFetch()


    const handleDate = (fieldName) => (e) => setValue(fieldName, moment(e.target.value).format('YYYY-MM-DD'))

    const handleSearch = async (data) => {
        data.travelers = data.travelers?.map((traveler, index) => ({ ...traveler, id: (index + 1).toString() }))
        const res = await handleFetch({ data, method: 'post', path: 'round-trip' })
        if (res) {
            if (res.data) {
                setError(null)
                return setData(res.data)
            }
        }
        setData(null)
        setError(res.error?.response?.body || 'Error')

    }

    const clear = () => {
        reset(defaultValues)
        setData([])
        setError(null)
    }

    return (
        <Box component={'form'} onSubmit={handleSubmit(handleSearch)} display={'flex'} gap={2} flexDirection={'column'}>
            <OnlyUpperCaseTextField
                label={'Currency'}
                register={register('currencyCode')}
            />
            <Box display={'flex'} gap={2}>
                <OnlyUpperCaseTextField
                    label={'Departing from'}
                    register={register('originLocationCode')}
                />
                <OnlyUpperCaseTextField
                    label={'Destination to'}
                    register={register('destinationLocationCode')}

                />
            </Box>
            <Box display={'flex'} gap={2}>
                <TextField
                    onChange={handleDate('departureDate')}
                    value={watch('departureDate')}
                    label={'Departure Date'}
                    InputLabelProps={{ shrink: true }}
                    type={'date'}
                    fullWidth
                />
                <TextField
                    onChange={handleDate('returnDate')}
                    value={watch('returnDate')}
                    label={'Return date'}
                    InputLabelProps={{ shrink: true }}
                    type={'date'}
                    fullWidth
                />
            </Box>
            <ControllableSelect
                options={cabins}
                label={'Cabin'}
                control={control}
                name={'cabin'}
            />
            <Box display={'flex'} gap={2}>
                <TextField type={'number'} label={'Adults'} {...register('adults', { valueAsNumber: true })} fullWidth />
                <TextField type={'number'} label={'Children'} {...register('children', { valueAsNumber: true })} fullWidth />
                <TextField type={'number'} label={'Infants'} {...register('infants', { valueAsNumber: true })} fullWidth />
            </Box>
            <ControllableSelect
                name={'maxResults'}
                control={control}
                options={pages}
                label={'Max Results'}
            />
            <Box display={'flex'} gap={3}><LoadingButton loading={isLoading} variant={'contained'} type={'submit'}>Search</LoadingButton><Button variant={'contained'} color={'error'} onClick={clear}>Clear</Button></Box>
        </Box>
    )
}

export default RoundTrip
