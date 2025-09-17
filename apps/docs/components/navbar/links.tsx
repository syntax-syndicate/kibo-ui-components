import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@repo/shadcn-ui/components/ui/navigation-menu";
import { cn } from "@repo/shadcn-ui/lib/utils";
import Link from "next/link";

type LinksProps = {
  className?: string;
  links: {
    label: string;
    href: string;
  }[];
};

export const Links = ({ className, links }: LinksProps) => (
  <div className={className}>
    {links.map((link) => (
      <Link
        className={cn(
          navigationMenuTriggerStyle(),
          "h-auto bg-transparent px-3 py-1.5 shadow-none"
        )}
        href={link.href}
        key={link.href}
      >
        {link.label}
      </Link>
    ))}
  </div>
);
