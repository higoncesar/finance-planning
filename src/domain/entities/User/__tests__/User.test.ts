import { describe, it, expect } from 'vitest';
import { User } from '..';
import { UniqueEntityId } from '@/domain/_shared/UniqueEntityId';
import { Email } from '@/domain/value-objects/Email';
import { Password } from '@/domain/value-objects/Password';

describe('User', () => {
  const userProps = {
    email: Email.create('user@example.com'),
    password: Password.create('correctPassword123'),
    name: 'John Doe',
  };
  it('should create a user correctly', () => {
    const { name, email, password } = userProps;
    const id = new UniqueEntityId();
    const user = User.create(userProps, id);

    expect(user.id).toStrictEqual(id);
    expect(user.email.value).toStrictEqual(email.value);
    expect(user.password.value).toStrictEqual(password.value);
    expect(user.name).toStrictEqual(name);
  });

  it('should rename the user correctly', () => {
    const user = User.create(userProps);
    const newName = 'New Name';
    user.changeName(newName);
    expect(user.name).toStrictEqual(newName);
  });

  it('should change the password correctly', () => {
    const user = User.create(userProps);
    const newPassword = Password.create('newSecurePass456');
    user.changePassword(newPassword);
    expect(user.password.value).toStrictEqual(newPassword.value);
  });
});
