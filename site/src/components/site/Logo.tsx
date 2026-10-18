import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/lavaner-logo-exact.webp"
      alt="LAVANER OÜ"
      width={301}
      height={383}
      className={cn("block h-11 w-11 shrink-0 object-contain", className)}
    />
  );
}