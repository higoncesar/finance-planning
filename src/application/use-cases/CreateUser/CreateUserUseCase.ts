import { CreateUserDTO } from './CreateUserDTO';
import { UserAlreadyExistsError } from './CreateUserErrors';
import { UserFactory } from '@/domain/core/factories/UserFactory';
import { IUserRepository } from '@/domain/repositories/IUserRepository';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new UserAlreadyExistsError(data.email);
    }

    const user = await UserFactory.create(data);

    await this.userRepository.save(user);
  }
}
