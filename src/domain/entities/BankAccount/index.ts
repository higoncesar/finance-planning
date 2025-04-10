import { Money } from '../../value-objects/Money';
import { Entity } from '@/domain/_shared/Entity';
import { UniqueEntityId } from '@/domain/_shared/UniqueEntityId';

export interface BankAccountProps {
  name: string;
  initialBalance: Money;
  currentBalance: Money;
  userId: UniqueEntityId;
}

export class BankAccount extends Entity<BankAccountProps> {
  private constructor(props: BankAccountProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(props: BankAccountProps, id?: UniqueEntityId) {
    return new BankAccount(props, id);
  }

  get name() {
    return this.props.name;
  }

  get initialBalance() {
    return this.props.initialBalance;
  }

  get currentBalance() {
    return this.props.currentBalance;
  }

  get userId() {
    return this.props.userId;
  }

  setCurrentBalance(amount: Money) {
    this.props.currentBalance = amount;
  }

  setName(name: string) {
    this.props.name = name;
  }
}
