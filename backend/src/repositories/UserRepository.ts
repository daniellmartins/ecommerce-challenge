import { v4 as uuidv4 } from 'uuid';
import { IUserRepository } from '../interfaces';

export class UserRepository implements IUserRepository {
  private users: Set<string> = new Set();

  constructor() {
    this.users.add('d4e5f6g7-h8i9-0123-4567-890123456789'); // default user UUID
  }

  findById(id: string): boolean {
    return this.users.has(id);
  }

  create(): string {
    const userId = uuidv4();
    this.users.add(userId);
    return userId;
  }

  exists(id: string): boolean {
    return this.users.has(id);
  }

  ensureExists(id?: string): string {
    if (!id) {
      return this.create();
    }

    if (!this.exists(id)) {
      this.users.add(id);
    }

    return id;
  }
}
