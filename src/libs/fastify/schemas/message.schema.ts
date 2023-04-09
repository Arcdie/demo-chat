export const getMessagesSchema = {
  querystring: {
    type: 'object',
    required: [
      'page',
    ],
    properties: {
      page: {
        type: 'number',
      },
    },
  },
};

export const getRawMessageSchema = {
  querystring: {
    type: 'object',
    required: [
      'messageId',
    ],
    properties: {
      messageId: {
        type: 'number',
      },
    },
  },
};

export const createTextMessageSchema = {
  body: {
    type: 'object',
    required: [
      'content',
    ],
    properties: {
      content: {
        type: 'string',
      },
    },
  },
};
