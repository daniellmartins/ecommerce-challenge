import { IUserService, IUserRepository } from '../interfaces';

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  generateUserId(): string {
    return this.userRepository.create();
  }

  validateUserId(userId: string): boolean {
    return this.userRepository.exists(userId);
  }

  ensureUserExists(userId?: string): string {
    return this.userRepository.ensureExists(userId);
  }
}


