
var commonDirectives = angular.module('common.directives', ['common.services']);

commonDirectives.directive('zpText', ['$text', function($text) {
	return {
		restrict : 'AE',
		link : function(scope, element, attrs) {
			element.html($text.get(element.html() ? element.html() : attrs.zpText));
		}
	};
}]);

commonDirectives.directive('adjustScrollable', ['$text', function($text) {
	return {
		restrict : 'C',
		link : function(scope, element, attrs) {
			if (element.next()) {
				element.css('height', 'auto');
				element.css('bottom', element.next()[0].offsetHeight + 'px');
			}
		}
	};
}]);


