(function() {
  function seekBar($document) {
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      var offsetXPercent = Math.max(0, offsetXPercent);
      var offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };
    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      /*Declaring empty scope ensures a new scope will exist specifically for the directive*/
      scope: {},
      link: function(scope, element, attributes) {
        /* directive logic to return*/
          scope.value = 0;
          scope.max = 100;

          var seekBar = $(element);

          var percentString = function() {
            var value = scope.value;
            var max = scope.max;
            var percent = value / max * 100;
            return percent + "%";
          };

          scope.fillStyle = function() {
            return {width: percentString()};
          };

          scope.onClickSeekBar = function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.value = percent * scope.max;
          };

          scope.trackThumb = function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          };
      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
})();
