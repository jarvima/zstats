
angular.module('stats.service', [])

.factory('$stats', ['$timeout', '$filter', function($timeout, $filter) {

    var statsService = {
    	data: {
            streak: 0,
            streakCorrect: true,

            lastTime: null,
            
            answerCount: 0,
            correctCount: 0,
            averageTime: 0,
            
            lastFewNum: 10,
            lastFew: [],
            answerFewCount: 0,
            lastFewAvgTime: 0,
            fastestFew: null,
        },
        initialize: function() {
            //console.log("stats model is initializing...");
            var stored = zappy.cookies.read('stats');
            if (stored) {
            	var thisRef = this;
            	//$timeout(function() {
                	thisRef.data = stored;
            	//});
            }
        },
        averageTime: function() {
        	return $filter('average')(this.data.averageTime);
        },
        lastFewAvgTime: function() {
        	return $filter('average')(this.data.lastFewAvgTime);
        },
        updateEqStats: function(lastAttemptArg) {
            var stats = angular.copy(this.data);
            var lastAttempt = angular.copy(lastAttemptArg);
            this.updateStreak(stats, lastAttempt);
            this.updateTimeAvgs(stats, lastAttempt);
            this.updateTimeFewAvgs(stats, lastAttempt);
            this.data = stats;
            zappy.cookies.write('stats', stats);
        },
        updateStreak: function(stats, lastAttempt) {
            if (lastAttempt.correct === stats.streakCorrect) {
                stats.streak++;
            }
            else {
                stats.streak = 1;
                stats.streakCorrect = lastAttempt.correct;
            }
        },
        updateTimeAvgs: function(stats, lastAttempt) {
            stats.answerCount++;
            if (lastAttempt.correct) {
                var total = stats.averageTime * stats.correctCount;
                total += lastAttempt.time;
                stats.correctCount++;
                //console.log('stats total: ' + total + ' stats.correctCount: ' + stats.correctCount);
                stats.averageTime = total / stats.correctCount; 
            }
        },
        updateTimeFewAvgs: function(stats, lastAttempt) {
            if (lastAttempt.correct) {
            	var total;
                if (stats.answerFewCount == stats.lastFewNum) {
                    var shifted = stats.lastFew.shift();
                    total = (stats.lastFewAvgTime * stats.answerFewCount) - shifted;
                }
                else {
                    total = stats.lastFewAvgTime * stats.answerFewCount;
                    stats.answerFewCount++;
                }
                //console.log("time: " + lastAttempt.time);
                total += lastAttempt.time;
                stats.lastFewAvgTime = total / stats.answerFewCount;
                stats.lastFew.push(lastAttempt.time);
                if (stats.fastestFew == null || stats.lastFewAvgTime < stats.fastestFew) {
                	stats.fastestFew = stats.lastFewAvgTime;
                }
            }
        }
    };
    
    statsService.initialize();

    return statsService;
}]);

