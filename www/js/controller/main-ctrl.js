
angular.module('zappy-app')

.controller('MainCtrl', ['$scope',
function($scope) {
	
	$scope.main = {
		//state: 'eqZone',
		state: 'settings',
		setState: function(state) {
			this.state = state;
			console.log("set state: " + state);
		}
	};
	
}]);