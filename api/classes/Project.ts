import { ProjectModel, ProjectModelInterface } from '../models/Project';
import Common from './Common';

export default class Project extends Common<ProjectModelInterface>(
  ProjectModel,
  'projects',
) {
  public static async list(
    page: number,
    perPage = 10,
  ): Promise<{ data: ProjectModelInterface[]; count: number }> {
    const [data, count] = await Promise.all([
      this.model
        .find({}, { versions: 0 })
        .limit(perPage)
        .skip(perPage * page),
      this.model.countDocuments(),
    ]);
    return { data, count };
  }
}
