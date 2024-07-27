import { Router } from 'express';
import { TransportRoutes } from '../Modules/Transport/Transport.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/transports',
    route: TransportRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;