export function humanize(key: string): string {
  // Insert spaces before capital letters, then capitalize first letter
  const withSpaces = key.replace(/([a-z])([A-Z])/g, '$1 $2');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}