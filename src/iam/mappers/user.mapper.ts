import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/iam/entities/user.entity';
import UserDto from '@/iam/dto/user.dto';

@Injectable()
export class UserMapper {
  toDto(entity: UserEntity): UserDto {
    return {
      id: entity.id,
      email: entity.email,
    };
  }
}
