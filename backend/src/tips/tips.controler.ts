import { Controller, Get, Post, Delete, Patch, Body, Param, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TipsService } from "./tips.service";
import { CreateTipDto, UpdateTipDto } from "./tips.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("tips")
export class TipsController {
    constructor(private tipsService: TipsService) {}

    @Get("/user_id/:userId")
    getTips(@Param("userId") userId: number, @Request() req) {
        return this.tipsService.getTips(userId, req.user.userId);
    }

    @Post("/create/user_id/:userId")
    createTip(@Param("userId") userId: number, @Body() createTipDto: CreateTipDto) {
        return this.tipsService.createTip(userId, createTipDto);
    }

    @Patch("/update/:id")
    updateTip(@Param("id") id: number, @Body() updateTipDto: UpdateTipDto) {
        return this.tipsService.updateTip(id, updateTipDto);
    }

    @Delete("/delete/:id")
    deleteTip(@Param("id") id: number) {
        return this.tipsService.deleteTip(id);
    }
}