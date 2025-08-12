import { UserRepository } from '../../../src/repositories/UserRepository';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('should initialize with default user', () => {
    const defaultUserId = 'd4e5f6g7-h8i9-0123-4567-890123456789';
    expect(userRepository.findById(defaultUserId)).toBe(true);
    expect(userRepository.exists(defaultUserId)).toBe(true);
  });

  it('should create new user and return valid UUID', () => {
    const newUserId = userRepository.create();
    expect(newUserId).toBeDefined();
    expect(typeof newUserId).toBe('string');
    expect(userRepository.exists(newUserId)).toBe(true);
  });

  it('should return false for non-existent user', () => {
    expect(userRepository.exists('non-existent-user')).toBe(false);
  });

  it('should ensure user exists or create new one', () => {
    const result = userRepository.ensureExists();
    expect(result).toBeDefined();
    expect(userRepository.exists(result)).toBe(true);
  });

  it('should create unique UUIDs', () => {
    const userId1 = userRepository.create();
    const userId2 = userRepository.create();
    expect(userId1).not.toBe(userId2);
  });
});
