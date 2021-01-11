import { ProjectModelInterface } from '~/api/models/Project';

export interface ResNewProject {
  id: number;
}

export interface ResListProject {
  projects: ProjectModelInterface[];
  count: number;
}
