import { describe, it, expect, beforeEach } from 'vitest';
import { CreateUserUseCase } from '../CreateUserUseCase';
import { UserAlreadyExistsError } from '@/domain/exceptions/UserAlreadyExistsError';
import { UserFactory } from '@/domain/factories/UserFactory';
import { UserRepositoryMemory } from '@/infrastructure/database/repositories/memory/UserRepositoryMemory';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: UserRepositoryMemory;

  beforeEach(() => {
    userRepository = new UserRepositoryMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should create a new user successfully', async () => {
    const userData = {
      email: 'newuser@example.com',
      password: 'securePassword123',
      name: 'New User',
    };

    await createUserUseCase.execute(userData);

    const user = await userRepository.findByEmail(userData.email);

    expect(user).not.toBeNull();
    expect(user?.email.value).toStrictEqual(userData.email.toLowerCase());
    expect(user?.name).toStrictEqual(userData.name);
    expect(user?.password.isHashed()).toBeTruthy();
    expect(user?.password.value).not.toStrictEqual(userData.password);
  });

  it('should not allow creating a user with existing email', async () => {
    const userData = {
      email: 'existing@example.com',
      password: 'password123',
      name: 'Existing User',
    };

    const existingUser = await UserFactory.create(userData);
    await userRepository.save(existingUser);

    await expect(() => createUserUseCase.execute(userData)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    );
  });
});
