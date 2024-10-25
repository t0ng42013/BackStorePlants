import jwt from 'jsonwebtoken';


export const generateToken = (id: string, role: string, name: string) => {
    const KEY = process.env.JWT_SECRET_KEY
    try {
        if (!KEY) {
            throw new Error('No existe la clave secreta');
        }

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
        console.log(error)
    }
};