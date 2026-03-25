import { Request, Response, NextFunction } from 'express';

// Расширяем стандартный тип Request, чтобы TypeScript не ругался на req.userId
declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies['auth_token'];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    // В токене у нас просто ID юзера (в реальном проекте тут была бы проверка JWT)
    req.userId = parseInt(token);
    next();
};