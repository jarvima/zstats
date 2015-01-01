
angular.module('trans.service', [])

.factory('$trans', ['$filter', function($filter) {

	var resetData =  function() {
		return {
            answerCount: 0,
            fastest: 1000000000000000,
            slowest: 0,
            totalTime: 0,
		};
	};
	
    var transService = {
        reset: function() {
        	this.data = resetData();
        },
        updateRoundStats: function(lastAttempt) {
        	this.data.answerCount++;
        	this.data.totalTime += lastAttempt.time;
        	if (this.data.slowest < lastAttempt.time) {
        		this.data.slowest = lastAttempt.time;
        	}
        	if (this.data.fastest > lastAttempt.time) {
        		this.data.fastest = lastAttempt.time;
        	}
        },
        numEqs: function() {
        	return this.data.numEqs;
        },
        fastest: function() {
        	return this.data.fastest;
        },
        slowest: function() {
        	return this.data.slowest;
        },
        averageTime: function() {
        	return this.data.totalTime / this.data.answerCount;
        }
    };
    
    transService.reset();

    return transService;
}]);

