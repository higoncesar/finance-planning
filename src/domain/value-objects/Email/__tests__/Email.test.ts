import { describe, it, expect } from 'vitest';
import { InvalidEmailError } from '@/domain/exceptions/InvalidEmailError';
import { Email } from '@/domain/value-objects/Email';

describe('Email', () => {
  const emailValue = 'test@example.com';
  const invalidEmailValue = 'invalid-email';

  it('should create a valid email', () => {
    const email = Email.create(emailValue);
    expect(email.value).toBe(emailValue);
  });

  it('should throw error for invalid email', () => {
    expect(() => Email.create(invalidEmailValue)).toThrow(InvalidEmailError);
  });

  it('should create email with lowercase value', () => {
    const email = Email.create(emailValue.toUpperCase());
    expect(email.value).toBe(emailValue.toLowerCase());
  });

  it('should compare correctly two emails', () => {
    const email1 = Email.create(emailValue);
    const email2 = Email.create(emailValue);
    const email3 = Email.create(`${Math.random()}${emailValue}`);
    expect(email1.isEqual(email2)).toBeTruthy();
    expect(email1.isEqual(email3)).toBeFalsy();
  });
});
