import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAlertDto, UpdateAlertDto, AlertType } from "./allert.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable()
export class AlertsService {
  constructor(private prisma: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  async findOrThrow(id: number) {
      const alert = await this.prisma.alert.findUnique({ where: { id } });
      if (!alert) {
          throw new NotFoundException('Alert not found');
      }
      return alert;
  }

  async checkAuth(userId: number, jwtUserId: number) {
    if (userId !== jwtUserId) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }
  }

  async getAllAlerts(userId: number, jwtUserId: number) {
    await this.checkAuth(userId, jwtUserId);
    return this.prisma.alert.findMany({
      where: { userId },
    });
  }

  async getAlerts(userId: number, processed: boolean = false, jwtUserId: number) {
    await this.checkAuth(userId, jwtUserId);
    return this.prisma.alert.findMany({
      where: { userId, processed },
    });
  }

  async createAlert(userId: number, createAlertDto: CreateAlertDto) {
    const alert = await this.prisma.alert.create({
      data: {
        ...createAlertDto,
        userId: userId,
      },
    });
    this.logger.info(`Alert created. ID: ${alert.id}, userID: ${userId}`);
    return alert;
  }

  async getAlertById(id: number, userId: number, jwtUserId: number) {
    await this.checkAuth(userId, jwtUserId);
    const alert = await this.findOrThrow(id);
    await this.checkAuth(alert.userId, jwtUserId);
    await this.prisma.alert.update({
      where: { id },
      data: { processed: true },
    });
    return alert;
  }

  async updateAlert(id: number, updateAlertDto: UpdateAlertDto) {
    await this.findOrThrow(id);
    const updatedAlert = await this.prisma.alert.update({
      where: { id },
      data: updateAlertDto,
    });
    this.logger.info(`Alert updated. ID: ${updatedAlert.id}, userID: ${updatedAlert.userId}`);
    return updatedAlert;
  }

  async deleteAlert(id: number) {
    await this.findOrThrow(id);
    const alert = await this.prisma.alert.delete({
      where: { id },
    });
    this.logger.info(`Alert deleted. ID: ${alert.id}, userID: ${alert.userId}`);
    return alert
  }
}
