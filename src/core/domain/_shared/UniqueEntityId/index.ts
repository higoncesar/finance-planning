import { randomUUID } from 'crypto';

export class UniqueEntityId {
  private readonly _value: string;

  constructor(value?: string) {
    this._value = value ?? randomUUID();
  }

  get value(): string {
    return this._value;
  }

  equals(id: UniqueEntityId): boolean {
    return id.value === this._value;
  }
}
