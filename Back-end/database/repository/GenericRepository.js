const db = require('../DatabaseConnection');
const mongoose = require('mongoose');

module.exports = class GenericRepository {
  /**
   * Start the repository.
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    await db.getConnection();

    return this;
  }

  /**
   * Returns all records found in the desired model based on the parameters sent.
   *
   * @author Guilherme da Silva Martin
   */
  static async find(model, params) {
    return await model.find(params);
  }

  /**
   * Searches for the parameters in the desired model and returns the first record found.
   *
   * @author Guilherme da Silva Martin
   * @param {*} model
   * @param {*} params
   */
  static async findOne(model, params) {
    return await model.findOne(model, params);
  }

  /**
   * Search data by id.
   *
   * @author Guilherme da Silva Martin
   */
  static async findById(model, params) {
    return await model.findById(new mongoose.Types.ObjectId(params));
  }

  /**
   * Create a new data.
   *
   * @author Guilherme da Silva Martin
   */
  static async create(model, params) {
    return await model.create(params);
  }

  /**
   * Get count of registers based on received parameter.
   *
   * @author Guilherme da Silva Martin
   * @param {*} model
   * @param {*} params
   */
  static async count(model, params) {
    return await model.countDocuments(params);
  }

  /**
   * Delete data by id.
   *
   * @author Guilherme da Silva Martin
   */
  static async deleteById(model, params) {
    return await model.findOneAndDelete({ _id: params });
  }

  /**
   * Delete data.
   *
   * @author Guilherme da Silva Martin
   */
  static async delete(model, params) {
    return await model.deleteOne(params);
  }

  /**
   * Update a register.
   *
   * @author Guilherme da Silva Martin
   * @param {*} paramsSearch
   * @param {*} paramsUpdate
   */
  static async update(model, paramsSearch, paramsUpdate) {
    return await model.findOneAndUpdate(paramsSearch, paramsUpdate);
  }
};
