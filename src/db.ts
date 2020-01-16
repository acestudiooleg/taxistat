import LocalStorageDB from 'localstoragedb';
import Model, { IDB } from './model';

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
export const expensesSettingsModel = ['name', 'commentsEnabled', 'isFuel'];
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

export interface IReq {
  query?: (a?: any, b?: any) => boolean;
}

class DB {
  public name = 'taxistat';
  public db: IDB;
  public settings: Model;
  public services: Model;
  public expensesSettings: Model;
  public expenses: Model;
  public rides: Model;
  constructor() {
    this.db = new LocalStorageDB(this.name, localStorage) as IDB;
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

  init() {
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

  restore(jsonFile: string) {
    this.db.drop();

    window.localStorage.setItem(`db_${this.name}`, jsonFile);
    return new Promise(s => {
      this.init();
      setTimeout(s, 0);
    });
  }

  removeAll() {
    return new Promise(s => {
      this.db.drop();
      setTimeout(s, 0);
    });
  }
}

export default new DB();
