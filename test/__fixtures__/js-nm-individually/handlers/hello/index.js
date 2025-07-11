import { http } from 'framework';
import handlerFn from './handler.js';

export const handler = http(handlerFn);
