import { ProjectModelInterface } from '~/api/models/Project';

export interface ResNewProject {
  id: string;
}

export interface ResListProject {
  projects: ProjectModelInterface[];
  count: number;
}
