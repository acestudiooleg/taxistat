import LocalStorageDB from 'localstoragedb';
import Model from './Model';

const taxistat = new LocalStorageDB('taxistat', localStorage);

export const settingsModel = ['done', 'fuelConsumption', 'fuelPrice', 'lang', 'activeStep'];
export const servicesModel = ['name', 'rideFee', 'weekFee', 'weekFeeEnabled', 'cardFee', 'cardFeeEnabled'];
export const expensesSettingsModel = ['name', 'commentsEnabled'];

if (taxistat.isNew()) {
  taxistat.createTable('settings', settingsModel);
  taxistat.createTable('services', servicesModel);
  taxistat.createTable('expensesSettings', expensesSettingsModel);
  taxistat.commit();
}

export default {
  db: taxistat,
  settings: new Model('settings', taxistat),
  services: new Model('services', taxistat),
  expensesSettings: new Model('expensesSettings', taxistat),
};
