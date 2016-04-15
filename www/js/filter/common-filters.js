
var commonFilters = angular.module('common.filters', []);

commonFilters.filter('average', [function() {
	return function(time) {
    	return (time/1000).toFixed(2);
	};
}]);
