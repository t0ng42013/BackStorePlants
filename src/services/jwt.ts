import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';


export const generateToken = (id: string, role: string, name: string) => {
    const KEY = process.env.JWT_SECRET_KEY
    if (!KEY) {
        throw new Error('No existe la clave secreta');
    }

    try {
        const token = jwt.sign({
            id,
            role,
            name
        },
            KEY,
            { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error(error)
        throw new Error('Error al generar el token');
    }
};


export const verifyToken = (token: string) => {
    const KEY = process.env.JWT_SECRET_KEY
    if (!KEY) {
        throw new Error('No existe la clave secreta');
    }

    try {
        const tokenValid = jwt.verify(token, KEY)
        return tokenValid;
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return {
                success: false,
                error: {
                    message: 'Token expirado',
                    type: 'expired'
                }
            };
        }

        if (error instanceof JsonWebTokenError) {
            return {
                success: false,
                error: {
                    message: 'Token inválido',
                    type: 'invalid'
                }
            };
        }

        return {
            success: false,
            error: {
                message: 'Error de verificación',
                type: 'invalid'
            }
        };
    }

};