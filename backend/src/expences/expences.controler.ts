import { Controller, Get, Post, Patch, Body, Param, Delete, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ExpencesService } from "./expences.service";
import { CreateExpenceDto, UpdateExpenceDto } from "./expences.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("expenses")
export class ExpencesController {
    constructor(private expencesService: ExpencesService) {}

    @Get("/user_id/:userId")
    getExpenses(@Param("userId") userId: number, @Request() req) {
        return this.expencesService.getExpences(userId, req.user.userId);
    }

    @Post("/create/user_id/:userId")
    createExpense(@Param("userId") userId: number, @Body() createExpenseDto: CreateExpenceDto, @Request() req) {
        return this.expencesService.createExpence(userId, createExpenseDto, req.user.userId);
    }

    @Patch("/update/:id")
    updateExpense(@Param("id") id: number, @Body() updateExpenseDto: UpdateExpenceDto, @Request() req) {
        return this.expencesService.updateExpence(id, updateExpenseDto, req.user.userId);
    }

    @Delete("/delete/:id")
    deleteExpense(@Param("id") id: number, @Request() req) {
        return this.expencesService.deleteExpence(id, req.user.userId);
    }

}
