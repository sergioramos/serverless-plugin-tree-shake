import { APIGatewayProxyHandler } from 'aws-lambda';
import * as lambda from '../../framework';
import { statusCode } from './out';

export const handler: APIGatewayProxyHandler = lambda.http(
  async (request: lambda.Request): Promise<lambda.Response> => {
    return { statusCode };
  },
);
