import LocalStorageDB from 'localstoragedb';
import settings from './model/settings';

const taxistat = new LocalStorageDB('taxistat', localStorage);

const settingsModel = ['initialized', 'fuelConsumption', 'fuelCost', 'lang'];
const servicesModel = ['name', 'rideFee', 'weekFee', 'weekFeeEnabled', 'cardFee', 'cardFeeEnabled'];
const expensesModel = ['name'];

if (taxistat.isNew()) {
  taxistat.createTable('settings', settingsModel);
  taxistat.createTable('services', servicesModel);
  taxistat.createTable('expenses', expensesModel);
  taxistat.commit();
}

export default {
  db: taxistat,
  settings: settings(taxistat),
};
