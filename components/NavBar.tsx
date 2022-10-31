export default function NavigationBar(props: { active?: string }) {
  const items = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Github",
      href: "https://github.com/briancbarrow",
    },
  ];

  return (
    <nav class="bg-lightGreen py-2">
      <ul class="flex justify-center gap-8 mx-4">
        {items.map((item) => (
          <li>
            <a
              href={item.href}
              class={`text-white hover:underline ${
                props.active == item.href ? "font-bold" : ""
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
