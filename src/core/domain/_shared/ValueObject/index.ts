export abstract class ValueObject<Props> {
  protected readonly props: Props;

  constructor(props: Props) {
    this.props = props;
  }

  equals(vo?: ValueObject<Props>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}
