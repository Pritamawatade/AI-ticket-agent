import { Express } from "express";
import {IUSER} from "../../models/user"

declare global {
    namespace Express {
        interface Request {
            user: IUSER;
        }
    }
}

