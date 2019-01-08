[![Coverage Status](https://coveralls.io/repos/github/AgileVentures/WebsiteOne-FE/badge.svg?branch=develop)](https://coveralls.io/github/AgileVentures/WebsiteOne-FE?branch=develop)

# Semantic ui - customize
## This needs to be run with npm - yarn does not support menu
`# npm install semantic-ui`

This will create a new semantic folder
and copy our defaut file:

`cp site.variables semantic/src/site/globals/` 

Then you can build semantic-ui
`gulp build` or `./../node_modules/gulp/bin/gulp.js build`
use the default values

and copy the folder to our src folder

`cp -R dist/* ../src/assets/`