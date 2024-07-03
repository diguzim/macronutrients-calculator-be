export class EmailNotFoundError extends Error {
  email: string;

  constructor(email: string) {
    const message = `User with email ${email} not found.`;

    super(message);
    this.email = email;
  }
}
