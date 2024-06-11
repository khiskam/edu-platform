export class ClientError<T> extends Error {
  public readonly message: string;
  public readonly field: T;

  constructor(message: string, field: T) {
    super(message);

    this.message = message;
    this.field = field;
  }
}
