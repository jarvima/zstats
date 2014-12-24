
zappy.text = {
		selectedLocale: 'en',
		get: function(key) {
		    if (key == undefined || key == "") {
		        return "";
		    }
		    try {
		        var text = this[this.selectedLocale][key];
		        
		        if (typeof text == 'undefined') {
		        	return key;
		        }
		        
		        var subKey
		        while (subKey = text.match(/{[^}]+}/)) { // text {placeHolder} text
		        	subKey = subKey[0].replace(/[{}]/g, '');
		        	if (subKey.match(/[0-9]+/)) {
		        		// if {0} or similar break
		        		// does not allow for both key and index place-holders
		        		break;
		        	}
		        	text = text.replace("{" + subKey + "}", this.get(subKey));
		        }
		        return text;
		    } catch (e) {
		        ///// uncomment this to get a sense of what keys aren't returning text yet
				//console.log('key not found: ' + key + ' error: ' + e);
		        /////
		        return key;
		    }
		},
		getEmbedded: function(key, params) {
		    var phrase = this.get(key);
		    var j = -1;
		    if(params != null){
		        for (var index in params) {
		            j++;
		            if (params[index] != undefined) {
		                phrase = phrase.replace("{" + j + "}", this.get(params[index]));
		            }
		        }
		    }
		    return phrase;
		}
 
};

