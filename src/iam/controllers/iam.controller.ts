import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IamService } from '@/iam/service/iam.service';
import { SignUpRequestDto } from '@/iam/dto/signup-request.dto';
import { LogInRequestDto } from '@/iam/dto/log-in-request.dto';
import { RefreshTokenRequestDto } from '@/iam/dto/refresh-token-request.dto';

@ApiTags('Iam')
@Controller('iam')
export class IamController {
  constructor(private readonly iamService: IamService) {}

  @Post('signup')
  signUp(@Body() signUpRequestDto: SignUpRequestDto) {
    return this.iamService.signUp(signUpRequestDto);
  }

  @Post('login')
  login(@Body() logInRequestDto: LogInRequestDto) {
    return this.iamService.login(logInRequestDto);
  }

  @Post('token-refresh')
  async tokenRefresh(@Body() refreshTokenRequestDto: RefreshTokenRequestDto) {
    return this.iamService.tokenRefresh(refreshTokenRequestDto);
  }
}
