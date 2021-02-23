type TMongoId = import('mongoose').Schema.Types.ObjectId;

type TMongoDocument = import('mongoose').Document;

type TResponse = import('express').Response;

type TRequest = import('express').Request;

type TNext = import('express').Request;

type Handler = (
  req: TRequest,
  res: TResponse,
  next: TNext
) => Promise<TResponse | void | TResponse | void>;

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    }
  };
}
