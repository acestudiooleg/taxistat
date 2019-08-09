export default db => ({
  name: 'settings',
  create({
    initialized, fuelConsumption, fuelCost, lang,
  }) {
    const data = {
      initialized,
      fuelConsumption,
      fuelCost,
      lang,
    };
    db.insert(this.name, data);
    db.commit();
    return Promise.resolve(data);
  },
  update({
    ID, initialized, fuelConsumption, fuelCost, lang,
  }) {
    const data = {
      ID,
      initialized,
      fuelConsumption,
      fuelCost,
      lang,
    };
    db.update(this.name, { ID }, () => data);
    return Promise.resolve(data);
  },
  read(params) {
    return Promise.resolve(db.queryAll(this.name, params));
  },
  delete({ ID }) {
    db.deleteRows(this.name, { ID });
    db.commit();
    return Promise.resolve(ID);
  },
});
