import { User } from '@/domain/entities/User';
import { Email } from '@/domain/value-objects/Email';
import { Password } from '@/domain/value-objects/Password';

interface CreateUserProps {
  email: string;
  password: string;
  name: string;
}

export class UserFactory {
  static async create(props: CreateUserProps): Promise<User> {
    const email = Email.create(props.email);
    const password = Password.createHashed(props.password);

    return User.create({
      email,
      password,
      name: props.name,
    });
  }
}
