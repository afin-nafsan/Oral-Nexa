// Minimal `cn` utility compatible with shadcn components without extra deps
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(' ');
}


