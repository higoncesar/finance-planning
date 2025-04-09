import { UniqueEntityId } from '../UniqueEntityId';

export abstract class Entity<Props> {
  protected readonly _id: UniqueEntityId;
  protected readonly props: Props;

  constructor(props: Props, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId();
    this.props = props;
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  equals(entity: Entity<any>): boolean {
    if (entity === this) return true;
    if (!entity) return false;
    return entity.id.equals(this._id);
  }
}
