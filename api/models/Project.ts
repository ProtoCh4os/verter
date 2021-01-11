import { Schema } from 'mongoose';
import { MongoModelInterface } from './common';

export type ProjectModelInterface = MongoModelInterface & {
  description: string;
  icon: string | null;
  config: {
    buildCommands: string[];
    outputFolder: string;
    outputRuntime: string[];
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
    outputRuntime: [String],
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
