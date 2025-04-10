import { Entity } from '@/domain/_shared/Entity';
import { UniqueEntityId } from '@/domain/_shared/UniqueEntityId';
import { Email } from '@/domain/value-objects/Email';
import { Password } from '@/domain/value-objects/Password';

interface UserProps {
  name: string;
  email: Email;
  password: Password;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    return new User(props, id);
  }

  get email(): Email {
    return this.props.email;
  }

  get password(): Password {
    return this.props.password;
  }

  get name(): string {
    return this.props.name;
  }

  changePassword(newPassword: Password) {
    this.props.password = newPassword;
  }

  changeName(newName: string) {
    this.props.name = newName;
  }
}
