import { Schema } from 'mongoose';

export type ProjectModelInterface = {
  description: string;
  icon: string | null;
  config: {
    buildCommands: string[];
    outputFolder: string;
  };
  versions: {
    major: number;
    minor: number;
    patch: number;
    versionId: string;
    timestamp: string;
  }[];
};

export const ProjectModel = new Schema<ProjectModelInterface>({
  description: String,
  icon: String || null,
  config: {
    buildCommands: [String],
    outputFolder: String,
  },
  versions: [
    {
      major: Number,
      minor: Number,
      patch: Number,
      versionId: String,
      timestamp: String,
    },
  ],
});
