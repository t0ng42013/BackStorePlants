import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce API Documentation',
            version: '1.0.0',
            description: 'API documentation for E-commerce platform with products, orders, and user management'
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server'
            },
            {
                url: 'https://back-store-plants.vercel.app/',  // Tu URL de producción
                description: 'Production server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                // Modelos de datos
                Product: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', description: 'Nombre del producto' },
                        img: { type: 'string', description: 'URL de la imagen' },
                        imgHover: { type: 'string', description: 'URL de la imagen hover' },
                        describe: { type: 'string', description: 'Descripción del producto' },
                        price: { type: 'number', description: 'Precio' },
                        category: { type: 'string', default: 'interior' },
                        stock: { type: 'number', default: 50 }
                    },
                    required: ['name', 'describe', 'price']
                },
                User: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', format: 'password' },
                        role: { type: 'string', enum: ['User', 'Admin'], default: 'User' }
                    },
                    required: ['name', 'email', 'password']
                }
            }
        },
        tags: [
            { name: 'Auth', description: 'Autenticación endpoints' },
            { name: 'Products', description: 'Gestión de productos' },
            { name: 'Orders', description: 'Gestión de órdenes' },
            { name: 'Comments', description: 'Gestión de comentarios' },
            { name: 'Users', description: 'Gestión de usuarios' }
        ],
        paths: {
            // Auth Routes
            '/api/auth/register': {
                post: {
                    tags: ['Auth'],
                    summary: 'Registrar nuevo usuario',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string', minLength: 3 },
                                        email: { type: 'string', format: 'email' },
                                        password: { type: 'string', minLength: 6 }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'Usuario creado exitosamente' },
                        400: { description: 'Datos inválidos' }
                    }
                }
            },
            '/api/auth/login': {
                post: {
                    tags: ['Auth'],
                    summary: 'Iniciar sesión',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        email: { type: 'string', format: 'email' },
                                        password: { type: 'string', minLength: 6 }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Login exitoso',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            token: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        },
                        401: { description: 'Credenciales inválidas' }
                    }
                }
            },

            // Product Routes
            '/api/products': {
                get: {
                    tags: ['Products'],
                    summary: 'Obtener todos los productos',
                    responses: {
                        200: {
                            description: 'Lista de productos',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Product'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: ['Products'],
                    summary: 'Crear nuevo producto',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Product'
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'Producto creado' },
                        401: { description: 'No autorizado' },
                        403: { description: 'Acceso denegado' }
                    }
                }
            },

            // Order Routes
            '/api/orders': {
                get: {
                    tags: ['Orders'],
                    summary: 'Obtener todas las órdenes',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: 'Lista de órdenes' },
                        401: { description: 'No autorizado' }
                    }
                },
                post: {
                    tags: ['Orders'],
                    summary: 'Crear nueva orden',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        products: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    productID: { type: 'string' },
                                                    quantity: { type: 'number' }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'Orden creada' },
                        401: { description: 'No autorizado' }
                    }
                }
            },

            // Comment Routes
            '/api/comments': {
                get: {
                    tags: ['Comments'],
                    summary: 'Obtener todos los comentarios',
                    responses: {
                        200: { description: 'Lista de comentarios' }
                    }
                },
                post: {
                    tags: ['Comments'],
                    summary: 'Crear nuevo comentario',
                    security: [{ bearerAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        comment: { type: 'string', minLength: 8 }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'Comentario creado' },
                        401: { description: 'No autorizado' }
                    }
                }
            },

            // User Routes
            '/api/users': {
                get: {
                    tags: ['Users'],
                    summary: 'Obtener todos los usuarios',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: 'Lista de usuarios' },
                        401: { description: 'No autorizado' },
                        403: { description: 'Acceso denegado' }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.ts'] // ruta a tus archivos de rutas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;