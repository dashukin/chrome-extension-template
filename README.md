# chrome-extension-template

Chrome extension template to easily get started building your own chrome extension.

Features:

1. ES2015+ syntax support via Babel and Webpack.
2. SCSS/CSS syntax support for stylesheets.
3. Manifest.hjson contains most of possible options with comments and links to docs. Just follow the docs and comment/uncomment neccessary options.
4. Build SCSS/JS/static files and create ZIP archive ready for publishing to webstore with only one command.

## Usage

1. Fork this repository and rename according to your extension name.
2. Clone this repo to your work folder.
3. Run "npm install" to get all dependencies.
4. Modify manifest.hjson file according to your extension requirements.
5. Add logic to javascript files that you're going to use.
6. Run "npm run dev" to automatically run build process when any of files is changed.
7. Run "npm run build" to create application build with ZIP archive ready to be uploaded to chrome webstore.