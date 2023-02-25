import { Box, Button, Divider, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import MultiCity from './components/multiCity';
import OneWay from './components/oneWay';
import RoundTrip from './components/roundTrip';
import { parse } from './utils/iata';

function App() {
  const [tab, setTab] = useState('round-trip');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleChangeTab = (_, value) => {
    setTab(value);
    setData([]);
  };

  return (
    <Box display={'flex'} width={1} height={'100vh'} pt={10} justifyContent={'center'}>
      <Box
        maxWidth={'800px'}
        pl={2}
        pr={2}
        width={{
          xss: '100%',
          md: '50%'
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mb={4}>
          <Tabs value={tab} onChange={handleChangeTab} aria-label='basic tabs example'>
            <Tab label='Round trip' value={'round-trip'} />
            <Tab label='One-way' value={'one-way'} />
            <Tab label='Multi-city' value={'multi-city'} />
          </Tabs>
        </Box>
        {tab === 'round-trip' ? (
          <RoundTrip setError={setError} setData={setData} />
        ) : tab === 'one-way' ? (
          <OneWay setError={setError} setData={setData} />
        ) : (
          <MultiCity setError={setError} setData={setData} />
        )}
        <Box display={'flex'} flexDirection={'column'} gap={2} mt={5} pb={10}>
          {data?.map((flight, index) => {
            return (
              <Paper key={index} display={'flex'} flexDirection={'column'} gap={2}>
                <Box display={'flex'} gap={2} p={1}>
                  <Typography sx={{ fontSize: 16, fontWeight: 700 }}>Price: </Typography>
                  <Typography sx={{ fontSize: 16 }}>
                    {flight.price.total} {flight.price.currency}
                  </Typography>
                </Box>
                <Divider />
                <Box display={'flex'} flexDirection={'column'} gap={1} p={1}>
                  <Iata flight={parse(flight)} />;
                </Box>
              </Paper>
            );
          })}
          <Box mt={4} display={'flex'} justifyContent={'center'}>
            {error ? (
              <Typography sx={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>
                {error}
              </Typography>
            ) : data && !data.length ? (
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                Not found results , type other reuqest !
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;

const Iata = ({ flight }) => {
  const handleCopyClick = () => {
    const textArea = document.createElement('textarea');
    textArea.value = flight.join(`
    `);
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  return (
    <Box display={'flex'} gap={2} flexDirection={'column'}>
      <Box display={'flex'} justifyContent={'flex-end'}>
        <Button height={'30px'} onClick={handleCopyClick} variant='outlined'>
          Copy
        </Button>
      </Box>
      {flight.map((iata, index) => {
        return (
          <Typography key={iata + index} sx={{ fontSize: 14 }}>
            {iata}
          </Typography>
        );
      })}
    </Box>
  );
};
