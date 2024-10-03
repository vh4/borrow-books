import pino, { Logger } from 'pino';

export const logger: Logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
      messageFormat: '[x_x] => {time} {msg}', 
    },
  },
  level: process.env.PINO_LOG_LEVEL || 'info',

  redact: [],
});
