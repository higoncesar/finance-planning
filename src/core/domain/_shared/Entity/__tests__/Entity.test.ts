import { describe, it, expect } from 'vitest';
import { Entity } from '..';
import { UniqueEntityId } from '@/core/domain/_shared/UniqueEntityId';

class FakeEntity extends Entity<{ name: string }> {
  get name() {
    return this.props.name;
  }
}

describe('Entity', () => {
  it('should create an entity with provided props and auto-generated id', () => {
    const entity = new FakeEntity({ name: 'Test Entity' });

    expect(entity).toBeInstanceOf(FakeEntity);
    expect(entity.id).toBeInstanceOf(UniqueEntityId);
    expect(entity.name).toStrictEqual('Test Entity');
  });

  it('should create an entity with a provided id', () => {
    const customId = new UniqueEntityId();
    const entity = new FakeEntity({ name: 'Test Entity' }, customId);

    expect(entity.id).toStrictEqual(customId);
  });

  it('should return true when comparing the same instance using equals()', () => {
    const entity = new FakeEntity({ name: 'Test Entity' });

    expect(entity.equals(entity)).toStrictEqual(true);
  });

  it('should return false when comparing with null or undefined', () => {
    const entity = new FakeEntity({ name: 'Test Entity' });

    expect(entity.equals(null as any)).toStrictEqual(false);
    expect(entity.equals(undefined as any)).toStrictEqual(false);
  });

  it('should return true when comparing two entities with the same id', () => {
    const sharedId = new UniqueEntityId();
    const entity1 = new FakeEntity({ name: 'Entity 1' }, sharedId);
    const entity2 = new FakeEntity({ name: 'Entity 2' }, sharedId);

    expect(entity1.equals(entity2)).toStrictEqual(true);
  });

  it('should return false when comparing two entities with different ids', () => {
    const entity1 = new FakeEntity({ name: 'Entity 1' });
    const entity2 = new FakeEntity({ name: 'Entity 2' });

    expect(entity1.equals(entity2)).toStrictEqual(false);
  });
});
