import { Response } from 'framework';
import { statusCode } from 'out';

export default async (): Promise<Response> => {
  return { statusCode };
}
