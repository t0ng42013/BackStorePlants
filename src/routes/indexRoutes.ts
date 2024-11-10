import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
      const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="es">
        <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="https://cdn-icons-png.flaticon.com/256/15196/15196933.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>BackStore API</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                
                body {
                    background: #f0f2f5;
                    color: #333;
                    line-height: 1.6;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .header {
                    background: #2c3e50;
                    color: white;
                    padding: 2rem 0;
                    text-align: center;
                    margin-bottom: 2rem;
                }
                
                .header h1 {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }
                
                .card {
                    background: white;
                    border-radius: 8px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .endpoints {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin: 2rem 0;
                }
                
                .endpoint-card {
                    background: #f8f9fa;
                    border-left: 4px solid #3498db;
                    padding: 1rem;
                    border-radius: 4px;
                }
                
                .method {
                    display: inline-block;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    font-size: 0.875rem;
                    font-weight: bold;
                    margin-right: 0.5rem;
                }
                
                .get {background: #2ecc71; color: white; margin-bottom: 0.5rem;margin-right: 2.2rem;}
                .post { background: #3498db; color: white;margin-bottom: 0.5rem;margin-right: 1.5rem; }
                .put { background: #f1c40f; color: black; margin-bottom: 0.5rem; margin-right: 1.9rem; }
                .delete { background: #e74c3c; color: white;margin-bottom: 0.5rem; }
                
                .links {
                    text-align: center;
                    margin-top: 2rem;
                }
                
                .button {
                    display: inline-block;
                    padding: 0.75rem 1.5rem;
                    background: #3498db;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    margin: 0 0.5rem;
                    transition: background 0.3s ease;
                }
                
                .button:hover {
                    background: #2980b9;
                }
                
                footer {
                    text-align: center;
                    padding: 2rem 0;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <header class="header">
                <div class="container">
                    <h1>BackStore API</h1>
                    <p>API REST para E-commerce con TypeScript y Node.js</p>
                </div>
            </header>
            
            <main class="container">
                <div class="card">
                    <h2>📦 Características Principales</h2>
                    <ul style="margin: 1rem 0 1rem 2rem;">
                        <li>Autenticación y autorización de usuarios</li>
                        <li>Gestión completa de productos</li>
                        <li>Sistema de órdenes de compra</li>
                        <li>Validación de existencias</li>
                        <li>Documentación con Swagger</li>
                    </ul>
                </div>

                <h2>🛠️ Endpoints Disponibles</h2>
                <div class="endpoints">
                    <div class="endpoint-card">
                        <h3>Productos</h3>
                        <p><span class="method get">GET</span>/products</p>
                        <p><span class="method post">POST</span>/products</p>
                        <p><span class="method put">PUT</span>/products/:id</p>
                        <p><span class="method delete">DELETE</span>/products/:id</p>
                    </div>
                    
                    <div class="endpoint-card">
                        <h3>Órdenes</h3>
                        <p><span class="method get">GET</span>/orders</p>
                        <p><span class="method post">POST</span>/orders</p>
                    </div>

                    <div class="endpoint-card">
                        <h3>Comentarios</h3>
                        <p><span class="method get">GET</span>/comments</p>
                        <p><span class="method post">POST</span>/comments</p>
                        <p><span class="method put">PUT</span>/comments/:id</p>
                        <p><span class="method delete">DELETE</span>/comments/:id</p>
                    </div>

                     <div class="endpoint-card">
                        <h3>Usuario</h3>
                        <p><span class="method get">GET</span>/user</p>
                        <p><span class="method put">PUT</span>/user/:id</p> 
                         <p><span class="method delete">DELETE</span>/user/:id</p>
                    </div>
                    
                    <div class="endpoint-card">
                        <h3>Usuarios</h3>
                        <p><span class="method post">POST</span>/auth/register</p>
                        <p><span class="method post">POST</span>/auth/login</p>
                    </div>
                </div>

                <div class="links">
                    <a href="/api-docs" class="button">📚 Documentación API</a>
                    <a href="https://github.com/t0ng42013/BackStorePlants" class="button">💻 GitHub</a>
                </div>
            </main>

            <footer>
                <div class="container">
                    <p>BackStore API © 2024 - Desarrollado con ❤️ usando TypeScript y Node.js</p>
                </div>
            </footer>
        </body>
    </html>
    `;

      res.send(htmlTemplate);
});

export default router;