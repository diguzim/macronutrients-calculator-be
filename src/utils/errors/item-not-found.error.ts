export class ItemNotFoundError extends Error {
  id: string;

  constructor(id: string) {
    const message = `Item with id ${id} not found.`;

    super(message);
    this.id = id;
  }
}
