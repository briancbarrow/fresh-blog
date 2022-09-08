import { HandlerContext } from "$fresh/server.ts";

export const handler: Handlers<Data> = {
  async GET(_req: Request, _ctx: HandlerContext): Response {
    console.log("request", _req);
    console.log("ctx", _ctx);
    return new Response("webhook works");
  },
};
