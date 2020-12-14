import { ProjectModel } from '../models/Project';
import Common from './Common';

export default class Project extends Common(ProjectModel, 'projects') {}
