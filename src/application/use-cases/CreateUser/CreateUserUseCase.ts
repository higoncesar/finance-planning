import { CreateUserDTO } from './CreateUserDTO';
import { UserAlreadyExistsError } from './CreateUserErrors';
import { PasswordService } from '@/application/services/PasswordService';
import { UserFactory } from '@/domain/factories/UserFactory';
import { IUserRepository } from '@/domain/repositories/IUserRepository';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new UserAlreadyExistsError(data.email);
    }

    const hashedPassword = await PasswordService.hash(data.password);

    const user = await UserFactory.create({ ...data, password: hashedPassword });

    await this.userRepository.save(user);
  }
}
