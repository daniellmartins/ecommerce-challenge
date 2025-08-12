import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'E-commerce system API with products and shopping cart functionality',
      contact: {
        name: 'E-commerce Team',
        email: 'dev@ecommerce.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['id', 'name', 'price', 'stock'],
          properties: {
            id: {
              type: 'string',
              description: 'Unique product ID',
              example: '1'
            },
            name: {
              type: 'string',
              description: 'Product name',
              example: 'Smartphone Galaxy S21'
            },
            price: {
              type: 'number',
              description: 'Product price in reais',
              example: 2999.99
            },
            stock: {
              type: 'integer',
              description: 'Quantity in stock',
              example: 10
            },
            description: {
              type: 'string',
              description: 'Product description',
              example: 'Android smartphone with 128GB storage'
            },
            image: {
              type: 'string',
              description: 'Product image URL',
              example: 'https://example.com/product-image.jpg'
            }
          }
        },
        CartItem: {
          type: 'object',
          required: ['productId', 'quantity'],
          properties: {
            productId: {
              type: 'string',
              description: 'Product ID',
              example: '1'
            },
            quantity: {
              type: 'integer',
              description: 'Quantity of item in cart',
              minimum: 1,
              example: 2
            },
            product: {
              $ref: '#/components/schemas/Product'
            }
          }
        },
        Cart: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'User ID (optional)',
              example: 'user123'
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/CartItem'
              }
            },
            total: {
              type: 'number',
              description: 'Total cart value',
              example: 5999.98
            }
          }
        },
        AddToCartRequest: {
          type: 'object',
          required: ['productId', 'quantity'],
          properties: {
            productId: {
              type: 'string',
              description: 'Product ID to be added',
              example: '1'
            },
            quantity: {
              type: 'integer',
              description: 'Quantity to be added',
              minimum: 1,
              example: 1
            },
            userId: {
              type: 'string',
              description: 'User ID (optional)',
              example: 'user123'
            }
          }
        },
        UpdateQuantityRequest: {
          type: 'object',
          required: ['productId', 'quantity'],
          properties: {
            productId: {
              type: 'string',
              description: 'Product ID',
              example: '1'
            },
            quantity: {
              type: 'integer',
              description: 'New quantity',
              minimum: 0,
              example: 3
            },
            userId: {
              type: 'string',
              description: 'User ID (optional)',
              example: 'user123'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            error: {
              type: 'string',
              description: 'Error message',
              example: 'Product not found'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        }
      },
      responses: {
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        BadRequest: {
          description: 'Invalid request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        InternalServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };
