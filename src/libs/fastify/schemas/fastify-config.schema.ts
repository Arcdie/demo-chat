export const configSchema = {
  type: 'object',
  required: [
    'APP_HOST',
    'APP_PORT',

    'DATABASE_HOST',
    'DATABASE_PORT',
    'DATABASE_USERNAME',
    'DATABASE_PASSWORD',
    'DATABASE_DATABASE',
  ],
  properties: {
    APP_HOST: {
      type: 'string',
    },
    APP_PORT: {
      type: 'number',
    },

    DATABASE_HOST: {
      type: 'string',
    },
    DATABASE_PORT: {
      type: 'number',
    },
    DATABASE_USERNAME: {
      type: 'string',
    },
    DATABASE_PASSWORD: {
      type: 'string',
    },
    DATABASE_DATABASE: {
      type: 'string',
    },
  },
};
