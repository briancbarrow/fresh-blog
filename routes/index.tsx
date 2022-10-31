import { frontMatter, gfm } from "../utils/markdown.ts";
import { Head } from "$fresh/runtime.ts";

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
        date: data.date,
        href: `/${post.name}`,
      };
      posts.push(page);
    }
    let storyblokPosts = [];
    try {
      let storyblokReq = await fetch(
        "https://api-us.storyblok.com/v2/cdn/stories?token=Js8YqSPzVStKxWXZjL4PlAtt"
      );
      const storyblokJson = await storyblokReq.json();
      // storyblokPosts = storyblokJson.stories;
      for (const post of storyblokJson.stories) {
        const page = {
          description: post.content.description,
          title: post.name,
          date: post.published_at,
          href: `/storyblok/${post.slug}`,
        };
        storyblokPosts.push(page);
      }
    } catch (err) {
      console.log("ERROR GETTING POSTS", err);
    }

    posts.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      if (aDate > bDate) {
        return -1;
      } else {
        return 1;
      }
    });
    const resp = await ctx.render({ posts, storyblokPosts });
    return resp;
  },
};

interface Post {
  title: string;
  description: string;
  href: string;
  date: string;
}
interface Data {
  posts: Post[];
}

export default function Home(props: PageProps<Data>) {
  const { posts, storyblokPosts } = props.data;
  return (
    <>
      <Head>
        <title> Brian Barrow Blog</title>
        <link rel="stylesheet" href="/gfm.css" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="description" content="Brian Barrow Blog" />
        <meta property="og:title" content="Brian Barrow Blog" />
        <meta property="og:description" content="Brian Barrow Blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.url.href} />
        <meta
          property="og:image"
          content="https://pbs.twimg.com/profile_images/1546866027635417090/crW_Y-aj_400x400.jpg"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <NavBar active="/" />
      <div class="text-center max-w-md m-auto shadow mb-5 mt-5">
        <img src="/favquote.jpeg" />
      </div>
      <div class="relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div class="absolute inset-0">
          <div class="bg-white h-1/3 sm:h-2/3"></div>
        </div>
        <div class="relative mx-auto max-w-7xl">
          <div class="text-center">
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              My Blog
            </h2>
            <p class="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
              Sometimes I write about stuff. That stuff is here.
            </p>
          </div>
          <div class="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
            {posts.map((post: Post) => {
              return <Card post={post} />;
            })}
          </div>
          <div class="text-center">
            <h3 class="text-xl font-extrabold">Storyblok Posts</h3>
            <div class="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
              {storyblokPosts.map((post: Post) => {
                return <Card post={post} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
