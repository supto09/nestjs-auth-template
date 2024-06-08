import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LogInRequestDto {
  @ApiProperty({
    example: 'email@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456!Aa' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
