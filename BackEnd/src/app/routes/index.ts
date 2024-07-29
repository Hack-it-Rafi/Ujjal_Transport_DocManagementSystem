import { Router } from 'express';
import { TransportRoutes } from '../Modules/Transport/Transport.route';
import { DocumentRoutes } from '../Modules/Documents/Document.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/transports',
    route: TransportRoutes,
  },
  {
    path: '/documents',
    route: DocumentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;