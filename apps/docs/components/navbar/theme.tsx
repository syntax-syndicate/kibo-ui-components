"use client";

import { Button } from "@repo/shadcn-ui/components/ui/button";
import { cn } from "@repo/shadcn-ui/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

type ThemeProps = {
  className?: string;
};

export const Theme = ({ className }: ThemeProps) => {
  const { resolvedTheme, setTheme } = useTheme();

  const Icon = resolvedTheme === "dark" ? MoonIcon : SunIcon;

  return (
    <Button
      className={cn(className, "h-8 w-8")}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      size="icon"
      variant="ghost"
    >
      <Icon className="size-4 text-muted-foreground" />
    </Button>
  );
};
