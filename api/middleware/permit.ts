import {RequestWithUser} from "./auth";
import {NextFunction, Response, Request, RequestHandler} from "express";

const permit = (...roles: string[]): RequestHandler => {
    return (expressReq: Request, res: Response, next: NextFunction) => {
        const req = expressReq as RequestWithUser;

        if (!req.user) {
            res.status(401).send({'message': 'Unathorized'});
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).send({'message':'Fordbidden'});
            return;
        }
        next();
    }
};

export default permit;