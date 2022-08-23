/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps, HandlerContext } from "$fresh/server.ts";
import { apply, tw } from "../utils/twind.ts";
import { frontMatter, gfm } from "../utils/markdown.ts";
import NavBar from "../components/NavBar.tsx";

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
}

interface Data {
  page: Page;
  quotes: any;
}

export default function BlogPage(props: PageProps<Data>) {
  let description;
  if (props.data.page.data.description) {
    description = String(props.data.page.data.description);
  }
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
      <NavBar />
      <Main
        path={props.url.pathname}
        page={props.data.page}
        quotes={props.data.quotes}
      />
    </>
  );
}

function Main(props: { path: string; page: Page; quotes: any }) {
  return (
    <div>
      <Content page={props.page} />
      <Quotes quotes={props.quotes} />
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
    const url = new URL(`../content/blog/${slug}/index.md`, import.meta.url);
    let fileContent;
    try {
      fileContent = await Deno.readTextFile(url);
    } catch (err) {
      return new Response("404 Page not found", {
        status: 404,
      });
    }
    const { content, data } = frontMatter(fileContent) as {
      data: Record<string, string>;
      content: string;
    };
    let bookImg;
    if (!data.img) {
      const rd_book = await fetch(
        `https://readwise.io/api/v2/books/${data.book_id}`,
        {
          headers: {
            Authorization: `Token ${Deno.env.get("READWISE")}`,
          },
        }
      );

      const book = await rd_book.json();
      bookImg = book.cover_image_url;
    } else {
      bookImg = `/${data.img}`;
    }

    const page = {
      markdown: content,
      data: data ?? {},
      slug: slug,
      title: data.title,
      href: `/blog/${slug}`,
      file: url.pathname,
      book_id: data.book_id,
      link: data.link,
      img: bookImg,
    };

    const rd_quotes = await fetch(
      `https://readwise.io/api/v2/highlights/?book_id=${data.book_id}`,
      {
        headers: {
          Authorization: `Token ${Deno.env.get("READWISE")}`,
        },
      }
    );
    const quotes = await rd_quotes.json();
    const resp = ctx.render({ page, quotes: quotes.results });
    return resp;
  },
};

function Content(props: { page: Page }) {
  const main = tw`py-8 overflow-hidden max-w-prose m-auto`;
  const title = tw`block md:mt-10 mt-4 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900  sm:text-4xl`;
  const body = tw`mx-auto mt-6 prose prose-lg text-gray-500`;
  const html = gfm.render(props.page.markdown);
  const description = props.page.data.description;
  return (
    <main class={main}>
      <div class={tw`max-w-2xl m-auto mt-4`}>
        <a target="_blank" href={props.page.data.link}>
          <img
            class={tw`w-full max-w-2xl m-auto rounded-lg`}
            src={props.page.img}
          />
        </a>
      </div>
      <h1 class={title}>{props.page.title}</h1>
      <p class={tw`mt-8 text-xl leading-8 text-gray-500`}>{description}</p>
      <div
        class={`${body} markdown-body`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}

function Quotes(props: { quotes: any }) {
  return (
    <div class={tw` m-auto pt-10`}>
      <div class={tw`max-w-prose m-auto`}>
        <h3
          class={tw`text-2xl leading-5 font-semibold m-auto mb-4 border-b border-borderGrey pb-2`}
        >
          My Highlights from the book
        </h3>
        {props.quotes
          ? props.quotes.map((quote: any) => {
              return (
                <div class={tw`px-16 py-8 m-auto bg-lightBlue rounded mb-6`}>
                  <p class={tw`text-lg`}>{quote.text}</p>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
