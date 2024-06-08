import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { MyConfigModule } from '@/config/my-config.module';
import { CommonModule } from '@/common/common.module';
import { IamModule } from '@/iam/iam.module';

@Module({
  imports: [MyConfigModule, DatabaseModule, CommonModule, IamModule],
})
export class AppModule {}
