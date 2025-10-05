export function generateKey(input: string): string {
  return input
    .split("")
    .map((char) => {
      const decimal = char.charCodeAt(0);
      const hex = decimal.toString(16).toUpperCase();
      return `${hex}`;
    })
    .join("");
}
