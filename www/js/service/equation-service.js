
angular.module('equation.service', ['settings.service'])

.factory('$equation', ['$settings', '$stats', '$trans', function($settings, $stats, $trans) {

    var equation = {
        data: {
            num1: 0,
            num2: 0,
            ans: null,
            userAnsStr: null,
            op: Op.Add 
        },
        genEqData: function() {
            var eqData;
            do {
                eqData = $settings.genEqData();
            } while (eqData.ans == this.data.ans);
            eqData.userAnsStr = '';
            eqData.startTime = new Date();
            this.ansStr = '' + eqData.ans;
            this.data = eqData;
        },
        getEqStr: function() {
        	var data = this.data;
            return data.num1 + " " + data.op.symbol + " " + data.num2 + " =";
        },
        getLastAttemptStr: function() {
            var data = this.data.lastAttempt;
            if (typeof data == 'undefined') {
                return '';
            }
            else {
                return data.num1 + " " + data.op.symbol + " " + data.num2 + " = " + data.userAnsStr;
            }
        },
        numhit: function(num) {
            var userAnsStr = this.data.userAnsStr + num;
            this.data.userAnsStr = userAnsStr;
            if (userAnsStr.length == this.ansStr.length) {
                var lastAttempt = angular.copy(this.data);
                lastAttempt.userAnsStr = userAnsStr;
                if (userAnsStr == this.ansStr) {
                    this.genEqData();
                    lastAttempt.correct = true;
                    lastAttempt.time = new Date() - lastAttempt.startTime;
                }
                else {
                    this.data.userAnsStr = '';
                    lastAttempt.correct = false;
                }
                this.data.lastAttempt = lastAttempt;
                $stats.updateEqStats(lastAttempt);
                $trans.updateRoundStats(lastAttempt);
            }
        },
        delhit: function() {
            var userAnsStr = this.data.userAnsStr;
            if (userAnsStr.length > 0) {
                this.data.userAnsStr = userAnsStr.substring(0, userAnsStr.length - 1);
            }
        }
    };
    
    equation.genEqData();
    
    return equation;
}]);
