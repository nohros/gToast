# gToast

Gmail toaster for angularjs(http://angularjs.org/) applications.

gToast is small (~1Kb), has minimalistic API, highly customizable through themes
and has only angularjs as dependency.

### [Example](http://nohros.com/gToast)

## Install

You can download all necessary gToast files manually or install it with bower:

```bash
bower install gToast
npm install
grunt compile
```

## Usage

You need only to include ``gToast.js`` and ``gToast.css`` (as minimal setup) to you project and then you can start
using the ``gToast`` directives, controllers and services. For example in controllers:

```javascript
angular
  .module('myApp', ['gToast'])

  .controller('MyAppCtrl', function($scope, gToast) {
    $scope.clickToOpen = function() {
      gToast.open("Toast notification message");
    };
  });
```

## API

gToast service provides a easy to use and minimalistc API, but the same time it's powerful enough. Here is the list of
methods that you can use:

### ``.open(text, opts)``

Method allows to show a toast, creates a new toast on each call. It accepts a ``message`` string and ``options`` object
arguments.

#### Options:

#### ``controller {String}``

Name of the controller that will be used by toast dialog if necessary.

#### ``scope {Object}``

Scope object that will be passed to toast. If you use controller with separate ``$scope`` service this object will be
passed to ``$scope.parent``.

#### ``data {String}``

Any data that you want to be stored in controller's ``$parent`` scope, it could be stringified JSON as well. The
data will be associated with the ``gToastData`` property of the toast's scope.

#### ``theme {String}``

This option allow to control toast dialog look, you can use built-in [themes](https://github.com/nohros/gToast#themes)
or create your own styled toasts.

This example enables one of built-in toast themes - ``gtoast-default-theme``(do not forget to include necessary css files):

```javascript
gToast.open('Toast notification', {
  theme:'gtoast-default-theme'
});
```

This theme will be used as default if none was specified. This theme makes the toast looks like the one used in
GMail.

Check [themes] (https://github.com/nohros/gToast#themes) block to learn more.

#### ``timeout {Integer}``

This option specifies the time (in milliseconds) for how long the toast will be displayed. This example makes the
toast visible for 3.5 seconds.

```javascript
gToast.open('Toast notification', function() {
  timeout: 3500
});
```

### ``.close()``

Closes the toast that is currently visible. If there are no visible toasts on the page, this method does nothing.

### Directive

By default gToast is served with ``gToast`` directive which can be used as attribute for buttons, links, etc. All
``.open()`` options are available through tag attributes as well.

A simple button should look like this:

```html
<button type="button"
  g-toast
  g-toast-theme="my-gtoast-theme"
  g-toast-controller="MyToastController"
  g-toast-text="Toast notification"
  g-toast-timeout="3500">
  Show me the toast!
</button>
```

## Themes

Currently ``gToast`` contains two themes that show how easily you can create your own. Check ``example`` folder for
demonstration purposes.

## Contribution
We use the C4 philosofy. Please read it: http://rfc.zeromq.org/spec:16

## License

MIT Licensed

Copyright (c) 2013, nohros.com <contact@nohros.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


