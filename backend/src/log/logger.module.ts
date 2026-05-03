import * as winston from "winston"
import { WinstonModule } from "nest-winston"

export const LoggerModule = WinstonModule.forRoot({
  transports: [
    new winston.transports.File({
      filename: 'logs/app.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});