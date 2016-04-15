
angular.module('zappy-app')

.controller('TransitionCtrl', ['$scope', '$trans', '$settings', '$equation', '$text',
function($scope, $trans, $settings, $equation, $text) {
	
	var stopRound = function() {
		console.log('TODO quit the equation properly');
		$scope.toggle('start-overlay', 'off');
	}
	
	$scope.$trans = $trans;
	
	$scope.$watch('$trans.correctCount()', function(newValue, oldValue) {
		if (newValue == $scope.trans.numEqs()) {
			stopRound();
		}
	});
	
	$scope.trans = {
		start: function() {
			console.log('main started');
			$trans.reset();
            $equation.genEqData();
			$scope.toggle('start-overlay', 'on');
		},
		quit: function() {
			stopRound();
		},
		opText: function() {
			return $settings.opText();
		},
		levelText: function() {
			return $settings.levelText();
		},
        numEqs: function() {
        	return $settings.eqsPerRound();
        },
        ansCount: function() {
        	return $trans.ansCount();
        },
        correctCount: function() {
        	return $trans.correctCount();
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
        },
		progressNumbersText: function() {
			return $text.getEmbedded('progressNumbers', [$trans.correctCount() + 1, this.numEqs()]);
		},
	};
	
}]);