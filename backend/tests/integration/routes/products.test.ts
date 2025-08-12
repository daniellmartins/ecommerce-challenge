import request from 'supertest';
import { createTestApp } from '../../utils/testApp';
import { mockProducts } from '../../../src/data/products';

describe('Products Routes Integration Tests', () => {
  const app = createTestApp();

  it('should return all products with status 200', async () => {
    const response = await request(app)
      .get('/api/products')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should return specific product for valid ID', async () => {
    const validProductId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
    const response = await request(app)
      .get(`/api/products/${validProductId}`)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('id', validProductId);
    expect(response.body.data).toHaveProperty('name', 'Smartphone Galaxy Pro');
  });

  it('should return 404 for non-existent product', async () => {
    const response = await request(app)
      .get('/api/products/non-existent-id')
      .expect(404);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error', 'Product not found');
  });

  it('should validate product ID middleware correctly', async () => {
    const response = await request(app)
      .get('/api/products/%20%20%20')
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error', 'Product ID is required and must be a string');
  });

  it('should return expected mock products', async () => {
    const response = await request(app)
      .get('/api/products')
      .expect(200);

    expect(response.body.data).toEqual(mockProducts);
  });
});
