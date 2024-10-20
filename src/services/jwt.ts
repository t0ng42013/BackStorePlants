import jwt from 'jsonwebtoken';


export const generateToken = (id: string) => {
    const KEY = process.env.JWT_SECRET_KEY
    try {
        if (!KEY) {
            throw new Error('No existe la clave secreta');
        }

        const token = jwt.sign({ id }, KEY, { expiresIn: '4h' });
        return token;
    } catch (error) {
        console.log(error)
    }
};


export const verifyToken = (token: string) => {
    const KEY = process.env.JWT_SECRET_KEY
    try {
        if (!KEY) {
            throw new Error('No existe la clave secreta');
        }

        const tokenValid = jwt.verify(token, KEY);
        return tokenValid;
    } catch (error) {
        console.log(error)
    }
};