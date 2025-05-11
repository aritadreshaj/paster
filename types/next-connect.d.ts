declare module "next-connect" {
  import { NextApiRequest, NextApiResponse } from "next";

  type Middleware<TReq = NextApiRequest, TRes = NextApiResponse> = (
    req: TReq,
    res: TRes,
    next: (err?: any) => void
  ) => void;

  interface Options<TReq, TRes> {
    onError?: (err: any, req: TReq, res: TRes, next?: (err?: any) => void) => void;
    onNoMatch?: (req: TReq, res: TRes) => void;
  }

  export default function nextConnect<TReq = NextApiRequest, TRes = NextApiResponse>(
    options?: Options<TReq, TRes>
  ): {
    use(...middlewares: Middleware<TReq, TRes>[]): any;
    all(handler: Middleware<TReq, TRes>): any;
    get(handler: Middleware<TReq, TRes>): any;
    post(handler: Middleware<TReq, TRes>): any;
    put(handler: Middleware<TReq, TRes>): any;
    delete(handler: Middleware<TReq, TRes>): any;
  };
}
