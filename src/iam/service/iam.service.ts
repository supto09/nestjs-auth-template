import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { HashingService } from '@/iam/service/hashing/hashing.service';
import { SignupRequestDto } from '@/iam/dto/signup-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IamService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(signUpRequestDto: SignupRequestDto) {
    const newUser = new UserEntity();
    newUser.email = signUpRequestDto.email;
    newUser.password = await this.hashingService.hash(
      signUpRequestDto.password,
    );

    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException('Sign up request failed', HttpStatus.BAD_REQUEST);
    }
  }
}
