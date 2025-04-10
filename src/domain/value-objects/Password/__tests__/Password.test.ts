import { describe, it, expect } from 'vitest';
import { Password } from '..';
import { InvalidPasswordError } from '@/domain/exceptions/InvalidPasswordError';

describe('Password', () => {
  const validPassword = 'validPassword123';
  const invalidPassword = 'short';
  it('should create a plain password', () => {
    const password = Password.create(validPassword);
    expect(password.value).toStrictEqual(validPassword);
    expect(password.isHashed()).toBeFalsy();
  });

  it('should create a hashed password', () => {
    const hashedPassword = Password.createHashed(validPassword);
    expect(hashedPassword.value).toStrictEqual(validPassword);
    expect(hashedPassword.isHashed()).toBeTruthy();
  });

  it('should throw error for invalid password', () => {
    expect(() => Password.create(invalidPassword)).toThrow(InvalidPasswordError);
  });

  it('showld compare two  passwords correctly', () => {
    const password1 = Password.create(validPassword);
    const password2 = Password.create(validPassword);
    const password3 = Password.create('anotherPassword123');

    expect(password1.isEqual(password2)).toBeTruthy();
    expect(password1.isEqual(password3)).toBeFalsy();
  });
});
