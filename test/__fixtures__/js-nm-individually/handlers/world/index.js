import { http } from 'framework';
import handlerFn from '../handler/index.js';

export const handler = http(handlerFn);
