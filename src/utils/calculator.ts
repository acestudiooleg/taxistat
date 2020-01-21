import find from 'lodash/find';
import moment from 'moment';
import { PayTypes, IService, IRecord } from '../constants';
import { ISettingsData } from '../actions/settings';

interface ICalcTotal {
  money: number | string;
  moneyCard: number | string;
  tips: number | string;
}

interface ICalcProfit {
  services: IService[];
  settings: ISettingsData;
  serviceId: number | string;
  distance: number | string;
  money: number | string;
  moneyCard: number | string;
  tips: number | string;
  rideTime: number | string;
  payType: number | string;
}

export const calcTotal = ({ money, moneyCard, tips }: ICalcTotal) => Number(money) + Number(moneyCard) + Number(tips);

export const calcFuelCost = (fuelConsumption: number, fuelPrice: number) => (fuelConsumption / 100) * fuelPrice;

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
}: ICalcProfit) => {
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

export const calcPercent = (a: number, b: number): number => (a * 100) / b;

export const sortByDate = (array: IRecord[], dir: boolean) =>
  array.sort((a: IRecord, b: IRecord) => {
    if (moment(a.timestamp).isBefore(b.timestamp)) {
      return dir ? 1 : -1;
    }
    if (moment(a.timestamp).isAfter(b.timestamp)) {
      return dir ? -1 : 1;
    }
    return 0;
  });
