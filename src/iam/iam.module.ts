import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserEntity } from '@/iam/entities/user.entity';
import { HashingService } from '@/iam/service/hashing/hashing.service';
import { ByCryptService } from '@/iam/service/hashing/bycrypt.service';
import { IamController } from '@/iam/controllers/iam.controller';
import { IamService } from '@/iam/service/iam.service';
import { UniqueEmailValidator } from '@/iam/validators/unique-email.validator';
import { UserMapper } from '@/iam/mappers/user.mapper';
import jwtConfig from '@/config/configs/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: ByCryptService,
    },
    IamService,
    UniqueEmailValidator,
    UserMapper,
  ],
  controllers: [IamController],
})
export class IamModule {}
