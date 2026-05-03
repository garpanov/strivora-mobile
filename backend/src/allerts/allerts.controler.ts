import { Controller, Get, Post, Patch, Body, Delete, Param, Query, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AlertsService } from "./allerts.service";
import { CreateAlertDto, UpdateAlertDto, AlertType } from "./allert.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("alerts")
export class AlertsController {
  constructor(private alertsService: AlertsService) {}

  @Get("/all_alerts/user_id/:userId")
  getAllAlerts(@Param("userId") userId: number, @Request() req) {
    return this.alertsService.getAllAlerts(userId, req.user.userId);
  }

  @Get("/user_id/:userId")
  getAlerts(@Param("userId") userId: number, @Query("processed") processed: boolean, @Request() req) {
    return this.alertsService.getAlerts(userId, processed, req.user.userId);
  }

  @Get("/user_id/:userId/alert_id/:alertId")
  getAlertById(@Param("userId") userId: number, @Param("alertId") alertId: number, @Request() req) {
    return this.alertsService.getAlertById(alertId, userId, req.user.userId);
  }

  @Post("/create/user_id/:userId")
  createAlert(@Param("userId") userId: number, @Body() createAlertDto: CreateAlertDto) {
    return this.alertsService.createAlert(userId, createAlertDto);
  }

  @Patch("/update/:id")
  updateAlert(@Param("id") id: number, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertsService.updateAlert(id, updateAlertDto);
  }

  @Delete("/delete/:id")
  deleteAlert(@Param("id") id: number) {
    return this.alertsService.deleteAlert(id);
  }
}
