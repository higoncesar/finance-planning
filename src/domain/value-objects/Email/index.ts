import { ValueObject } from '@/domain/_shared/ValueObject';
import { InvalidEmailError } from '@/domain/exceptions/InvalidEmailError';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(email: string): Email {
    if (!this.isValid(email)) {
      throw new InvalidEmailError();
    }
    return new Email({ value: email.toLowerCase() });
  }

  private static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public isEqual(email: Email) {
    return this.value === email.value;
  }

  get value(): string {
    return this.props.value;
  }
}
