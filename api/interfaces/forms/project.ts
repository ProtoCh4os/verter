export interface ProjectFormInterface {
  id: string;
  description: string;
  icon: string | File | null;
  buildCommands: string[];
  outputFolder: string;
  outputRuntime: string[];
}
