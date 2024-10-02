import pino, { Logger } from 'pino';

export const logger: Logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',  // Format waktu: y-m-d h:i:s
      messageFormat: '[x_x] => {time} {msg}', // [logger-book] sebelum waktu dan pesan
    },
  },
  level: process.env.PINO_LOG_LEVEL || 'info',

  redact: [], // Prevent sensitive data from being logged
});
