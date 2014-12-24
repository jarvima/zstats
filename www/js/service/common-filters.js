
var commonFilters = angular.module('common.filters', []);

commonFilters.filter('avgFormatter', ['$stats', function($stats) {
	return function(time) {
		return $stats.formatTime(time);
	};
}]);
