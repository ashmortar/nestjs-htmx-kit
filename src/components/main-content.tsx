export function MainContent({ children }: Html.PropsWithChildren) {
  return (
    <main
      id="main"
      class="flex flex-1 pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased h-full"
    >
      <div class="flex flex-col flex-grow px-4 mx-auto max-w-screen-xl h-full">
        {children}
      </div>
    </main>
  );
}
