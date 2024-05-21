export function validatePassword(password: string): boolean {
  const hasSpace = /\s/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  return !hasSpace && hasLetter && hasDigit;
}
