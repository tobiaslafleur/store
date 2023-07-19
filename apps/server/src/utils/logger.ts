import { default as pinoLogger } from 'pino-http';
import { format } from 'date-fns';

declare module 'http' {
  interface IncomingMessage {
    originalUrl: string;
  }
}

const logger = pinoLogger({
  enabled: true,
  customSuccessMessage(request, response, responseTime) {
    return `${format(Date.now(), 'yyyy-MM-dd HH:mm:ss')} HTTP/${
      request.httpVersion
    } ${request.method} ${request.originalUrl} ${
      response.statusCode
    } ${responseTime}ms`;
  },
  transport: {
    target: 'pino-pretty',
    options: {
      hideObject: true,
    },
  },
});

export { logger };
