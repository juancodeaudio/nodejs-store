const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class CustomerService {
  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes)
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy()
    return { rta: true };
  }
}

module.exports = CustomerService;
