export const BIKE_SHARE_TYPES = [
  { value: 'Docked only', label: 'Docked only' },
  { value: 'E-scooters only', label: 'E-scooters only' },
  { value: 'Dockless only', label: 'Dockless only' },
  { value: 'Dockless and e-scooters', label: 'Dockless and e-scooters' },
  { value: 'Docked and e-scooters', label: 'Docked and e-scooters' },
  { value: 'All micro', label: 'All micro' },
  { value: 'E-scooter only (campus)', label: 'E-scooter only (campus)' },
  { value: 'All bikes', label: 'All bikes' },
  { value: 'Dockless only (campus)', label: 'Dockless only (campus)' },
  {
    value: 'Dockless and e-scooters (campus)',
    label: 'Dockless and e-scooters (campus)',
  },
];

export const POLLUTANTS = {
  ['pm_2.5']: {
    value: 'pm_2.5',
    label: 'Fine Particulate Matter',
    html: 'PM<sub>2.5</sub>',
  },
  blackcarbon: { value: 'blackcarbon', label: 'Black Carbon', html: 'BC' },
  ch4: { value: 'ch4', label: 'Methane', html: 'CH<sub>4</sub>' },
  co: { value: 'co', label: 'Carbon Monoxide', html: 'CO' },
  no: { value: 'no', label: 'Nitric Oxide', html: 'NO' },
  no2: { value: 'no2', label: 'Nitrogen Dioxide', html: 'NO<sub>2</sub>' },
  voc: { value: 'voc', label: 'Volatile Organic Compounds', html: 'VOC' },
  o3: { value: 'o3', label: 'Ozone', html: 'O<sub>3</sub>' },
};
