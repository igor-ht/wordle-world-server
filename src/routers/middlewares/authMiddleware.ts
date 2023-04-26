import { Request, Response, NextFunction } from 'express';
import { accessTokenSecret } from '../../serverConfig';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		const user = jwt.verify(token!, accessTokenSecret) as { name: string; email: string; iat: number; exp: number };
		if (!req.body.email || req.body.email !== user.email) throw 'Invalid email token';

		return next();
	} catch {
		console.log('not authorized');
		return res.status(401).json({
			error: new Error('Invalid request!'),
		});
	}
};

export default authMiddleware;
