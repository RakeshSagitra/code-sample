export class EntityNotFoundError extends Error {
  entity: string;

  constructor(message: string | undefined, entity: string) {
    super(message);
    this.name = "EntityNotFoundError";
    this.entity = entity;
  }
}
