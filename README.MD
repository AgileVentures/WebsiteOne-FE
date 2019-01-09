[![Coverage Status](https://coveralls.io/repos/github/AgileVentures/WebsiteOne-FE/badge.svg?branch=develop)](https://coveralls.io/github/AgileVentures/WebsiteOne-FE?branch=develop)

# Rebuild the semantic UI asserts
## This command needs to be run with npm - yarn does not support interactive prompt installs
`# npm install --save-dev semantic-ui`
Then remove the dependency from package.json and delete the package-lock.json file - we do not want it as a dependency for every user

This will create a new semantic folder
and copy our defaut file:

`cp site.variables semantic/src/site/globals/` 

Then you can build semantic-ui
`gulp build` or `./../node_modules/gulp/bin/gulp.js build`
use the default values

and copy the folder to our src folder

`cp -R dist/* ../src/assets/`
