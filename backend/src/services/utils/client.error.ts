type CodeType = 400 | 401 | 404 | 500;

export class ClientError<T> extends Error {
  public readonly message: string;
  public readonly field?: T[];
  public readonly code: CodeType;

  constructor(message: string, code: CodeType, ...field: T[]) {
    super(message);

    this.code = code;
    this.field = field;
    this.message = message;
  }
}
