export default class Model {
  constructor(name, db) {
    this.name = name;
    this.db = db;
  }

  create(data) {
    if (data instanceof Array) {
      data.forEach(el => this.db.insert(this.name, el));
    } else {
      this.db.insert(this.name, data);
    }
    this.db.commit();
    return Promise.resolve(data);
  }

  update(data) {
    if (data instanceof Array) {
      data.forEach(el => this.db.update(this.name, { ID: el.ID }, () => el));
    } else {
      this.db.update(this.name, { ID: data.ID }, () => data);
    }
    this.db.commit();
    return Promise.resolve(data);
  }

  read(params) {
    return Promise.resolve(this.db.queryAll(this.name, params));
  }

  delete(data) {
    if (data instanceof Array) {
      data.forEach(el => this.db.deleteRows(this.name, el));
    } else {
      this.db.deleteRows(this.name, data);
    }
    this.db.commit();
    return Promise.resolve(data);
  }
}
