
angular.module('zappy-app')

.directive('zpNumbtn', ['$equation', function($equation) {
	
	var template = '<div><div class="btn btn-default">{{value}}</div></div>';
	//var template = '<div><div class="btn btn-default" ng-click="clickNum(value)">{{value}}</div></div>';
	
	var clickNum = function(value) {
		$equation.numhit(value);
	}
	
	return {
		restrict: 'E',
		replace: true,
		template: template,
		scope:  {
			value: '='
		},
		link: function(scope, element, attrs) {
			scope.clickNum = clickNum;
			
			angular.element(element).bind('touchstart mousedown', function(event) {
				event.stopPropagation(); 
				event.preventDefault();
				clickNum(element[0].textContent);
				scope.$apply();
				console.log('touchstart fired', element[0].textContent)
			});
		},
    };
}])

.controller('EquationCtrl', ['$scope', '$equation', '$stats', '$text',
function($scope, $equation, $stats, $text) {
	
	var getCorrectValue = function(stateValues) {
		if (!$equation.data.lastAttempt) {
			return stateValues.empty;
		}
		return $equation.data.lastAttempt.correct ? stateValues.correct : stateValues.incorrect;
	}
	
	$scope.equation = {
		service: $equation,
		stats: $stats,
		correctClass: function() {
			return getCorrectValue({empty:'none', correct:'correct', incorrect:'incorrect'});
		},
		correctText: function() {
			return getCorrectValue({empty:'', correct:'Correct', incorrect:'Incorrect'});
		},
		opText: function() {
			return $settings.opText();
		},
		levelText: function() {
			return $settings.levelText();
		},
		lastFewLabel: function() {
			return $text.getEmbedded('lastFewAvg', [this.stats.data.lastFewNum]);
		},
		fastestFewLabel: function() {
			return $text.getEmbedded('fastestFew', [this.stats.data.lastFewNum]);
		},
	};
}]);