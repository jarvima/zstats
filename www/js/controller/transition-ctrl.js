
angular.module('zappy-app')

.controller('TransitionCtrl', ['$scope', '$trans',
function($scope) {
	
	$scope.trans = {
		start: function() {
			console.log('main started');
			$scope.toggle('start-overlay', 'on');
		},
        numEqs: function() {
        	return $trans.numEqs;
        },
        fastest: function() {
        	return $trans.fastest;
        },
        slowest: function() {
        	return $trans.slowest;
        },
        averageTime: function() {
        	return $trans.totalTime / $trans.answerCount;
        }
	};
	
}]);