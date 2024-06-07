import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/iam/entities/user.entity';
import { HashingService } from '@/iam/service/hashing/hashing.service';
import { ByCryptService } from '@/iam/service/hashing/bycrypt.service';
import { IamController } from '@/iam/controllers/iam.controller';
import { IamService } from '@/iam/service/iam.service';
import { UniqueEmailValidator } from '@/iam/validators/unique-email.validator';
import { UserRepository } from '@/iam/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: HashingService,
      useClass: ByCryptService,
    },
    UserRepository,
    IamService,
    UniqueEmailValidator,
  ],
  controllers: [IamController],
})
export class IamModule {}
