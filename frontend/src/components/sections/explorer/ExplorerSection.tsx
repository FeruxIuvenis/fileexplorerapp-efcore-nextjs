import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

export default function ExplorerSection({ icon, title, children }: Props) {
  return (
    <section className="flex w-full flex-col">
      <header className="flex items-center gap-2 p-4">
        {icon}
        <span>{title}</span>
      </header>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {children}
      </div>
    </section>
  );
}