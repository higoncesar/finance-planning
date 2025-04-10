import { ValueObject } from '@/domain/_shared/ValueObject';
import { PasswordRules } from '@/domain/contants/PasswordRules';
import { InvalidPasswordError } from '@/domain/exceptions/InvalidPasswordError';

interface PasswordProps {
  value: string;
  hashed: boolean;
}

export class Password extends ValueObject<PasswordProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: PasswordProps) {
    super(props);
  }

  static create(plain: string, minLength = 6): Password {
    if (!this.isValid(plain)) {
      throw new InvalidPasswordError(minLength);
    }
    return new Password({ value: plain, hashed: false });
  }

  static createHashed(hashed: string): Password {
    return new Password({ value: hashed, hashed: true });
  }

  private static isValid(password: string) {
    return password.length >= PasswordRules.MIN_LENGTH;
  }

  isHashed(): boolean {
    return this.props.hashed;
  }

  public isEqual(password: Password) {
    return this.value === password.value;
  }
}
