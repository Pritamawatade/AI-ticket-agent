import { Express } from "express";
import { IUSER } from "../../models/user";
import type { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user: IUSER | string | JwtPayload;
        }
    }
}
