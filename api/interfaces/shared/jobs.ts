export interface BuildProjectJobInterface {
  id: string;
  version: string;
  buildSteps: string[];
  output: string;
  runtimeSteps: string[];
  stdout: string[];
}
