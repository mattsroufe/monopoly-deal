## Development

Install global dependencies

`npm install -g watchify`

`npm install -g nodemon`

We need to create two separate bundles:

`watchify components/server.js -t babelify -o public/server.js`

`watchify components/client.js -t babelify -o public/client.js`
