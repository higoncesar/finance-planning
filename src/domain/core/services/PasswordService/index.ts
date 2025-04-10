import { hash } from 'bcryptjs';

export class PasswordService {
  static async hash(password: string): Promise<string> {
    return await hash(password, 10);
  }
}
