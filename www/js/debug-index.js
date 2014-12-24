
angular.module('zappy-app', ['ngRoute', 'mobile-angular-ui', 'common.directives'])

.config(function($routeProvider) {
	$routeProvider.when('/', {
	});
	
	
});

(function() {
    "use strict";
    
    function register_event_handlers() {
        var settings = new SettingsModel();
        var equation = new EquationModel({settings: settings});
        var stats = new StatsModel({equation: equation});
        
        new EquationView({model: equation});
        new LastAttemptView({model: equation});
        new AnswerView({model: equation});
        new AverageView({model: stats});
        new LastFewAvgView({model: stats});
        new StreakView({model: stats});
        
        $.ui.showModal("#settingsDiv","pop");
        
        
        var doc = $(document);
        
        doc.on('click', '#startAction', function(evt) {
            equation.genEqData();
        	$.ui.hideModal("pop");
        	console.log('modal should be hidden');
        });
        
        doc.on("click", "#menuButton", function(evt) {
            $.ui.toggleRightSideMenu();
        });

        doc.on("click", "#zappy_menu", function(evt) {
            $.ui.toggleRightSideMenu(false);
            $.ui.loadContent("zappy_panel",false,false,"pop");
        });

        doc.on("click", "#stats_menu", function(evt) {
            $.ui.toggleRightSideMenu(false);
            $.ui.loadContent("stats_panel",false,false,"pop");
        });

        doc.on("click", "#settings_menu", function(evt) {
            $.ui.toggleRightSideMenu(false);
            $.ui.loadContent("settings_panel",false,false,"pop");
        });

        doc.on("click", ".number-btn", function(evt) {
            equation.numhit($(this).text());
        });

        doc.on("click", ".del-btn", function(evt) {
            equation.delhit();
        });

        // TODO this isn't working
        $.ui.setRightSideMenuWidth($("#afui").width()-10);
    }
    
    function init() {
    	i18nize();
    	register_event_handlers();
    }
    
    function debug() {
    	
    	//localStorage.debug3 = 'some debug 3 value';
    	console.log('debug3: ' + localStorage.debug3);
    	
    	
        var cookies = zappy.cookies;
        var debug = cookies.read('debug');
        var debug2 = cookies.read('debug2');
        
        	cookies.write('debug2', {value1:'some; value for; debug2'});
        	cookies.write('debug', {value1:'some ;;;debug;;; value.'});
        	console.log('debug.value1: ' + debug.value1); 
        	console.log('debug2.value1: ' + debug2.value1); 
        	console.log("document.cookie: " + document.cookie);
    }

    //$(document).ready(init);
    //$(document).ready(debug);
})();
