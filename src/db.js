import LocalStorageDB from 'localstoragedb';
import Model from './Model';

const taxistat = new LocalStorageDB('taxistat', localStorage);

const settingsModel = ['initialized', 'done', 'fuelConsumption', 'fuelPrice', 'lang', 'activeStep'];
const servicesModel = ['name', 'rideFee', 'weekFee', 'weekFeeEnabled', 'cardFee', 'cardFeeEnabled'];
const expensesModel = ['name', 'commentsEnabled'];

if (taxistat.isNew()) {
  taxistat.createTable('settings', settingsModel);
  taxistat.createTable('services', servicesModel);
  taxistat.createTable('expenses', expensesModel);
  taxistat.commit();
}

export default {
  db: taxistat,
  settings: new Model('settings', taxistat),
  services: new Model('services', taxistat),
  expenses: new Model('expenses', taxistat),
};
