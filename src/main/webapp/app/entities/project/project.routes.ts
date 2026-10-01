import { Routes } from '@angular/router';

import { ASC } from 'app/config';
import { userRouteAccessService } from 'app/core/auth';

import ProjectResolve from './route/project-routing-resolve.service';

const projectRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/project').then(m => m.Project),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/project-detail').then(m => m.ProjectDetail),
    resolve: {
      project: ProjectResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/project-update').then(m => m.ProjectUpdate),
    resolve: {
      project: ProjectResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/project-update').then(m => m.ProjectUpdate),
    resolve: {
      project: ProjectResolve,
    },
    canActivate: [userRouteAccessService],
  },
];

export default projectRoute;
