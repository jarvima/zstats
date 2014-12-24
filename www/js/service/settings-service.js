		
angular.module('settings.service', ['op.service'])

.factory('$settings', ['$op', '$text', function($op, $text) {

    return {
        data: {
            num1high: 20,
            num1low: 0,
            num2high: 20,
            num2low: 0,
            op: $op.Add
        },		
        genEqData: function() {
            var op = this.data.op;
            var eqData = op.genEqData(this.data);
            eqData.op = op;
            return eqData;
        },
        opText: function() {
        	return this.data.op.text();
        },
        levelText: function() {
        	return $text.get(this.data.op.getLevelKey(data));
        }
    };
}]);
