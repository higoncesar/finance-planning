export class InvalidPasswordError extends Error {
  constructor(minLength: number) {
    super(`Password must have at least ${minLength} characters.`);
  }
}
