import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/iam/entities/user.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async validate(email?: string) {
    if (!email) {
      return false;
    }

    const user = await this.userRepository.findOneBy({
      email: email,
    });
    return !user;
  }

  defaultMessage(): string {
    return 'Email is not unique';
  }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
}
