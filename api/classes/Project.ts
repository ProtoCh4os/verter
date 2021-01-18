import { Types } from 'mongoose';
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

  public static async getLastVersion(
    projectId: string,
  ): Promise<ProjectModelInterface['versions'][number] | undefined> {
    const [data] = await this.model
      .aggregate([
        {
          $unwind: '$versions',
        },
        {
          $match: {
            _id: Types.ObjectId(projectId),
          },
        },
        {
          $sort: {
            'versions.major': -1,
            'versions.minor': -1,
            'versions.patch': -1,
            'versions.timestamp': -1,
          },
        },
        {
          $limit: 1,
        },
      ])
      .exec();

    if (!data) return;

    return data.versions;
  }

  public static async newVersion({
    projectId,
    major,
    minor,
    patch,
    changelog,
    nickname,
  }: {
    projectId: string;
    major: number;
    minor: number;
    patch: number;
    changelog: string;
    nickname?: string;
  }): Promise<void> {
    await this.model.updateOne(
      { _id: Types.ObjectId(projectId) },
      {
        $push: {
          versions: {
            major,
            minor,
            patch,
            versionId: nickname || '',
            changelog,
            timestamp: new Date().toISOString(),
          },
        },
      },
    );
  }

  public static async listVersions(
    projectId: string,
  ): Promise<ProjectModelInterface['versions']> {
    const [data] = await this.model.aggregate<any>([
      { $unwind: '$versions' },
      {
        $sort: {
          'versions.major': -1,
          'versions.minor': -1,
          'versions.patch': -1,
          'versions.timestamp': -1,
        },
      },
      { $group: { _id: '$_id', versions: { $push: '$versions' } } },
      { $match: { _id: Types.ObjectId(projectId) } },
    ]);

    if (!data) return [];

    return data.versions;
  }
}
