
var commonFilters = angular.module('common.filters', []);

commonFilters.filter('average', [function() {
	return function(time) {
    	return Math.round(time)/1000;
	};
}]);
