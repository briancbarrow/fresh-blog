import { UnknownPageProps } from "$fresh/server.ts";

import NavBar from "../components/NavBar.tsx";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <div>
      <NavBar active="/" />
      <div class="max-w-2xl m-auto">
        <div class="text-center max-w-md m-auto shadow mb-5 mt-5">
          <img src="/favquote.jpeg" />
        </div>
        <p class="my-10">Sorry. That page doesn't exist</p>
      </div>
    </div>
  );
}
