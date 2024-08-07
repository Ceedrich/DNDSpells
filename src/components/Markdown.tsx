import MD from "react-markdown";
import remarkGfm from "remark-gfm";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type MarkdownProps = ComponentProps<typeof MD>;

export function Markdown({ remarkPlugins, ...props }: MarkdownProps) {
  const plugins =
    remarkPlugins == null ? [remarkGfm] : [remarkGfm, ...remarkPlugins];
  return (
    <MD
      remarkPlugins={plugins}
      {...props}
      components={{
        // TODO: add real components / improve css
        th: ({ className, ...props }) => (
          <th className={cn(className, "text-left px-1")} {...props} />
        ),
        td: ({ className, ...props }) => (
          <td className={cn(className, "px-1")} {...props} />
        ),
        tr: ({ className, ...props }) => (
          <tr
            className={cn(className /*, "has-[td]:odd:bg-accent" */)}
            {...props}
          />
        ),
        table: ({ className, ...props }) => (
          <table className={cn(className, "mb-4 mx-2")} {...props} />
        ),
      }}
    />
  );
}
