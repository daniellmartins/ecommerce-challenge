import request from 'supertest';
import { createTestApp } from '../../utils/testApp';
import { mockProducts } from '../../../src/data/products';

describe('Cart Routes Integration Tests', () => {
  const app = createTestApp();
  const testUserId = 'test-user-integration';
  const validProductId = mockProducts[0].id;

  it('should return empty cart for new user', async () => {
    const response = await request(app)
      .get('/api/cart')
      .query({ userId: 'new-user-test' })
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('userId', 'new-user-test');
    expect(response.body.data).toHaveProperty('items', []);
    expect(response.body.data).toHaveProperty('total', 0);
  });

  it('should add product to cart successfully', async () => {
    const response = await request(app)
      .post('/api/cart/add')
      .send({
        productId: validProductId,
        quantity: 2,
        userId: testUserId
      })
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Product added to cart successfully');
    expect(response.body.data.items).toHaveLength(1);
    expect(response.body.data.items[0]).toHaveProperty('productId', validProductId);
  });

  it('should return 400 for invalid add to cart data', async () => {
    const response = await request(app)
      .post('/api/cart/add')
      .send({ quantity: 2, userId: testUserId })
      .expect(400);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  it('should remove product from cart', async () => {
    await request(app)
      .post('/api/cart/add')
      .send({ productId: validProductId, quantity: 1, userId: 'remove-test-user' });

    const response = await request(app)
      .delete(`/api/cart/remove/${validProductId}`)
      .query({ userId: 'remove-test-user' })
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data.items).toHaveLength(0);
  });

  it('should execute complete cart flow', async () => {
    const userId = 'flow-test-user';

    const emptyCart = await request(app)
      .get('/api/cart')
      .query({ userId })
      .expect(200);
    expect(emptyCart.body.data.items).toHaveLength(0);

    const addResponse = await request(app)
      .post('/api/cart/add')
      .send({ productId: mockProducts[0].id, quantity: 2, userId })
      .expect(200);
    expect(addResponse.body.data.items).toHaveLength(1);

    const updateResponse = await request(app)
      .put('/api/cart/update')
      .send({ productId: mockProducts[0].id, quantity: 5, userId })
      .expect(200);
    expect(updateResponse.body.data.items[0].quantity).toBe(5);
  });
});
