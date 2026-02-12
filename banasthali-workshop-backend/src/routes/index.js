import express from "express";
import userRoutes from "./user.js";

const router = express.Router();

const routes = [
    {
        route: '/user',
        handler: userRoutes
    }
]

routes.forEach((route) => {
    router.use(route.route, route.handler);
});

router.get('/health', (req, res) => {
  res.send('ok');
});

export default router;