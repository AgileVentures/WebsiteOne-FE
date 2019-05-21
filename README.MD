[![Coverage Status](https://coveralls.io/repos/github/AgileVentures/WebsiteOne-FE/badge.svg?branch=develop)](https://coveralls.io/github/AgileVentures/WebsiteOne-FE?branch=develop) [![CircleCI](https://circleci.com/gh/AgileVentures/WebsiteOne-FE.svg?style=svg)](https://circleci.com/gh/AgileVentures/WebsiteOne-FE)

# AgileVentures Website React Front End

## Project Installation

---

1. Fork the project by clicking on the Fork button on the top-right section of this page.
2. Clone it using the following command in your local working directory

```bash
$ git clone https://github.com/[YOUR_GIT_USERNAME]/WebsiteOne-FE.git
#or ( using ssh)
$ git clone  git@github.com:[YOUR_GIT_USERNAME]/WebsiteOne-FE.git
```

3. Install dependencies

```bash
$ cd WebsiteOne-FE
$ yarn install
```

## Run the application

```bash
$ yarn start
```

## Run tests

```bash
$ yarn test
```

On windows:

```bash
  yarn windows-test
```

**Note :** At this level, you should be able to run the project. In case an upgrade is needed for semantic UI, following the section below.

## Rebuild the semantic UI asserts

This command needs to be run with **npm** - **yarn** does not support interactive prompt installs

```bash
$ npm install --save-dev semantic-ui`
```

Then remove the dependency from package.json and delete the package-lock.json file - we do not want it as a dependency for every user

This will create a new semantic folder
and copy our defaut file:

```bash
cp site.variables semantic/src/site/globals/`
```

Then you can build semantic-ui
`gulp build` or `./../node_modules/gulp/bin/gulp.js build`
use the default values

and copy the folder to our src folder

```bash
cp -R dist/* ../src/assets/

```

## Using Docker for local Development

---

### Prerequisite

- Ensure you have docker installed. [Install docker](https://docs.docker.com/install/)

### Instructions

- Change to the project root directory. (./WebsiteOne-FE)
- Create an image with the following command
  > docker build -f docker/Dockerfile -t websiteone-fe:dev .
- Run the created image with
  > docker run -p 80:80 websiteone-fe:dev
- Access the application on localhost port 80
  > http://127.0.0.1:80

### [Code of Conduct](./CODE_OF_CONDUCT.md).

### [Contribution Guide](./CONTRIBUTION_GUIDE.md).

### License

[MIT licensed](./LICENSE).
