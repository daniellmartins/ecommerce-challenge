import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'ecommerce_user_id';

// Mock to User ID
export class UserUtils {
  static getUserId(): string {
    if (typeof window === 'undefined') {
      return 'd4e5f6g7-h8i9-0123-4567-890123456789'; // default user UUID
    }

    let userId = localStorage.getItem(USER_ID_KEY);
    
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem(USER_ID_KEY, userId);
    }
    
    return userId;
  }

  static setUserId(userId: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_ID_KEY, userId);
    }
  }

  static clearUserId(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_ID_KEY);
    }
  }

  static generateNewUserId(): string {
    const newUserId = uuidv4();
    this.setUserId(newUserId);
    return newUserId;
  }
}

export const userUtils = new UserUtils();


