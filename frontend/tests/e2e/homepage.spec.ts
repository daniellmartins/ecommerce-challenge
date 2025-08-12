import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/E-Shop/);
    
    await expect(page.locator('header')).toBeVisible();
    
    await expect(page.locator('[data-testid="product-card"]').first()).toBeVisible();
  });

  test('should display basic product information', async ({ page }) => {
    await page.goto('/');
    
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    await expect(firstProduct.locator('[data-testid="product-name"]')).toBeVisible();
    await expect(firstProduct.locator('[data-testid="product-price"]')).toBeVisible();
  });
});
