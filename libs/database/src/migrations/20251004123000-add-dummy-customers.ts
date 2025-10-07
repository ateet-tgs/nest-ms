import { QueryInterface } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkInsert('customers', [
      {
        id: uuidv4(),
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '9998887777',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '8887776666',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone: '7776665555',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete('customers', {}, {});
  },
};
