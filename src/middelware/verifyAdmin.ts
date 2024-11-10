import { Request, Response, NextFunction } from 'express';

export const verificarAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
            if (!req.user || req.user.role !== 'Admin') {
         res.status(403).json({ msg: 'Acceso denegado. Solo los administradores pueden realizar esta acción.' });
         return;
    }
    next(); // Si el usuario es admin, continúa con la siguiente función
    } catch (error:any) {
        res.status(500).json({
            msg: 'Error en la verificación de permisos',
            error: error.message
        });
        return;
    }

};


