// from: https://github.com/yldio/asap-hub/blob/4e3f94016e529f809aa6bfb212efc409bcb222d5/apps/user-service/src/framework/lambda.ts

import Boom from '@hapi/boom';
import Bourne from '@hapi/bourne';
import Debug from 'debug';
import Intercept from 'apr-intercept';

export const validate = (prop, value, schema, options) => {
  const { error, value: res } = schema.validate(value, options);
  if (error) {
    throw Boom.badRequest(`Error "${prop}": ${error.message}`, {
      details: error.details,
    });
  }

  return res;
};

// ensure any thrown exception is handled and returned correctly
const debug = Debug('http');
export const http = (fn) => async (event) => {
  let payload;
  try {
    payload = event.body && Bourne.parse(event.body);
  } catch (err) {
    const boom = Boom.badRequest(err.message);
    return {
      statusCode: boom.output.statusCode,
      body: JSON.stringify(boom.output.payload),
    };
  }

  // lowercase headers
  const headers =
    event.headers &&
    Object.entries(event.headers).reduce((res, [key, value]) => {
      return {
        ...res,
        [key.toLowerCase()]: value,
      };
    }, {});

  const request = {
    method: event.httpMethod.toLocaleLowerCase(),
    headers,
    params: event.pathParameters,
    payload,
    query: event.queryStringParameters,
  };

  const [err, result] = await Intercept(fn(request));

  if (err) {
    debug('http:error', err);
    const error = Boom.isBoom(err)
      ? err
      : Boom.boomify(err, {
          statusCode: 500,
          data: {
            error: err,
          },
        });

    const { data } = error;
    const payload =
      data && data.details
        ? {
            ...error.output.payload,
            details: data.details,
          }
        : error.output.payload;

    return {
      statusCode: error.output.statusCode,
      body: JSON.stringify(payload),
      headers: {
        'content-type': 'application/json',
        ...error.output.headers,
      },
    };
  }

  return {
    statusCode: result.statusCode || 200,
    body: result.payload && JSON.stringify(result.payload),
    headers: {
      'content-type': 'application/json',
      ...result.headers,
    },
  };
};
