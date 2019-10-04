export const predefinedServices = [
  {
    name: 'Uklon',
    rideFee: 12,
    weekFee: 20,
    weekFeeEnabled: true,
    cardFee: 2,
    cardFeeEnabled: true,
  },
  {
    name: 'Uber',
    rideFee: 7.5,
    weekFee: 0,
    weekFeeEnabled: false,
    cardFee: 1,
    cardFeeEnabled: false,
  },
  {
    name: 'OnTaxi',
    rideFee: 9,
    weekFee: 0,
    weekFeeEnabled: false,
    cardFee: 2.5,
    cardFeeEnabled: true,
  },
];

export const servicesColors = {
  Uklon: '#33cca1',
  Uber: '#008186',
  OnTaxi: '#ffc107',
};

export const colors = [
  '#33cca1',
  '#ffc107',
  '#4caf50',
  '#03a9f4',
  '#ff9800',
  '#795548',
  '#64dd17',
  '#311b92',
  '#c51162',
];

export const predefinedExpenses = [
  { name: 'fuel', commentsEnabled: false, isFuel: true },
  { name: 'insurance', commentsEnabled: false, isFuel: false },
  { name: 'parking', commentsEnabled: false, isFuel: false },
  { name: 'tech-service', commentsEnabled: true, isFuel: false },
];

export const predefinedFuel = {
  consumption: 9.5,
  price: 30,
};

export const PayTypes = {
  Cash: 'cash',
  Card: 'card',
  CardAndCash: 'cardAndCash',
};
