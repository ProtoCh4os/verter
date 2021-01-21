import { Job } from 'agenda';
import { Types } from 'mongoose';
import agenda from '../config/jobs';

type JobSearch = Parameters<typeof agenda.jobs>[0];

export default class Jobs {
  private static agenda = agenda;

  public static async add(job: string, data: any): Promise<Job> {
    return this.agenda.now(job, data);
  }

  public static async getJob(id: string): Promise<Job | undefined> {
    const [data] = await this.agenda.jobs({
      _id: Types.ObjectId(id),
    });

    return data;
  }

  public static async find(query: JobSearch): Promise<Job[]> {
    return this.agenda.jobs(query);
  }

  public static async getJobStatus(
    name: string,
    id: string,
  ): Promise<'idle' | 'running' | 'done' | 'not-found'> {
    const [job] = await this.agenda.jobs({
      name,
      _id: Types.ObjectId(id),
    });

    if (!job) return 'not-found';

    if (job.attrs.lastRunAt === null) return 'idle';

    if (job.attrs.lastFinishedAt === null) return 'running';

    return 'done';
  }
}
