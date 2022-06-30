/** @jsx h */

import { h } from "preact";
import { tw } from "../utils/twind.ts";

interface CardProps {
  title: string;
  description: string;
  href: string;
}

export default function Card(props: { post: CardProps }) {
  const { href, title, description } = props.post;
  return (
    <div
      class={tw`flex flex-col justify-between flex-1 p-6 bg-lightBlue rounded `}
    >
      <div class={tw`flex-1`}>
        <a href={href} class={tw``}>
          <p class={tw`text-xl font-semibold text-gray-900`}>{title}</p>
          <p class={tw`mt-3 text-base text-gray-500`}>{description}</p>
        </a>
      </div>
    </div>
  );
}
