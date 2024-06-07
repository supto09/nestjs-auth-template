import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { HashingService } from '@/iam/service/hashing/hashing.service';

@Injectable()
export class ByCryptService implements HashingService {
  async hash(data: string): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }
  compare(data: string, hash: string): Promise<boolean> {
    return compare(data, hash);
  }
}
