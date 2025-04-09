import { describe, it, expect, beforeEach } from 'vitest';
import { BankAccount, BankAccountProps } from '..';
import { UniqueEntityId } from '@/core/domain/_shared/UniqueEntityId';
import { Money } from '@/core/domain/valueObjects/Money';

describe('BankAccount', () => {
  let props: BankAccountProps;
  const userId = new UniqueEntityId();
  const currency = 'BRL';

  beforeEach(() => {
    props = {
      name: 'Name',
      initialBalance: Money.createFromAmount(0, currency),
      currentBalance: Money.createFromAmount(10, currency),
      userId,
    };
  });

  it('should create a BankAccount entity with the correct properties', () => {
    const id = new UniqueEntityId();

    const bankAccount = new BankAccount(props, id);

    expect(bankAccount.id).toStrictEqual(id);
    expect(bankAccount.userId).toStrictEqual(props.userId);
    expect(bankAccount.name).toStrictEqual(props.name);
    expect(bankAccount.currentBalance).toStrictEqual(props.currentBalance);
    expect(bankAccount.initialBalance).toStrictEqual(props.initialBalance);
    expect(bankAccount.equals(bankAccount)).toBeTruthy();
  });

  it('should update the current balance', () => {
    const bankAccount = new BankAccount(props);

    const newValue = props.currentBalance.add(Money.createFromAmount(10, currency));

    bankAccount.setCurrentBalance(newValue);

    expect(bankAccount.currentBalance).toStrictEqual(newValue);
  });

  it('should update the name', () => {
    const bankAccount = new BankAccount(props);
    const newName = 'New Name';
    bankAccount.setName(newName);

    expect(bankAccount.name).toStrictEqual(newName);
  });
});
