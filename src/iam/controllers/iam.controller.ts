import { Body, Controller, Post } from '@nestjs/common';
import { IamService } from '../service/iam.service';
import { ApiTags } from '@nestjs/swagger';
import { SignupRequestDto } from '@/iam/dto/signup-request.dto';

@ApiTags('Iam')
@Controller('iam')
export class IamController {
  constructor(private readonly iamService: IamService) {}

  @Post('signup')
  signUp(@Body() signUpRequestDto: SignupRequestDto) {
    return this.iamService.signUp(signUpRequestDto);
  }
}
