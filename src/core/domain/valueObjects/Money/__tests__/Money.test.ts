import { describe, it, expect } from 'vitest';
import { Money } from '..';

describe('Money', () => {
  const defaultCurrency = 'BRL';
  it('should create a Money object from amount', () => {
    const money = Money.createFromAmount(100.5, defaultCurrency);

    expect(money.getAmount()).toStrictEqual(100.5);
    expect(money.getCurrency()).toStrictEqual('BRL');
  });

  it('should add two Money objects', () => {
    const money1 = Money.createFromAmount(50.25, defaultCurrency);
    const money2 = Money.createFromAmount(25.75, defaultCurrency);

    const total = money1.add(money2);

    expect(total.getAmount()).toStrictEqual(76.0);
  });

  it('should subtract two Money objects', () => {
    const money1 = Money.createFromAmount(100, defaultCurrency);
    const money2 = Money.createFromAmount(40, defaultCurrency);

    const result = money1.subtract(money2);

    expect(result.getAmount()).toStrictEqual(60.0);
  });

  it('should multiply a Money object', () => {
    const money = Money.createFromAmount(20, defaultCurrency);
    const value = Money.createFromAmount(3, defaultCurrency);

    const multiplied = money.multiply(value);

    expect(multiplied.getAmount()).toStrictEqual(60.0);
  });

  it('should divide a Money object', () => {
    const money = Money.createFromAmount(100, defaultCurrency);
    const value = Money.createFromAmount(4, defaultCurrency);

    const divided = money.divide(value);

    expect(divided.getAmount()).toStrictEqual(25.0);
  });

  it('should throw error when dividing by zero', () => {
    const money = Money.createFromAmount(100, defaultCurrency);
    const zeroValue = Money.createFromAmount(0, defaultCurrency);

    expect(() => money.divide(zeroValue)).toThrow('Cannot divide by zero');
  });

  it('should detect greater than', () => {
    const money1 = Money.createFromAmount(100, defaultCurrency);
    const money2 = Money.createFromAmount(50, defaultCurrency);

    expect(money1.isGreaterThan(money2)).toStrictEqual(true);
  });

  it('should detect less than', () => {
    const money1 = Money.createFromAmount(20, defaultCurrency);
    const money2 = Money.createFromAmount(40, defaultCurrency);

    expect(money1.isLessThan(money2)).toStrictEqual(true);
  });

  it('should detect zero', () => {
    const zeroMoney = Money.zero(defaultCurrency);

    expect(zeroMoney.isZero()).toStrictEqual(true);
  });

  it('should throw error when adding different currencies', () => {
    const moneyBRL = Money.createFromAmount(100, 'BRL');
    const moneyUSD = Money.createFromAmount(100, 'USD');

    expect(() => moneyBRL.add(moneyUSD)).toThrow('Currencies must match to perform this operation');
  });

  it('should create a negative Money value', () => {
    const negativeAmount = -150.75;
    const money = Money.createFromAmount(negativeAmount, defaultCurrency);

    expect(money.getAmount()).toStrictEqual(negativeAmount);
  });
});
