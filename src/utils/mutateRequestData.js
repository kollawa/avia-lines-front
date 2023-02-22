export const mutateRequestData = (data) => {
  const cabins = data.originDestinations.map((el, index) => {
      return {
          id: (index + 1).toString(),
          cabin: el.cabin
      }
  })
  const groupedCabins = cabins.reduce((acc, curr) => {
      if (acc[curr.cabin]) {
          acc[curr.cabin].originDestinationIds.push(curr.id);
      } else {
          acc[curr.cabin] = { cabin: curr.cabin, originDestinationIds: [curr.id] };
      }
      return acc;
  }, {});
  data.cabinRestrictions = Object.keys(groupedCabins).map(key => groupedCabins[key])
  data.originDestinations = data.originDestinations.map((el, index) => {
      delete el.cabin
      if (el.dateWindow === null) {
          delete el.dateWindow
      }
      el.id = (index + 1).toString()
      return el
  })

  if(data.travelers){
    data.travelers = data.travelers?.map((traveler, index) => ({ ...traveler, id: (index + 1).toString() }))
  }

  return data
}