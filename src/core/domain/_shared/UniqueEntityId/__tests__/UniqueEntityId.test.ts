import { describe, it, expect } from 'vitest';
import { UniqueEntityId } from '..';

describe('UniqueEntityId', () => {
  it('should create a UniqueEntityId with a random UUID when no value is provided', () => {
    const id = new UniqueEntityId();

    expect(id.value).toBeTypeOf('string');
    expect(id.value).toHaveLength(36); // UUID length
  });

  it('should create a UniqueEntityId with the provided value', () => {
    const customValue = 'custom-uuid-value';
    const id = new UniqueEntityId(customValue);

    expect(id.value).toStrictEqual(customValue);
  });

  it('should return true when comparing two UniqueEntityIds with the same value', () => {
    const customValue = 'same-uuid';
    const id1 = new UniqueEntityId(customValue);
    const id2 = new UniqueEntityId(customValue);

    expect(id1.equals(id2)).toStrictEqual(true);
  });

  it('should return false when comparing two UniqueEntityIds with different values', () => {
    const id1 = new UniqueEntityId('uuid-1');
    const id2 = new UniqueEntityId('uuid-2');

    expect(id1.equals(id2)).toStrictEqual(false);
  });
});
