import { Router } from "express";
import userRoute from "./user.mjs";

// console.log('in route-index');
const routes = Router();
routes.use(userRoute);

export default routes; 