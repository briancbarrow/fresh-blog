/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { frontMatter, gfm } from "../utils/markdown.ts";

import NavBar from "../components/NavBar.tsx";
import Card from "../components/Card.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    let posts: Post[] = [];
    for await (const post of Deno.readDir(`./content/blog`)) {
      const fileContent = await Deno.readTextFile(
        `./content/blog/${post.name}/index.md`
      );
      const { content, data } = frontMatter(fileContent) as {
        data: Record<string, string>;
        content: string;
      };
      const page = {
        description: data.description,
        title: data.title,
        href: `/${post.name}`,
      };
      posts.push(page);
    }
    const resp = await ctx.render({ posts });
    return resp;
  },
};

interface Post {
  title: string;
  description: string;
  href: string;
}
interface Data {
  posts: Post[];
}

export default function Home(props: PageProps<Data>) {
  const { posts } = props.data;
  return (
    <div>
      <NavBar active="/" />
      <div class={tw`text-center max-w-md m-auto shadow mb-5 mt-5`}>
        <img src="/favquote.jpeg" />
      </div>
      <div
        class={tw`relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8`}
      >
        <div class={tw`absolute inset-0`}>
          <div class={tw`bg-white h-1/3 sm:h-2/3`}></div>
        </div>
        <div class={tw`relative mx-auto max-w-7xl`}>
          <div class={tw`text-center`}>
            <h2
              class={tw`text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl`}
            >
              My Blog
            </h2>
            <p class={tw`max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4`}>
              Sometimes I write about stuff. That stuff is here.
            </p>
          </div>
          <div
            class={tw`grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none`}
          >
            {posts.map((post: Post) => {
              return <Card post={post} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
