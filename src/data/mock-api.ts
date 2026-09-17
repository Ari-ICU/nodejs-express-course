export interface MockEndpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  category: string;
  description: string;
  defaultHeaders: Record<string, string>;
  defaultBody?: string;
  responseStatus: number;
  responseHeaders: Record<string, string>;
  responseBody: unknown;
}

export const MOCK_API_ENDPOINTS: MockEndpoint[] = [
  {
    id: "health-check",
    method: "GET",
    path: "/api/health",
    category: "System",
    description: "Check server liveness, uptime, and database connection status",
    defaultHeaders: {
      "Accept": "application/json"
    },
    responseStatus: 200,
    responseHeaders: {
      "content-type": "application/json; charset=utf-8",
      "x-response-time": "4ms"
    },
    responseBody: {
      success: true,
      status: "operational",
      uptime: "48 hours 12 mins",
      nodeVersion: "v22.14.0",
      services: {
        database: "connected (MongoDB Atlas)",
        redisCache: "connected (in-memory)",
        jobWorker: "active"
      }
    }
  },
  {
    id: "list-products",
    method: "GET",
    path: "/api/v1/products?page=1&limit=3&category=electronics",
    category: "Products",
    description: "Query products with pagination, category filter, and Redis caching",
    defaultHeaders: {
      "Accept": "application/json"
    },
    responseStatus: 200,
    responseHeaders: {
      "content-type": "application/json; charset=utf-8",
      "x-cache": "HIT",
      "x-response-time": "8ms"
    },
    responseBody: {
      success: true,
      meta: {
        total: 24,
        page: 1,
        limit: 3,
        totalPages: 8
      },
      data: [
        {
          _id: "6601a9b2c3d4e5f6a7b8c901",
          title: "MacBook Pro M3 Max",
          price: 2499.00,
          category: "electronics",
          stock: 14,
          rating: 4.9,
          imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
        },
        {
          _id: "6601a9b2c3d4e5f6a7b8c902",
          title: "Dell XPS 16 OLED",
          price: 1899.00,
          category: "electronics",
          stock: 8,
          rating: 4.7,
          imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45"
        },
        {
          _id: "6601a9b2c3d4e5f6a7b8c903",
          title: "Sony WH-1000XM5",
          price: 349.99,
          category: "electronics",
          stock: 32,
          rating: 4.8,
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
        }
      ]
    }
  },
  {
    id: "auth-login",
    method: "POST",
    path: "/api/v1/auth/login",
    category: "Auth",
    description: "Authenticate user and issue short-lived JWT + HttpOnly refresh cookie",
    defaultHeaders: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    defaultBody: JSON.stringify(
      {
        email: "dara.dev@nodepulse.io",
        password: "SuperSecretPassword123!"
      },
      null,
      2
    ),
    responseStatus: 200,
    responseHeaders: {
      "content-type": "application/json; charset=utf-8",
      "set-cookie": "refreshToken=eyJhbGciOiJIUzI1Ni...; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800"
    },
    responseBody: {
      success: true,
      message: "Authentication successful",
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFhODkyMSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNzAzNjgwMCwiZXhwIjoxNzM3MDM3NzAwfQ.exampleSignature...",
      expiresIn: "15m",
      user: {
        id: "66aa8921b7c12345",
        name: "Dara Sovann",
        email: "dara.dev@nodepulse.io",
        role: "admin"
      }
    }
  },
  {
    id: "create-todo",
    method: "POST",
    path: "/api/v1/todos",
    category: "Todos",
    description: "Create a new todo with Zod schema validation",
    defaultHeaders: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1Ni..."
    },
    defaultBody: JSON.stringify(
      {
        title: "Build Node.js Express Backend",
        description: "Complete all 29 course modules & 6 capstone projects",
        priority: "high",
        dueDate: "2026-10-01T00:00:00.000Z"
      },
      null,
      2
    ),
    responseStatus: 201,
    responseHeaders: {
      "content-type": "application/json; charset=utf-8",
      "location": "/api/v1/todos/66bb0123c8e7f9a1"
    },
    responseBody: {
      success: true,
      statusCode: 201,
      message: "Todo created successfully",
      data: {
        _id: "66bb0123c8e7f9a1",
        title: "Build Node.js Express Backend",
        description: "Complete all 29 course modules & 6 capstone projects",
        priority: "high",
        completed: false,
        dueDate: "2026-10-01T00:00:00.000Z",
        createdAt: "2026-09-17T03:30:00.000Z"
      }
    }
  },
  {
    id: "checkout-order",
    method: "POST",
    path: "/api/v1/orders/checkout",
    category: "E-Commerce",
    description: "ACID Transactional order checkout with inventory deduction",
    defaultHeaders: {
      "Content-Type": "application/json",
      "Authorization": "Bearer eyJhbGciOiJIUzI1Ni..."
    },
    defaultBody: JSON.stringify(
      {
        items: [
          { productId: "6601a9b2c3d4e5f6a7b8c901", quantity: 1 }
        ],
        shippingAddress: {
          street: "Norodom Boulevard",
          city: "Phnom Penh",
          country: "Cambodia"
        },
        paymentMethod: "stripe_card"
      },
      null,
      2
    ),
    responseStatus: 201,
    responseHeaders: {
      "content-type": "application/json; charset=utf-8"
    },
    responseBody: {
      success: true,
      statusCode: 201,
      message: "Order placed & inventory stock committed",
      data: {
        orderId: "ORD-2026-8941",
        status: "processing",
        totalAmount: 2499.00,
        currency: "USD",
        trackingNumber: "KHM-EXP-99210",
        estimatedDelivery: "2 business days"
      }
    }
  }
];
