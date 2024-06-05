import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API Rest Classes Managment'+ process.env.TYPE;
  }
}
