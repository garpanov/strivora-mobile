import { Module } from "@nestjs/common";
import { TipsController } from "./tips.controler";
import { TipsService } from "./tips.service";

@Module({
  controllers: [TipsController],
  providers: [TipsService],
})
export class TipsModule {}