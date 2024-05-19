type DatabaseErrorType = "client" | "notFound";

export class DatabaseError<T> extends Error {
  public readonly message: string;
  public readonly type: DatabaseErrorType;
  public readonly field?: T[];

  constructor(message: string, type: DatabaseErrorType, ...field: T[]) {
    super(message);

    this.message = message;
    this.type = type;
    this.field = field;
  }
}
