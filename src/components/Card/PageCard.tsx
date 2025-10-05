import type { ReactNode } from "react";

interface IPageCardProps {
  title: string;
  children: ReactNode;
}
export function PageCard({ title, children }: IPageCardProps) {
  return (
    <div className="mt-5 border rounded border-slate-300">
      <div className="font-bold  m-2">{title}</div>
      <div className="pr-6">
        <div className="border-b border-slate-200 " />
      </div>
      <div className="m-2">{children}</div>
    </div>
  );
}
