import { format } from 'path';
import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce API',
            version: '1.0.0',
            description: 'API documentation for E-commerce platform',
            contact: {
                name: 'API Support',
                email: 'tonga88@live.com.ar'
            }
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development server'
            },
            {
                url: 'https://back-store-plants.vercel.app/',  // Tu URL de producción
                description: 'Production server'
            }
        ],
        components: {
            securitySchemes: {
                apiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-token',
                    description: 'Add your JWT token with the `x-token` header'
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
                    example: {
                        name: 'Planta de interior',
                        img: 'http://img.com/plant.jpg',
                        imgHover: 'http://img.com/plant-hover.jpg',
                        describe: 'Planta de interior',
                        price: 1000,
                        category: 'interior',
                        stock: 50
                    },
                    required: ['name','img','price','stock']
                },
                User: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        password: { type: 'string', format: 'password' },
                        role: { type: 'string', enum: ['User', 'Admin'], default: 'User' }
                    },
                    example: {
                        name: 'John Doe',
                        email: 'John@example',
                        password: '123456A@',
                    },
                    required: ['name', 'email', 'password']
                },
                Order: {
                    type: 'object',
                    properties: {
                        products: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    productID: { type: 'string', format: 'ObjectId', description: 'ID del producto' },
                                    name: { type: 'string', description: 'Nombre del producto' },
                                    quantity: { type: 'number', description: 'Cantidad del producto' },
                                    price: { type: 'number', description: 'Precio del producto'}
                                },
                                required: ['name','quantity','price']
                            }
                        },
                        amount: { type: 'number', description: 'Monto  de productos' },
                        status: { type: 'boolean', default: false, description: 'Estado de la orden' },
                        total: { type: 'number', description: 'Total de la orden' }
                    },
                    example: {
                        products: [
                            { productID: '60c4f8c6b8e9e20015f8c7f4', name: 'Planta de interior', quantity: 2, price: 1000 },
                            { productID: '60c4f8c6b8e9e20015f8c7f4', name: 'Planta de interior', quantity: 2, price: 1000 }
                        ],
                        amount: 2000,
                        total: 2200
                    },
                    required: ['userID','products','amount','total']
                },
                Comment: {
                    type: 'object',
                    properties: {
                        userID: { type: 'string', format: 'ObjectId', description: 'ID del usuario' },
                        userName: { type: 'string', description: 'Nombre del usuario' },
                        comment: { type: 'string', description: 'Comentario'}
                    },
                    example: {
                        userName: 'John Doe',
                        comment: 'Excelente producto'
                    },
                    required: ['userID','userName' ,'comment']
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
            '/auth/register': {
                post: {
                    security: [],
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
            '/auth/login': {
                post: {
                    security: [],
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
            '/products': {
                get: {
                    tags: ['Products'],
                    summary: 'Obtener todos los productos',
                    security:[], // No necesita autenticación
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
                    security: [{ apiKeyAuth: [] }],
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
            '/products/{id}':{
                put: {
                    tags: ['Products'],
                    summary: 'Actualizar producto por ID',
                    security: [{ apiKeyAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string',
                                format: 'ObjectId'
                            },
                            description: 'ID del producto a actualizar'
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string', description: 'Nombre del producto' },
                                        img: { type: 'string', description: 'URL de la imagen' },
                                        imgHover: { type: 'string', description: 'URL de la imagen hover' },
                                        describe: { type: 'string', description: 'Descripción del producto' },
                                        price: { type: 'number', description: 'Precio' },
                                        category: { type: 'string', description: 'Categoría del producto' },
                                        stock: { type: 'number', description: 'Stock disponible' }
                                    }
                                },
                                example: {
                                    name: "Planta actualizada",
                                    price: 1500,
                                    stock: 75
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Producto actualizado exitosamente',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Product'
                                    }
                                }
                            }
                        },
                        400: { description: 'Datos inválidos' },
                        401: { description: 'No autorizado' },
                        403: { description: 'Acceso denegado' },
                        404: { description: 'Producto no encontrado' }
                    }
                },
                delete: {
                    tags: ['Products'],
                    summary: 'Eliminar producto por ID',
                    security: [{ apiKeyAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string',
                                format: 'ObjectId'
                            },
                            description: 'ID del producto a eliminar'
                        }
                    ],
                    responses: {
                        200: { description: 'Producto eliminado exitosamente' },
                        401: { description: 'No autorizado' },
                        403: { description: 'Acceso denegado' },
                        404: { description: 'Producto no encontrado' }
                    }
                }
            },
            // Order Routes
            '/orders': {
                get: {
                    tags: ['Orders'],
                    summary: 'Obtener todas las órdenes',
                    security: [{ apiKeyAuth: [] }],
                    responses: {
                        200: { description: 'Lista de órdenes' },
                        401: { description: 'No autorizado' }
                    }
                },
                post: {
                    tags: ['Orders'],
                    summary: 'Crear nueva orden',
                    security: [{ apiKeyAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {                                   
                                    $ref: '#/components/schemas/Order'
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
            '/comments': {
                get: {
                    tags: ['Comments'],
                    summary: 'Obtener todos los comentarios',
                    security: [],
                    responses: {
                        200: { description: 'Lista de comentarios' }
                    }
                },
                post: {
                    tags: ['Comments'],
                    summary: 'Crear nuevo comentario',
                    security: [{ apiKeyAuth: [] }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Comment'
                                    
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
            '/comments/{id}': {
                put: {
                    tags: ['Comments'],
                    summary: 'Actualizar comentario por ID',
                    security: [{ apiKeyAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string',
                                format: 'ObjectId'
                            },
                            description: 'ID del comentario a actualizar'
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        comment: { type: 'string', description: 'Comentario' }
                                    }
                                },
                                example: {
                                    comment: 'Excelente producto'
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: 'Comentario actualizado exitosamente' },
                        400: { description: 'Datos inválidos' },
                        401: { description: 'No autorizado' },
                        403: { description: 'Acceso denegado' },
                        404: { description: 'Comentario no encontrado' }
                    }
                },
                delete: {
                    tags: ['Comments'],
                    summary: 'Eliminar comentario por ID',
                    security: [{ apiKeyAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string',
                                format: 'ObjectId'
                            },
                            description: 'ID del comentario a eliminar'
                        }
                    ],
                    responses: {
                        200: { description: 'Comentario eliminado exitosamente' },
                        401: { description: 'No autorizado' },
                        403: { description: 'Acceso denegado' },
                        404: { description: 'Comentario no encontrado' }
                    }
                }
            },
            // User Routes
            '/user': {
                get: {
                    tags: ['Users'],
                    summary: 'Obtener todos los usuarios',
                    security: [{ apiKeyAuth: [] }],
                    responses: {
                        200: { description: 'Lista de usuarios' },
                        401: { description: 'No autorizado' },
                        403: { description: 'Acceso denegado' }
                    }
                }
            },
            'user/{id}': {
                put:{
                    tags: ['Users'],
                    summary: 'Actualizar usuario por ID',
                    security: [{ apiKeyAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string',
                                format: 'ObjectId'
                            },
                            description: 'ID del usuario a actualizar'
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/User'
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: 'Usuario actualizado exitosamente' },
                        400: { description: 'Datos inválidos' },
                        401: { description: 'No autorizado' },
                        403: { description: 'Acceso denegado' },
                        404: { description: 'Usuario no encontrado' }
                    }
                },
                delete: {
                    tags: ['Users'],
                    summary: 'Eliminar usuario por ID',
                    security: [{ apiKeyAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: {
                                type: 'string',
                                format: 'ObjectId'
                            },
                            description: 'ID del usuario a eliminar'
                        }
                    ],
                    responses: {
                        200: { description: 'Usuario eliminado exitosamente' },
                        401: { description: 'No autorizado' },
                        403: { description: 'Acceso denegado' },
                        404: { description: 'Usuario no encontrado' }
                    }
                }
            },
        }
    },
    
    apis: ['./src/routes/*.ts']
};

export default swaggerOptions;