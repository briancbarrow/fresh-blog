/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { UnknownPageProps } from "$fresh/server.ts";

import NavBar from "../components/NavBar.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <div>
      <NavBar active="/" />
      <div class={tw`max-w-2xl m-auto`}>
        <div class={tw`text-center max-w-md m-auto shadow mb-5 mt-5`}>
          <img src="/favquote.jpeg" />
        </div>
        <p class={tw`my-10`}>Sorry. That page doesn't exist</p>
      </div>
    </div>
  );
}
