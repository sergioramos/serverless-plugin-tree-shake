import { APIGatewayProxyHandler } from 'aws-lambda';
import * as lambda from 'framework';
import handle from './handler'

export const handler: APIGatewayProxyHandler = lambda.http(handle);
