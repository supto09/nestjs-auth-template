import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import {
  DATABASE_CONFIG_KEY,
  DatabaseConfigType,
} from '@/config/configs/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbConfig =
          configService.getOrThrow<DatabaseConfigType>(DATABASE_CONFIG_KEY);

        return {
          type: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: dbConfig.synchronize,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
