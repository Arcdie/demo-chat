export const registerAccountSchema = {
  body: {
    type: 'object',
    required: [
      'login',
      'password',
      'username',
    ],
    properties: {
      login: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      username: {
        type: 'string',
      },
    },
  },
};
