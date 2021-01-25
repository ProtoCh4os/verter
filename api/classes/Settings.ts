import { SettingsModel, SettingsModelInterface } from '../models/Settings';
import Common from './Common';

export default class Settings extends Common<SettingsModelInterface>(
  SettingsModel,
  'settings',
) {}
