export const predefinedServices = [
  {
    name: 'Uklon',
    rideFee: 12,
    weekFee: {
      enabled: true,
      value: 20,
    },
    cardFee: {
      enabled: true,
      value: 2,
    },
  },
  {
    name: 'Uber',
    rideFee: 37.5,
    weekFee: {
      enabled: false,
      value: 0,
    },
    cardFee: {
      enabled: false,
      value: 1,
    },
  },
  {
    name: 'OnTaxi',
    rideFee: 9,
    weekFee: {
      enabled: false,
      value: 0,
    },
    cardFee: {
      enabled: true,
      value: 2.5,
    },
  },
];

export const hello = 'world';
