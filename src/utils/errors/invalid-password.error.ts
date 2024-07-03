export class InvalidPasswordError extends Error {
  constructor() {
    const message = 'Invalid password';

    super(message);
  }
}
