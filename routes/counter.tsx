/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import Counter from "../islands/Counter.tsx";
import NavBar from "../components/NavBar.tsx";

// export const handler: Handlers = {
//   async GET(_req, ctx) {
//     let posts: Post[] = [];
//     for await (const post of Deno.readDir(`./content/blog`)) {
//       const fileContent = await Deno.readTextFile(
//         `./content/blog/${post.name}/index.md`
//       );
//       const { content, data } = frontMatter(fileContent) as {
//         data: Record<string, string>;
//         content: string;
//       };
//       const page = {
//         description: data.description,
//         title: data.title,
//         href: `/${post.name}`,
//       };
//       posts.push(page);
//     }
//     const resp = await ctx.render({ posts });
//     return resp;
//   },
// };

export default function CounterPage() {
  return (
    <div>
      <NavBar active="/" />
      <div class={tw`max-w-2xl m-auto`}>
        <p class={tw`my-10`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Counter start={5} />
        <p class={tw`mt-10`}>
          Leverage agile frameworks to provide a robust synopsis for high level
          overviews. Iterative approaches to corporate strategy foster
          collaborative thinking to further the overall value proposition.
          Organically grow the holistic world view of disruptive innovation via
          workplace diversity and empowerment.
        </p>
      </div>
    </div>
  );
}
