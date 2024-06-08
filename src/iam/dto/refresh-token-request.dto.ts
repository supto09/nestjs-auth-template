import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenRequestDto {
  @ApiProperty({
    example: 'jwt_refresh_token',
  })
  @IsNotEmpty()
  token: string;
}
