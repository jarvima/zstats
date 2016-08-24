
angular.module('trans.service', ['settings.service'])

.factory('$trans', ['$filter', '$settings', function($filter, $settings) {

	var resetData =  function() {
		return {
            answerCount: 0,
            correctCount: 0,
            fastest: 1000000000000000,
            slowest: 0,
            totalTime: 0,
		};
	};
	
    var transService = {
        reset: function() {
        	this.data = resetData();
        	console.log('calling reset....')
        },
        updateRoundStats: function(lastAttempt) {
        	//console.log('lastAttempt', lastAttempt);
        	this.data.answerCount++;
        	if (lastAttempt.correct) {
        		this.data.correctCount = this.data.correctCount + 1;
        		this.data.totalTime += lastAttempt.time;
        		if (this.data.slowest < lastAttempt.time) {
        			this.data.slowest = lastAttempt.time;
        		}
        		if (this.data.fastest > lastAttempt.time) {
        			this.data.fastest = lastAttempt.time;
        		}
        	}
        },
        ansCount: function() {
        	return this.data.answerCount;
        },
        correctCount: function() {
        	return this.data.correctCount;
        },
        fastest: function() {
        	return this.data.fastest;
        },
        slowest: function() {
        	return this.data.slowest;
        },
        averageTime: function() {
        	return this.data.totalTime / this.data.correctCount;
        },
        state: function() {
        	if (this.data.answerCount == 0) {
        		return 'begin';
        	}
        	else {
        		return 'continue';
        	}
        }
    };
    
    transService.reset();

    return transService;
}]);

