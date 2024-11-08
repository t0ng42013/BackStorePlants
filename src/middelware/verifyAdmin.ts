import { Request, Response, NextFunction } from 'express';

export const verificarAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'Admin') {
         res.status(403).json({ msg: 'Acceso denegado. Solo los administradores pueden realizar esta acción.' });
    }
    next(); // Si el usuario es admin, continúa con la siguiente función
};
