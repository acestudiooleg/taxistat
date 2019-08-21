import LocalStorageDB from 'localstoragedb';
import Model from './Model';

const taxistat = new LocalStorageDB('taxistat', localStorage);

export const settingsModel = [
  'done',
  'fuelConsumption',
  'fuelPrice',
  'lang',
  'activeStep',
  'timePrice',
  'timePriceEnabled',
];
export const servicesModel = ['name', 'rideFee', 'weekFee', 'weekFeeEnabled', 'cardFee', 'cardFeeEnabled'];
export const expensesSettingsModel = ['name', 'commentsEnabled'];
export const expensesModel = ['timestamp', 'expenseId', 'expenseName', 'value', 'comment'];
export const ridesModel = [
  'timestamp',
  'serviceId',
  'serviceName',
  'money',
  'moneyCard',
  'payType',
  'tips',
  'rideTime',
  'profit',
  'fuelPrice',
  'fuelConsumption',
];

if (taxistat.isNew()) {
  taxistat.createTable('settings', settingsModel);
  taxistat.createTable('services', servicesModel);
  taxistat.createTable('expensesSettings', expensesSettingsModel);
  taxistat.createTable('expenses', expensesModel);
  taxistat.createTable('rides', ridesModel);
  taxistat.commit();
}

export default {
  db: taxistat,
  settings: new Model('settings', taxistat),
  services: new Model('services', taxistat),
  expensesSettings: new Model('expensesSettings', taxistat),
  expenses: new Model('expenses', taxistat),
  rides: new Model('rides', taxistat),
};
