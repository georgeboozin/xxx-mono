import { Injectable } from '@nestjs/common';
import { mockPackageLog } from 'mock-package';

@Injectable()
export class AppService {
  getHello(): string {
    mockPackageLog('nice');
    return 'Hello World!';
  }
}
