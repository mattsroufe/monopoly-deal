## Development

We need to create two separate bundles:

`watchify components/server.js -t babelify -o public/server.js`

`watchify components/client.js -t babelify -o public/client.js`
