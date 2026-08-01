import { cn } from "@/lib/utils/cn";

export default function Container({ children, className, as: Tag = "div" }) {
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}
