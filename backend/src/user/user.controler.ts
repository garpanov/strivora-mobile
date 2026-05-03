import { Body, Controller, Get, Post, Patch, Param, UseGuards, Request, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service"
import { UpdateUserDto } from "./user.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Get(":id")
    async getUserInfo(@Param("id") id: number, @Request() req) {
        const userId = req.user.userId;
        return this.userService.getUserInfo(id, userId);
    }

    @Patch(":id")
    async updateUser(@Request() req, @Param("id") id: number, @Body() dto: UpdateUserDto) {
        const userId = req.user.userId;
        return this.userService.updateUser(id, dto, userId);
    }
}