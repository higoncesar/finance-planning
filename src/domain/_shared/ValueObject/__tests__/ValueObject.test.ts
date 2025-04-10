import { describe, it, expect } from 'vitest';
import { ValueObject } from '..';

interface DummyProps {
  value: string;
}

interface DummyProps {
  value: string;
}

class DummyValueObject extends ValueObject<DummyProps> {}

describe('ValueObject', () => {
  it('should consider two ValueObjects equal if their props are equal', () => {
    const vo1 = new DummyValueObject({ value: 'test' });
    const vo2 = new DummyValueObject({ value: 'test' });

    expect(vo1.equals(vo2)).toStrictEqual(true);
  });

  it('should not consider two ValueObjects equal if their props are different', () => {
    const vo1 = new DummyValueObject({ value: 'test1' });
    const vo2 = new DummyValueObject({ value: 'test2' });

    expect(vo1.equals(vo2)).toStrictEqual(false);
  });

  it('should return false if compared with undefined', () => {
    const vo = new DummyValueObject({ value: 'test' });

    expect(vo.equals(undefined)).toStrictEqual(false);
  });

  it('should return false if compared with null', () => {
    const vo = new DummyValueObject({ value: 'test' });

    expect(vo.equals(null as any)).toStrictEqual(false);
  });

  it('should return false if compared with a ValueObject that has undefined props', () => {
    class BrokenVO extends ValueObject<any> {
      constructor() {
        super(undefined);
      }
    }

    const vo = new DummyValueObject({ value: 'test' });
    const broken = new BrokenVO();

    expect(vo.equals(broken)).toStrictEqual(false);
  });

  it('should be reflexive: a ValueObject should equal itself', () => {
    const vo = new DummyValueObject({ value: 'test' });

    expect(vo.equals(vo)).toStrictEqual(true);
  });

  it('should correctly compare nested props', () => {
    interface NestedProps {
      value: { nested: string };
    }

    class NestedValueObject extends ValueObject<NestedProps> {}

    const vo1 = new NestedValueObject({ value: { nested: 'deep' } });
    const vo2 = new NestedValueObject({ value: { nested: 'deep' } });

    expect(vo1.equals(vo2)).toStrictEqual(true);
  });

  it('should detect differences in nested props', () => {
    interface NestedProps {
      value: { nested: string };
    }

    class NestedValueObject extends ValueObject<NestedProps> {}

    const vo1 = new NestedValueObject({ value: { nested: 'deep1' } });
    const vo2 = new NestedValueObject({ value: { nested: 'deep2' } });

    expect(vo1.equals(vo2)).toStrictEqual(false);
  });
});
