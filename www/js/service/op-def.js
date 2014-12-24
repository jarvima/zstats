
var OpDef = function(impl) {
	
	var keyPart = function(index) {
		return index + '_';
	};
	
    var base = {
        genEqData: function(settingsData) {
            var eqData = this.getNums(settingsData);
            eqData.ans = this.genAnswer(eqData);
            return eqData;
        },
        getNums: function(settingsData) {
            return {
                num1: this.genNumber(settingsData.num1high, settingsData.num1low),
                num2: this.genNumber(settingsData.num2high, settingsData.num2low)
            };
        },
        genNumber: function(max, min) {
           return Math.floor(Math.random() * (max - min + 1) + min);
        },
        getText: function($text) {
        	return $text.get(this.textKey);
        },
        getLevelKey: function(nums) {
        	var levelKey = 'lvlKey';
        	for (var j in this.levels) {
        		if (this.matchesPresets(nums, j)) {
        			return levelKey + keyPart(j) + 'preset';
        		}
        		if (this.withinLimits(nums, j)) {
        			return levelKey + keyPart(j) + 'custom';
        		}
        		if (this.overlaps(nums, j)) {
        			levelKey += keyPart(j);
        		}
        	}
        	return levelKey + 'custom';
        },
        matches: function(nums1, nums2) {
			if (nums1.num1low != nums2.num1low || nums1.num1high != nums2.num1high) {
				return false;
			}
			if (nums1.num2low != nums2.num2low || nums1.num2high != nums2.num2high) {
				return false;
			}
			return true;
        },
        matchesPresets: function(nums, index) {
        	var presets = this.levels[index].presets;
        	return this.matches(nums, presets);
        },
        withinLimits: function(nums, index) {
        	var limits = this.levels[index].limits;
			if (nums.num1low < limits.num1low || nums.num1low > limits.num1high) {
				return false;
			}
			if (nums.num1high < limits.num1low || nums.num1high > limits.num1high) {
				return false;
			}
			if (nums.num2low < limits.num2low || nums.num2low > limits.num2high) {
				return false;
			}
			if (nums.num2high < limits.num2low || nums.num2high > limits.num2high) {
				return false;
			}
			return true;
        },
        overlaps: function(nums, index) {
        	var limits = this.levels[index].limits;
			if (nums.num1low >= limits.num1low && nums.num1low <= limits.num1high) {
				return true;
			}
			if (nums.num1high >= limits.num1low && nums.num1high <= limits.num1high) {
				return true;
			}
			if (nums.num2low >= limits.num2low && nums.num2low <= limits.num2high) {
				return true;
			}
			if (nums.num2high >= limits.num2low && nums.num2high <= limits.num2high) {
				return true;
			}
			return false;
        },
        maxLimits: function() {
        	var mxLims = {};
        	for (var j in this.levels) {
        		var limits = this.levels[j].limits;
    			if (typeof mxLims.num1low == 'undefined' || mxLims.num1low > limits.num1low) {
    				mxLims.num1low = limits.num1low;
    			}
    			if (typeof mxLims.num1high == 'undefined' || mxLims.num1high < limits.num1high) {
    				mxLims.num1high = limits.num1high;
    			}
    			if (typeof mxLims.num2low == 'undefined' || mxLims.num2low > limits.num2low) {
    				mxLims.num2low = limits.num2low;
    			}
    			if (typeof mxLims.num2high == 'undefined' || mxLims.num2high < limits.num2high) {
    				mxLims.num2high = limits.num2high;
    			}
        	}
        	return mxLims;
        },
        resetToLimits: function(nums, limits) {
        	var extremes = ['low', 'high'];
        	for (var j = 0; j < extremes.length; j++) {
    			var index = j + 1;
    			var low = limits['num' + index + 'low'];
    			var high = limits['num' + index + 'high']
        		for (var k = 0; k < extremes.length; k++) {
        			var testKey = 'num' + index + extremes[k]; 
                	if (nums[testKey] < low) { nums[testKey] = low; }
                	else if (nums[testKey] > high) { nums[testKey] = high; }
        		}
        	}
        	return nums;
        }
        
    };
    return angular.extend(base, impl);
};

var Op = {
    Add: OpDef({
    	textKey: 'AddOp',
        genAnswer: function(eqData) {
            return eqData.num1 + eqData.num2;
        },
        symbol: "+",
        levels: [
             {
         		limits: {
        			num1low: 0,
        			num1high: 9,
        			num2low: 0,
        			num2high: 9
        		},
        		presets: {
        			num1low: 2,
        			num1high: 9,
        			num2low: 2,
        			num2high: 9
        		},
             },
             {
         		limits: {
        			num1low: 10,
        			num1high: 99,
        			num2low: 10,
        			num2high: 99
        		},
        		presets: {
        			num1low: 10,
        			num1high: 99,
        			num2low: 10,
        			num2high: 99
        		},
	          },
	          {
	      		limits: {
	    			num1low: 100,
	    			num1high: 999,
	    			num2low: 100,
	    			num2high: 999
	    		},
	    		presets: {
	    			num1low: 100,
	    			num1high: 999,
	    			num2low: 100,
	    			num2high: 999
	    		},
            },
        ]
    }),
    Sub: OpDef({
    	textKey: 'SubOp',
        genAnswer: function(eqData) {
            return eqData.num1 - eqData.num2;
        },
        symbol: "-",
        levels: [
             {
         		limits: {
        			num1low: 1,
        			num1high: 20,
        			num2low: 0,
        			num2high: 9
        		},
        		presets: {
        			num1low: 1,
        			num1high: 18,
        			num2low: 1,
        			num2high: 9
        		},
             },
             {
         		limits: {
        			num1low: 21,
        			num1high: 200,
        			num2low: 10,
        			num2high: 200
        		},
        		presets: {
        			num1low: 21,
        			num1high: 198,
        			num2low: 21,
        			num2high: 198
        		},
              },
              {
          		limits: {
        			num1low: 201,
        			num1high: 999,
        			num2low: 201,
        			num2high: 999
        		},
        		presets: {
        			num1low: 201,
        			num1high: 999,
        			num2low: 201,
        			num2high: 999
        		},
            },
        ]
    }),
    Mul: OpDef({
    	textKey: 'MulOp',
        genAnswer: function(eqData) {
            return eqData.num1 * eqData.num2;
        },
        symbol: "x",
        levels: [
             {
         		limits: {
        			num1low: 1,
        			num1high: 10,
        			num2low: 1,
        			num2high: 10
        		},
        		presets: {
        			num1low: 3,
        			num1high: 10,
        			num2low: 2,
        			num2high: 9
        		},
             },
             {
         		limits: {
        			num1low: 11,
        			num1high: 20,
        			num2low: 11,
        			num2high: 20
        		},
        		presets: {
        			num1low: 12,
        			num1high: 20,
        			num2low: 11,
        			num2high: 19
        		},
              },
              {
          		limits: {
        			num1low: 21,
        			num1high: 99,
        			num2low: 21,
        			num2high: 99
        		},
        		presets: {
        			num1low: 21,
        			num1high: 99,
        			num2low: 21,
        			num2high: 99
        		},
            },
        ]
    }),
    Div: OpDef({
    	textKey: 'DivOp',
        genAnswer: function(eqData) {
            return eqData.num1 / eqData.num2;
        },
        symbol: "/",
        levels: [
             {
         		limits: {
        			num1low: 1,
        			num1high: 100,
        			num2low: 1,
        			num2high: 9
        		},
        		presets: {
        			num1low: 6,
        			num1high: 81,
        			num2low: 2,
        			num2high: 9
        		},
             },
             {
         		limits: {
        			num1low: 101,
        			num1high: 400,
        			num2low: 10,
        			num2high: 20
        		},
        		presets: {
        			num1low: 121,
        			num1high: 400,
        			num2low: 11,
        			num2high: 20
        		},
              },
              {
          		limits: {
        			num1low: 401,
        			num1high: 9801,
        			num2low: 21,
        			num2high: 99
        		},
        		presets: {
        			num1low: 441,
        			num1high: 9801,
        			num2low: 21,
        			num2high: 99
        		},
            },
        ]
    })
};

