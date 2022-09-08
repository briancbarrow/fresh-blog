import { HandlerContext } from "$fresh/server.ts";
// import * as crypto from "https://deno.land/std@0.154.0/crypto/mod.ts";
import { hmac } from "https://deno.land/x/hmac@v2.0.1/mod.ts";

export const handler: Handlers<Data> = {
  async GET(req: Request, _ctx: HandlerContext): Response {
    // const hmac = crypto
    //   .createHmac("sha256", Deno.env.get("TW_CONSUMER"))
    //   .update(req.crc_token)
    //   .digest("base64");
    const myhmac = hmac(
      "sha256",
      Deno.env.get("TW_CONSUMER"),
      req.crc_token,
      "base64",
      "base64"
    );
    console.log("request", myhmac);
    console.log("crc_token", req.crc_token);
    console.log("ctx", _ctx);
    return new Response(
      JSON.stringify({
        response_token: myhmac,
      })
    );
  },
};
