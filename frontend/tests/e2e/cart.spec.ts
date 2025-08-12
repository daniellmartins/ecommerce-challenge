import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test('should open cart when clicking the button', async ({ page }) => {
    await page.goto('/');
    
    await page.click('[data-testid="cart-button"]');
    
    await expect(page.locator('[data-testid="cart"]')).toBeVisible();
  });

  test('should add product to cart', async ({ page }) => {
    await page.goto('/produto/a1b2c3d4-e5f6-7890-abcd-ef1234567890');
    
    await page.click('[data-testid="add-to-cart"]');
    
    await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
  });
});
