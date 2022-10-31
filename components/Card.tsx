interface CardProps {
  title: string;
  description: string;
  href: string;
}

export default function Card(props: { post: CardProps }) {
  const { href, title, description } = props.post;
  return (
    <div class="flex flex-col justify-between flex-1 p-6 bg-lightBlue rounded ">
      <div class="flex-1">
        <a href={href} class="">
          <p class="text-xl font-semibold text-gray-900">{title}</p>
          <p class="mt-3 text-base text-gray-500">{description}</p>
        </a>
      </div>
    </div>
  );
}
