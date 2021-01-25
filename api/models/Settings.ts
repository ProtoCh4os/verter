import { Schema } from 'mongoose';
import { MongoModelInterface } from './common';

type SettingKeys = 'firstSetup';

export type SettingsModelInterface = MongoModelInterface & {
  key: SettingKeys;
  value: string | boolean | number | string[];
};

export const SettingsModel = new Schema<SettingsModelInterface>({
  key: String,
  value: String || Boolean || Number || [String],
});
