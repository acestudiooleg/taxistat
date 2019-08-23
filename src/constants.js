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

export const predefinedExpenses = [
  { name: 'fuel', commentsEnabled: false },
  { name: 'insurance', commentsEnabled: false },
  { name: 'parking', commentsEnabled: false },
  { name: 'tech-service', commentsEnabled: true },
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
