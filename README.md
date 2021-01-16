![Verter](https://raw.githubusercontent.com/ProtoCh4os/verter/master/static/brand.png)

![build:broken](https://img.shields.io/badge/build-broken-red) ![contributors:1](https://img.shields.io/badge/contributors-1-brightgreen) ![license:GNU GPLv3](https://img.shields.io/badge/license-GNU%20GPLv3-blue)

# What is Verter?
Verter is a **VER**sion rou**TER**, bundling in
  - A semantic version organizer for all your projects
  - A built-code storage and server
  - An extensible CLI tool for deployment
 
# Table of Contents

- [Project Status](#project-status)
- [Features](#features)
- [Technologies](#technologies)
- [Contributors](#contributors)
- [License](#license)

### Project status
Verter's in early stages and all help is more than welcome!

### Features

Intended to be a very versatile, multi-user tool for organizing your projects:
1. Configure a server with Redis (jobs manager) and MongoDB (general database)
2. Open up Verter and register a project, specifying a step-by-step build guide; Where the output can be found; And a step-by-step runtime instructions
3. Create a new version to your project, specifying changelog, what type of version change it is (major, minor or patch) and a nickname, if needed. Verter will then queue a build, and once done, will store the built file with build instructions for that version.

That's it on the UI side! Now over to another server, where I want to install and serve my project.

Using Verter's CLI tool:
1. Register this Verter CLI instance at your original Verter UI app, to allow secure comunication and access to your projects.
2. Download the complete list of projects and choose which project and in which version you'd like to download.
3. You can run the project with an interactive CLI, or via a single command such as `verter run myProject@1.0.0`
 
Running instances of Verter's CLI can then be monitored through Verter's UI, keeping your project healthy!

### Tecnologies

Verter is powered by: 
- [Typescript](http://typescriptlang.org/)
- [Nuxt.JS](https://www.npmjs.com/package/nuxt)
- [Bull](https://www.npmjs.com/package/bull)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Express](https://www.npmjs.com/package/express)
- [Socket.IO](https://socket.io/)
- And more!

### Contributors
- [@ProtoCh4os (Author)](https://github.com/ProtoCh4os)

### License
Verter's under [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html) License.
