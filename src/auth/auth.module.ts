import { Module } from '@nestjs/common';
import { AuthServiceModule } from './service.module';
import { ControllerModule } from './controller.module';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([User]), PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({ secret: 'topSecret51', signOptions: {
    expiresIn: 3600,
  } })],
  providers: [AuthServiceModule, UserRepository, JwtStrategy],
  controllers: [ControllerModule],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
