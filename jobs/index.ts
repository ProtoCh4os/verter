/* eslint-disable no-console */
import './startup';

import './queues/build';
import agenda from '../api/config/jobs';
import { execSync } from 'child_process';
import { platform } from 'os';

if (platform() !== 'linux') {
  console.error(platform(), 'not supported');
  process.exit(1);
}

try {
  const data = execSync('which zip').toString('utf-8');
  console.log(data);
  if (!data) {
    console.error('zip is not installed in this system');
    process.exit(1);
  }
} catch (err) {
  console.error('zip is not installed in this system');
  process.exit(1);
}

agenda
  .processEvery('3 seconds')
  .start()
  .then(() => {
    console.log('Processor started');
  });
agenda.start();

async function graceful() {
  await agenda.stop();
  process.exit(0);
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);
