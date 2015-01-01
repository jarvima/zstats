
var commonServices = angular.module('common.services', ['equation.service', 'stats.service', 'trans.service']);

commonServices.factory('$text', function() {
	return zappy.text;
});


