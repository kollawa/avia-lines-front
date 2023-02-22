import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

import { formDefaultValues } from '../constants/formDafaultValues';
import { maxNumberOfConnectionsOptions, pages } from '../constants/selectOptions';
import { useHandleFetch } from '../hooks/useFetch';
import { mutateRequestData } from '../utils/mutateRequestData';
import ControllableSelect from './inputs/controllableSelect';
import DestinationsInput from './inputs/destinationInput';
import OnlyUpperCaseTextField from './inputs/onlyUpperCaseTextField';
import Travelers from './inputs/travelers';

const OneWay = ({ setData, setError }) => {
  const { handleSubmit, control, register, reset, setValue, watch } = useForm({ defaultValues: formDefaultValues })

  const { handleFetch, isLoading } = useHandleFetch()

  const handleSearch = async (data) => {
    const mutatedData = mutateRequestData(data)
    const res = await handleFetch({ data: mutatedData, method: 'post', path: 'one-way' })
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
    reset(formDefaultValues)
    setError(null)
    setData([])
  }

  return (
    <Box component={'form'} onSubmit={handleSubmit(handleSearch)} display={'flex'} gap={2} flexDirection={'column'}>
      <OnlyUpperCaseTextField
        label={'Currency'}
        register={register('currencyCode')}
      />
      <DestinationsInput
        setValue={setValue}
        control={control}
        register={register}
        watch={watch}
        name={'originDestinations'}
        oneWay
      />
      <Travelers
        control={control}
        name={'travelers'}
      />
      <Box display={'flex'} gap={2}>
        <ControllableSelect
          name={'maxNumberOfConnections'}
          options={maxNumberOfConnectionsOptions}
          control={control}
          label={'Max Number Of Connections'}
        />
        <ControllableSelect
          name={'maxResults'}
          control={control}
          options={pages}
          label={'Max Results'}
        />
      </Box>
      <Box display={'flex'} gap={3}><LoadingButton loading={isLoading} variant={'contained'} type={'submit'}>Search</LoadingButton><Button variant={'contained'} color={'error'} onClick={clear}>Clear</Button></Box>
    </Box>
  )
}

export default OneWay
