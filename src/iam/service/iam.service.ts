import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { UserEntity } from '@/iam/entities/user.entity';
import { HashingService } from '@/iam/service/hashing/hashing.service';
import { SignUpRequestDto } from '@/iam/dto/signup-request.dto';
import { LogInRequestDto } from '@/iam/dto/log-in-request.dto';
import { UserMapper } from '@/iam/mappers/user.mapper';
import UserDto from '@/iam/dto/user.dto';
import jwtConfig from '@/config/configs/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class IamService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly hashingService: HashingService,
    private readonly userMapper: UserMapper,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigValue: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpRequestDto: SignUpRequestDto) {
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

  async login(logInRequestDto: LogInRequestDto) {
    const user = await this.userRepository.findOneBy({
      email: logInRequestDto.email,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const passwordMatch = await this.hashingService.compare(
      logInRequestDto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new HttpException("Password didn't match", HttpStatus.UNAUTHORIZED);
    }

    const userDto = this.userMapper.toDto(user);
    const accessToken = await this.signToken(
      userDto,
      this.jwtConfigValue.accessTokenLifeTime,
    );
    const refreshToken = await this.signToken(
      userDto,
      this.jwtConfigValue.refreshTokenLifeTime,
    );
    return {
      user: userDto,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  private async signToken(userDto: UserDto, timeToLiveInSeconds: number) {
    return this.jwtService.sign(
      {
        sub: userDto.id,
        email: userDto.email,
      },
      {
        expiresIn: timeToLiveInSeconds,
      },
    );
  }
}
