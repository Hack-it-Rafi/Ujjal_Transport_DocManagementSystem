import { Router } from 'express';
import { TransportRoutes } from '../Modules/Transport/Transport.route';
import { DocumentRoutes } from '../Modules/Documents/Document.route';
import { EditRequestRoutes } from '../Modules/EditRequest/EditRequest.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/transport',
    route: TransportRoutes,
  },
  {
    path: '/document',
    route: DocumentRoutes,
  },
  {
    path: '/editRequest',
    route: EditRequestRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;