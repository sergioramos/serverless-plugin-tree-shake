// from: https://github.com/yldio/asap-hub/blob/4e3f94016e529f809aa6bfb212efc409bcb222d5/apps/user-service/src/framework/lambda.ts

import Boom from '@hapi/boom';
import Bourne from '@hapi/bourne';
import Debug from 'debug';
import Intercept from 'apr-intercept';
import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import Joi from '@hapi/joi';

export interface Request {
  method: 'get' | 'post';
  headers: any;
  params?: any;
  payload?: any;
  query?: any;
}

export interface Response {
  statusCode?: number | undefined;
  payload?: any;
  headers?:
    | {
        [header: string]: string | number | boolean;
      }
    | undefined;
}

export const validate = <T>(
  prop: string,
  value: T,
  schema: Joi.AnySchema,
  options?: Joi.ValidationOptions,
) => {
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
export const http = <T>(
  fn: (request: Request) => Promise<Response> | Response,
) => async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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
  } as Request;

  const [err, result] = await Intercept(fn(request));

  if (err) {
    debug('http:error', err);
    const error = !Boom.isBoom(err)
      ? Boom.boomify(err, {
          statusCode: 500,
          data: {
            error: err,
          },
        })
      : err;

    const data = error.data as { details: unknown };
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
        ...(error.output.headers as
          | { [header: string]: string | number | boolean }
          | undefined),
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
