const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Contatos',
      version: '1.0.0',
      description: 'Documentação de API para Contatos',
      contact: {
        name: 'GitHub Repository',
        url: 'https://github.com/carloseocandido/bloom-test'
      }
    },
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
