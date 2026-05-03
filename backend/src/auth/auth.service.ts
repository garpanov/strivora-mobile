import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma/prisma.service'
import { SettingsService } from 'src/settings/settings.service'
import { RegisterDto, LoginDto, RefreshDto } from './auth.dto'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private settingsService: SettingsService,
  ) {}

  private exclude(user: any) {
    const { password, ...rest } = user
    return rest
  }

  private async generateTokens(userId: number, email: string) {
    const access_token = this.jwt.sign({ sub: userId, email })

    const refresh_token = uuidv4()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    await this.prisma.refreshToken.create({
      data: { token: refresh_token, userId, expiresAt },
    })

    return { access_token, refresh_token }
  }

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (exists) throw new ConflictException('This email address is already in use')

    const hash = await bcrypt.hash(dto.password, 10)
    const user = await this.prisma.user.create({ data: { ...dto, password: hash } })
    await this.settingsService.createUserSettings(user.id)

    return { user: this.exclude(user), ...await this.generateTokens(user.id, user.email) }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (!user) throw new UnauthorizedException('Invalid email or password')

    const valid = await bcrypt.compare(dto.password, user.password)
    if (!valid) throw new UnauthorizedException('Invalid email or password')

    return { user: this.exclude(user), ...await this.generateTokens(user.id, user.email) }
  }

  async refresh(dto: RefreshDto) {
    const saved = await this.prisma.refreshToken.findUnique({
      where: { token: dto.refresh_token },
      include: { user: true },
    })

    if (!saved) throw new UnauthorizedException('Invalid refresh token')
    if (saved.expiresAt < new Date()) {
      await this.prisma.refreshToken.delete({ where: { id: saved.id } })
      throw new UnauthorizedException('Refresh token expired, please login again')
    }

    await this.prisma.refreshToken.delete({ where: { id: saved.id } })
    return this.generateTokens(saved.user.id, saved.user.email)
  }

  async logout(dto: RefreshDto) {
    await this.prisma.refreshToken.deleteMany({ where: { token: dto.refresh_token } })
    return { message: 'Logged out successfully' }
  }
}