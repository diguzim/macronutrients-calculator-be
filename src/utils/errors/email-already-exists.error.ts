export class EmailAlreadyExistsError extends Error {
  email: string;

  constructor(email: string) {
    const message = `User with email ${email} already exists.`;

    super(message);
    this.email = email;
  }
}
