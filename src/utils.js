import find from 'lodash/find';
import { PayTypes } from './constants';

export const calcTotal = ({ money, moneyCard, tips }) => Number(money) + Number(moneyCard) + Number(tips);

export const calcProfit = ({
  services,
  settings,
  serviceId,
  distance: d,
  money: m,
  moneyCard: mc,
  tips: t,
  rideTime: mn,
  payType,
}) => {
  let profit = 0;
  const distance = Number(d);
  const money = Number(m);
  const moneyCard = Number(mc);
  const tips = Number(t);
  const minutes = Number(mn);
  const { rideFee, cardFee, cardFeeEnabled } = find(services, { ID: serviceId }) || {};

  const {
    fuelConsumption, fuelPrice, timePrice, timePriceEnabled,
  } = settings;

  const fuelCost = (fuelConsumption / 100) * fuelPrice * distance;
  const timeCost = timePriceEnabled ? (timePrice / 60) * minutes : 0;

  if (payType === PayTypes.Cash) {
    profit = money - fuelCost - rideFee - timeCost + tips;
  }

  if (payType === PayTypes.Card) {
    profit = money - fuelCost - rideFee - (cardFeeEnabled ? cardFee : 0) - timeCost + tips;
  }

  if (payType === PayTypes.CardAndCash) {
    const cashMoney = money - rideFee;
    const cardMoney = moneyCard - rideFee - (cardFeeEnabled ? cardFee : 0);
    profit = cashMoney + cardMoney - fuelCost - timeCost + tips;
  }

  return Number(profit).toFixed(2);
};

export const calcPercent = (a, b) => (a * 100) / b;
