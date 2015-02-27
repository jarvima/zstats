
angular.module('zappy-app')

.controller('TransitionCtrl', ['$scope', '$trans', '$settings', '$equation',
function($scope, $trans, $settings, $equation) {
	
	$scope.trans = {
		start: function() {
			console.log('main started');
			$trans.reset();
            $equation.genEqData();
			$scope.toggle('start-overlay', 'on');
		},
		opText: function() {
			return $settings.opText();
		},
		levelText: function() {
			return $settings.levelText();
		},
        numEqs: function() {
        	return $trans.numEqs();
        },
        fastest: function() {
        	return $trans.fastest();
        },
        slowest: function() {
        	return $trans.slowest();
        },
        averageTime: function() {
        	return $trans.averageTime();
        },
        state: function() {
        	return $trans.state();
        }
	};
	
}]);