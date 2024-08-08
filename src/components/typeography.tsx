export function Heading1({ children }: Html.PropsWithChildren) {
  return (
    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
      {children}
    </h1>
  );
}

export function Heading2({ children }: Html.PropsWithChildren) {
  return <h2 class="text-4xl font-extrabold dark:text-white">{children}</h2>;
}

export function Heading3({ children }: Html.PropsWithChildren) {
  return <h3 class="text-3xl font-bold dark:text-white">{children}</h3>;
}

export function Heading4({ children }: Html.PropsWithChildren) {
  return <h4 class="text-2xl font-bold dark:text-white">{children}</h4>;
}

export function Heading5({ children }: Html.PropsWithChildren) {
  return <h5 class="text-xl font-bold dark:text-white">{children}</h5>;
}

export function Heading6({ children }: Html.PropsWithChildren) {
  return <h6 class="text-lg font-bold dark:text-white">{children}</h6>;
}

export function Paragraph({ children }: Html.PropsWithChildren) {
  return <p class="text-gray-500 dark:text-gray-400">{children}</p>;
}

export function LeadingParagraph({ children }: Html.PropsWithChildren) {
  return (
    <p class="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">
      {children}
    </p>
  );
}

export function Blockquote({ children }: Html.PropsWithChildren) {
  return (
    <blockquote class="text-xl italic font-semibold text-gray-900 dark:text-white">
      <p>{children}</p>
    </blockquote>
  );
}

export function SolidBlockQuote({ children }: Html.PropsWithChildren) {
  return (
    <blockquote class="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
      <p class="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
        {children}
      </p>
    </blockquote>
  );
}
