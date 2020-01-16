export interface IDB {
  createTable: (tableName: string, model: object) => void;
  isNew: () => boolean;
  serialize: () => string;
  commit: () => void;
  insert: (tablename: string, data: object) => Promise<any>;
  update: (tablename: string, data: object, cb: () => object) => Promise<any>;
  deleteRows: (tablename: string, data: object) => Promise<any>;
  queryAll: (tablename: string, data: any) => Promise<any>;
  drop: () => void;
}

export default class Model {
  db: IDB;
  constructor(public name: string, db: IDB) {
    this.name = name;
    this.db = db;
  }

  create(data: object) {
    if (data instanceof Array) {
      data.forEach(el => this.db.insert(this.name, el));
    } else {
      this.db.insert(this.name, data);
    }
    this.db.commit();

    return this.read(data);
  }

  update(data: any) {
    if (data instanceof Array) {
      data.forEach(el => this.db.update(this.name, { ID: el.ID }, () => el));
    } else {
      this.db.update(this.name, { ID: data.ID }, () => data);
    }
    this.db.commit();
    return this.read(data);
  }

  read(params?: object) {
    return Promise.resolve(this.db.queryAll(this.name, params));
  }

  delete(data: object) {
    if (data instanceof Array) {
      data.forEach(el => this.db.deleteRows(this.name, el));
    } else {
      this.db.deleteRows(this.name, data);
    }
    this.db.commit();
    return Promise.resolve(data);
  }
}
