export default function sanitizeInput(input: string): string {
  // It checks input if its a number or not;
  const isNumber = /^[0-9]/.test(input);

  return isNumber ? input : "";
}
