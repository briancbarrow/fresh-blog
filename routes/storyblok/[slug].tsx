import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps, HandlerContext } from "$fresh/server.ts";
import { frontMatter, gfm } from "../../utils/markdown.ts";
import NavBar from "../../components/NavBar.tsx";
import Storyblok from "$storyblok";

import { dotEnvConfig } from "$deps";
dotEnvConfig({ export: true });

interface Page {
  markdown: string;
  data: Record<string, string>;
  slug: string;
  title: string;
  category?: string;
  href: string;
  file: string;
  book_id: string;
  link: string;
  img: string;
  description: string;
}

interface Data {
  page: Page;
  quotes: any;
}

export default function BlogPage(props: PageProps<Data>) {
  let description = props.data.page.description;
  // if (props.data.page.data.description) {
  //   description = String(props.data.page.data.description);
  // }
  return (
    <>
      <Head>
        <title>{props.data.page?.title ?? "Not Found"} | Brian Blog</title>
        <link rel="stylesheet" href="/gfm.css" />
        <meta name="twitter:card" content="summary_large_image" />
        {description && <meta name="description" content={description} />}
        <meta
          property="og:title"
          content={`${props.data.page?.title ?? "Not Found"} | Brian Blog`}
        />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.url.href} />
        <meta
          property="og:image"
          content={props.url.origin + props.data.page.img}
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <script
        src="//app.storyblok.com/f/storyblok-v2-latest.js"
        type="text/javascript"
      ></script>
      <NavBar />
      <Main path={props.url.pathname} page={props.data.page} />
    </>
  );
}

function Main(props: { path: string; page: Page }) {
  return (
    <div>
      <Content page={props.page} />
      {/* <Quotes quotes={props.quotes} /> */}
    </div>
  );
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx: HandlerContext) {
    const slug = ctx.params.slug;
    if (slug === "") {
      return new Response("", {
        status: 307,
        headers: { location: "/" },
      });
    }
    // const url = new URL(`../content/blog/${slug}/index.md`, import.meta.url);
    let fileContent;
    try {
      const storyblok = Storyblok("Js8YqSPzVStKxWXZjL4PlAtt");
      fileContent = await storyblok.stories.getStoryByPath(`/posts/${slug}`);
      // fileContent = await post.json();
      if (!fileContent.story) {
        throw new Error("Not found");
      }
      fileContent = fileContent.story;
    } catch (err) {
      console.log("err", err);
      return new Response("404: Storyblok Post not found", {
        status: 404,
      });
    }
    const page = {
      markdown: fileContent.content.body,
      // data: data ?? {},
      slug: slug,
      title: fileContent.name,
      img: fileContent.content.image.filename,
      description: fileContent.description,
    };

    const resp = ctx.render({ page });
    return resp;
  },
};

function Content(props: { page: Page }) {
  const main = `py-8 overflow-hidden max-w-prose m-auto`;
  const title = `block md:mt-10 mt-4 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900  sm:text-4xl`;
  const body = `mx-auto mt-6 prose prose-lg text-gray-500`;
  const html = gfm.render(props.page.markdown);
  const description = props.page.description;
  return (
    <main class="py-8 overflow-hidden max-w-prose m-auto">
      <div class="max-w-2xl m-auto mt-4">
        <img class="w-full max-w-lg m-auto rounded-lg" src={props.page.img} />
      </div>
      <h1 class="block md:mt-10 mt-4 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900  sm:text-4xl">
        {props.page.title}
      </h1>
      <p class="mt-8 text-xl leading-8 text-gray-500">{description}</p>
      <div
        class="mx-auto mt-6 prose prose-lg text-gray-500 markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
