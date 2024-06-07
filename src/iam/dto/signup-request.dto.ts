import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UniqueEmail } from '@/iam/validators/unique-email.validator';

export class SignupRequestDto {
  @ApiProperty({
    example: 'email@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @UniqueEmail({
    message: 'An user is already registered using given email',
  })
  email: string;

  @ApiProperty({ example: '123456!Aa' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
