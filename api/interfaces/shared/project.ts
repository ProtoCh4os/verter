import { ProjectModelInterface } from '~/api/models/Project';

export interface ResNewProject {
  id: string;
}

export interface ResListProject {
  projects: Omit<ProjectModelInterface, 'versions'>[];
  count: number;
}

export interface ResDetailsProject {
  project: ProjectModelInterface;
}
