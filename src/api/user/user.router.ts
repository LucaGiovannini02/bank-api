import { Router } from "express";
import { me, usersList } from "./user.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";

const router = Router();

router.use(isAuthenticated);
router.get('/me', isAuthenticated, me);
router.get('/', usersList);

export default router;