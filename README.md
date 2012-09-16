PEGjs Coffee Plugin
==========

Plugin for PEG.js to use CoffeeScript in actions. Because all I want
for christmas is CoffeeScript.

## Status
The basic functionality is finished. Please test it and add feature
requests and issues [here](https://github.com/Dignifiedquire/pegjs-coffee-plugin/issues).

## Requirements

* [PEG.js](http://pegjs.majda.cz/) (who would have guessed that?)
* [CoffeeScript](http://coffeescript.org/)

## Installation

#### Node.js

```bash
$ npm install pegjs-coffee-plugin
```
Then in your code call
```coffee-script
PEG = require 'pegjs'
PEGjsCoffeePlugin = require 'pegjs-coffee-plugin'
```

#### Browser

Download the
[development](https://raw.github.com/Dignifiedquire/pegjs-coffee-plugin/master/dist/web/pegjs-coffee-plugin-0.1.0.js)
or the
[minified](https://raw.github.com/Dignifiedquire/pegjs-coffee-plugin/master/dist/web/pegjs-coffee-plugin-0.1.0.min.js) version.
Now include all needed scripts in your html file like this.
```html
<script src="peg.js"></script>
<script src=coffee-script.js"></script>
<script src="pegjs-coffee-plugin.js"></script>
```

## Usage

### Script
After you have loaded all scripts you can do

```coffee-script
PEGjsCoffeePlugin.addTo PEG
# From here on out you can use CoffeeScript in your actions
PEG.compile(..)
```
If you don't need it anymore you can do the following
```coffee-script
PEGjsCoffeePlugin.removeFrom PEG
# From here on out everything is back to the way it was before
PEG.compile(..)
```
### Command line
You can use the command line interface the same way you use the one by
PEGjs. 
```bash
$ pegcoffee myGrammar.pegcoffee myCompiledGrammar.js
```
It defaults to use CoffeeScript but if you pass it the option `--js`
you get the old Javascript back.

## Added Features
You now have a save scope shared between all actions and predicates. 
To begin it is empty, then all declarations from the initializer are
added. Afterwards you can add and remove stuff as much as you like.
This scope is there even if you don't use the initializer. So you can
do something like the following.
```coffee-script
start = a { @result }
a = "a" { @result = "awesome" }
```
And this will correctly return `"awesome"` if you call `parse("a")`.

Also all variable assignments in an action are safely scoped to the
action. `{ result = "awesome" }` becomes `{ var result; result =
"awesome" }`. This gives you the ability to explicitly share variables
with other actions via `this` and the security to just assign
variables for local use like you are used to when writing CoffeeScript.


## Syntax changes
There is no need to call `return` anymore. You can just do
```coffee-script
start = a:"a" { "Great Stuff" }
```
which is the equivalent of

```javascript
start = a:"a" { return "Great Stuff"; }
```

If you declare variables in your initializer you set them on `this`.
```coffee-script
{
  @result = ""
}
start
  = awesome / rule { @result }
awesome
  = "awesome" { @result = "awesome" }
rule
  = "rule" { @result = "rule }
```



-------------

## Development


### Requirements

* [Node.js](http://nodejs.org/) with npm
* [mocha](http://visionmedia.github.com/mocha/)
* [expect.js](https://github.com/LearnBoost/expect.js)
* [http-server](https://github.com/nodeapps/http-server)
* [JSHint](http://www.jshint.com/)
* [UglifyJS](https://github.com/mishoo/UglifyJS)

### Setup

Clone the repo and run the install
```bash
$ git clone https://github.com/Dignifiedquire/pegjs-coffee-plugin.git
$ make install
```

### Building

```bash
$ make build
```

# Running the tests

For the Node.js tests run
```bash
$ make test
```
and for the browser tests
```bash
$ make test-browser
```
and open your browser on [localhost:3000](http://localhost:3000).



# Todo

* more tests
* make bower package

