import LocalStorageDB from 'localstoragedb';
import Model from './Model';

export const settingsModel = [
  'done',
  'initialized',
  'fuelConsumption',
  'fuelPrice',
  'lang',
  'currency',
  'distanceName',
  'taxiDriver',
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

class DB {
  constructor() {
    this.name = 'taxistat';
    this.init();
  }

  init() {
    this.db = new LocalStorageDB(this.name, localStorage);
    this.settings = new Model('settings', this.db);
    this.services = new Model('services', this.db);
    this.expensesSettings = new Model('expensesSettings', this.db);
    this.expenses = new Model('expenses', this.db);
    this.rides = new Model('rides', this.db);

    if (this.db.isNew()) {
      this.db.createTable('settings', settingsModel);
      this.db.createTable('services', servicesModel);
      this.db.createTable('expensesSettings', expensesSettingsModel);
      this.db.createTable('expenses', expensesModel);
      this.db.createTable('rides', ridesModel);
      this.db.commit();
    }
  }

  restore(jsonFile) {
    this.db.drop();

    window.localStorage.setItem(`db_${this.name}`, jsonFile);
    return new Promise((s) => {
      this.init();
      setTimeout(s, 0);
    });
  }

  removeAll() {
    return new Promise((s) => {
      this.db.drop();
      setTimeout(s, 0);
    });
  }
}

export default new DB();
