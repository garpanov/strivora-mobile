import { Module } from "@nestjs/common";
import { AlertsController } from "./allerts.controler";
import { AlertsService } from "./allerts.service";

@Module({
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule {}
