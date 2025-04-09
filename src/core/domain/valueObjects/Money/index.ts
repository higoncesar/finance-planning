// src/domain/value-objects/Money.ts
import Dinero, { Currency, Dinero as DineroType } from 'dinero.js';
import { ValueObject } from '@/core/domain/_shared/ValueObject';

export interface MoneyProps {
  amount: number;
  currency: Currency;
}

export class Money extends ValueObject<MoneyProps> {
  private readonly dinero: DineroType;

  private constructor(props: MoneyProps) {
    super(props);
    this.dinero = Dinero({
      amount: Math.round(props.amount),
      currency: props.currency,
      precision: 2,
    });
  }

  static createFromAmount(amount: number, currency: Currency): Money {
    return new Money({ amount: Math.round(amount * 100), currency });
  }

  static zero(currency: Currency): Money {
    return new Money({ amount: 0, currency });
  }

  add(other: Money): Money {
    this.ensureSameCurrency(other);
    const result = this.dinero.add(other.dinero);
    return new Money({
      amount: result.getAmount(),
      currency: this.getCurrency(),
    });
  }

  subtract(other: Money) {
    this.ensureSameCurrency(other);
    const result = this.dinero.subtract(other.dinero);
    return new Money({
      amount: result.getAmount(),
      currency: this.getCurrency(),
    });
  }

  multiply(multiplier: number) {
    const result = this.dinero.multiply(multiplier);
    return new Money({
      amount: result.getAmount(),
      currency: this.getCurrency(),
    });
  }

  divide(divisor: number): Money {
    if (divisor === 0) {
      throw new Error('Cannot divide by zero');
    }

    const result = this.dinero.divide(divisor);
    return new Money({
      amount: result.getAmount(),
      currency: this.getCurrency(),
    });
  }

  isGreaterThan(other: Money) {
    this.ensureSameCurrency(other);
    return this.dinero.greaterThan(other.dinero);
  }

  isLessThan(other: Money) {
    this.ensureSameCurrency(other);
    return this.dinero.lessThan(other.dinero);
  }

  isZero() {
    return this.dinero.getAmount() === 0;
  }

  getAmount() {
    return this.dinero.getAmount() / 100;
  }

  getRawAmount() {
    return this.dinero.getAmount();
  }

  getCurrency() {
    return this.dinero.getCurrency();
  }

  private ensureSameCurrency(other: Money) {
    if (this.getCurrency() !== other.getCurrency()) {
      throw new Error('Currencies must match to perform this operation');
    }
  }
}
