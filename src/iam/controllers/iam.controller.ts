import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IamService } from '@/iam/service/iam.service';
import { SignUpRequestDto } from '@/iam/dto/signup-request.dto';
import { LogInRequestDto } from '@/iam/dto/log-in-request.dto';

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
}
