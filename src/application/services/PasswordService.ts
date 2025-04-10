import { hash, compare } from 'bcryptjs';

export class PasswordService {
  static async hash(password: string): Promise<string> {
    return await hash(password, 10);
  }

  static async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
