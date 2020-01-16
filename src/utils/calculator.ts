import find from 'lodash/find';
import moment from 'moment';
import { PayTypes } from '../constants';

export const calcTotal = ({ money, moneyCard, tips }) => Number(money) + Number(moneyCard) + Number(tips);

export const calcFuelCost = (fuelConsumption, fuelPrice) => (fuelConsumption / 100) * fuelPrice;

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
  const { rideFee, cardFee, cardFeeEnabled } = find(services, { ID: Number(serviceId) }) || {};

  const { fuelConsumption, fuelPrice, timePrice, timePriceEnabled } = settings;

  const fuelCost = calcFuelCost(fuelConsumption, fuelPrice) * distance;
  const timeCost = timePriceEnabled ? (timePrice / 60) * minutes : 0;

  if (payType === PayTypes.Cash) {
    profit = money - fuelCost - (rideFee || 0) - timeCost + tips;
  }

  if (payType === PayTypes.Card) {
    profit = money - fuelCost - (rideFee || 0) - (cardFeeEnabled ? Number(cardFee || 0) : 0) - timeCost + tips;
  }

  if (payType === PayTypes.CardAndCash) {
    const cashMoney = money - Number(rideFee || 0);
    const cardMoney = moneyCard - Number(rideFee || 0) - (cardFeeEnabled ? Number(cardFee || 0) : 0);
    profit = cashMoney + cardMoney - fuelCost - timeCost + tips;
  }

  return Number(profit).toFixed(2);
};

export const calcPercent = (a, b) => (a * 100) / b;

export const sortByDate = (array, dir) =>
  array.sort((a, b) => {
    if (moment(a.timestamp).isBefore(b.timestamp)) {
      return dir ? 1 : -1;
    }
    if (moment(a.timestamp).isAfter(b.timestamp)) {
      return dir ? -1 : 1;
    }
    return 0;
  });
