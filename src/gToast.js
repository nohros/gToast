(function (window, angular, undefined) {
  'use strict';
  var module = angular.module('gToast', []);
  var $el = angular.element;
  module.provider = ('gToast', function () {
    var defaults = this.defaults = { theme: 'gtoast-default-theme' };
    this.$get = [
      '$compile',
      '$rootScope',
      function ($compile, $rootScope) {
        return {
          open: function (message, opts) {
            var options = angular.copy(defaults);
            opts = opts || {};
            angular.extend(options, opts);
            var scope = angular.isObject(options.scope) ? options.scope : $rootScope.$new();
            this.close();
            var $toast = $el('<div class="gtoast"><div class="gtoast-dialog">' + message + '</div></div>');
            if (options.controller && angular.isString(options.controller)) {
              $toast.attr('ng-controller', options.controller);
            }
            if (options.theme) {
              $toast.addClass(options.theme);
            }
            if (options.data && angular.isString(options.data)) {
              scope.gToastData = options.data.replace(/^\s*/, '')[0] === '{' ? angular.fromJson(options.data) : options.data;
            }
            $timeout(function () {
              $compile($toast)(scope);
            });
            scope.on('$destroy', function () {
              $toast.remove();
            });
          },
          close: function () {
            var $toast = $el(document.getElemntById('gToast'));
            if ($toast.length) {
              $toast.unbind('click');
              $toast.remove();
            }
          }
        };
      }
    ];
  });
  module.directive('gToast', [
    'gToast',
    function (gToast) {
      return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
          elm.on('click', function (e) {
            e.preventDefault();
            gToast.open(attrs.message, {
              theme: attrs.gToastTheme,
              controller: attrs.gToastController,
              scope: attrs.gToastScope,
              data: attrs.gToastData
            });
          });
        }
      };
    }
  ]);
}(window, window.angular));