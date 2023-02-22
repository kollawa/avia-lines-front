import moment from 'moment';

export const parse = (data) => {
  const { itineraries, travelerPricings } = data;
  const segmentPriceDetails = travelerPricings[0].fareDetailsBySegment;
  const findClassBySegmentId = (id) =>
    segmentPriceDetails.find((segment) => segment.segmentId === id)?.class;

  const segmentsArray = itineraries
    .map(({ segments }) => {
      return segments.map((segment) => {
        return segment;
      });
    })
    .flat()
    .map((segment, index) => {
      segment.flightNumber = index + 1;
      return segment;
    });

  const iata = segmentsArray.map((segment) => {
    const departureTime = moment(segment.departure.at).format('hmmA').split('M').join('');
    const arrivalTime = moment(segment.arrival.at).format('hmmA').split('M').join('');

    return `${segment.flightNumber} ${segment.carrierCode} ${segment.number} ${findClassBySegmentId(
      segment.id
    )} ${moment(segment.departure.at).format('DDMMM').toUpperCase()} ${moment(
      segment.departure.at
    ).day()} ${segment.departure.iataCode}${
      segment.arrival.iataCode
    } ${departureTime} ${arrivalTime} ${moment(segment.arrival.at)
      .format('DDMMM')
      .toUpperCase()} E ${segment.numberOfStops} ${segment.aircraft.code} DB`;
  });
  return iata;
};
