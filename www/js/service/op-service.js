		
angular.module('op.service', ['common.services'])

.factory('$op', function($text) {

	for (var j in Op) {
		var op = Op[j];
		op.text = function() {
			return this.getText($text);
		}
	}

	return Op;
});
