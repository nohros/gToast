(function (window, angular, undefined) {
  'use strict';

  var module = angular.module('gToast', []);
  var $el = angular.element;
  var isDef = angular.isDefined;
  var forEach = angular.forEach;

  module.provider('gToast', function () {
    var defaults = this.defaults = {
      theme: 'gtoast-default-theme',
      timeout: 3500
    };

    /**
     * Extends the destination objec 'dst' by copying all of the properties from the 'src' object(s)
     * to 'dst'. Multiple src objects could be specified. 'undefined' values are not copied.
     *
     * @param {Object} dst The destination object.
     * @param {Object} src The spurce object.
     * @returns {Object} Reference to 'dst'.
     */
    var extend = function extend(dst, src) {
      forEach(arguments, function(obj) {
        if (obj !== src) {
          forEach(obj, function(value, key) {
            if (isDef(value)) {
              dst[key] = value;
            }
          });
        }
      });
    };

    this.$get = ['$document', '$compile', '$rootScope', '$timeout', '$animate',
      function ($document, $compile, $rootScope, $timeout, $animate) {
        var $body = $document.find('body');
        var timeout = $timeout;

        return {

          /**
           *
           */
          open: function (text, opts) {
            var self = this;
            var options = angular.copy(defaults);
            opts = opts || {};
            extend(options, opts);

            var scope = angular.isObject(options.scope) ? options.scope : $rootScope.$new();

            // ensure that there is no gToast in the page.
            self.close();

            var $toast = $el('<div id="gToast" class="gtoast"><div class="gtoast-dialog">' + text + '</div></div>');
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

            scope.$on('$destroy', function () {
              $toast.remove();
            });

            $animate.enter($toast, $body, null);

            //$body.append($toast);

            if (options.timeout > 0) {
              timeout = $timeout(function() {
                timeout = null;
                self.close();
              }, options.timeout);
            }
          },

          /**
           *
           */
          close: function () {
            var $toast = $el(document.getElementById('gToast'));
            if ($toast.length) {
              if (timeout) {
                $timeout.cancel(timeout);
                timeout = null;
              }

              $toast.unbind('click');
              $animate.leave($toast);
            }
          }
        };
      }];
  });

  module.directive('gToast', ['gToast',
    function (gToast) {
      return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
          elm.on('click', function (e) {
            e.preventDefault();
            gToast.open(attrs.gToastText, {
              theme: attrs.gToastTheme,
              controller: attrs.gToastController,
              scope: attrs.gToastScope,
              data: attrs.gToastData,
              timeout: attrs.gToastTimeout
            });
          });
        }
      };
    }]);

})(window, window.angular);