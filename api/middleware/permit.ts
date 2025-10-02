import {RequestWithUser} from "./auth";
import {NextFunction, Request, Response} from "express";

const permit = (...roles: string[]) => {
    return (expressReq: Request, res: Response, next: NextFunction) => {
        const req = expressReq as RequestWithUser;

        if (!req.user) {
            return res.status(401).send({'message': 'Unathorized'});
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({'message':'Fordbidden'});
        }

        next();
    }
};

export default permit;