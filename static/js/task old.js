/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to

// All HTML pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-4.html",
	"stage.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-4.html"
];


/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
********************/

/********************
* CTRL-VAL-PIE TEST       *
********************/
var CtrlValPie = function() {

	var wordon, // time word is presented
	    listening = false;

	/*
	24x5 Matrix that specifies the room choice on each round.

	Column 1: Divergence for Left room, Left pie chart
	Column 2: Divergence for Left room, Right pie chart
	Column 3: Divergence for Right room, Left pie chart
	Column 4: Divergence for Right room, Right pie chart
	Column 5: Configuration i.e. self-self, self-auto, auto-self, auto-auto
	*/

	var roomChoice = [	//all random for now
			["2A1", "2A2", "2B1", "2B2", "ss"],
			["2A1", "2A2", "2B1", "2B2", "sa"],
		    ["2A1", "2A2", "2B1", "2B2", "as"],
			["2A1", "2A2", "2B1", "2B2", "aa"],
			["2C1", "2C2", "2D1", "2D2", "ss"],
			["2C1", "2C2", "2D1", "2D2", "sa"],
			["2C1", "2C2", "2D1", "2D2", "as"],
			["2C1", "2C2", "2D1", "2D2", "aa"],
			["60A1", "60A2", "60B1", "60B2", "ss"],
			["60A1", "60A2", "60B1", "60B2", "sa"],
			["60A1", "60A2", "60B1", "60B2", "as"],
			["60A1", "60A2", "60B1", "60B2", "aa"],
			["60C1", "60C2", "60D1", "60D2", "ss"],
			["60C1", "60C2", "60D1", "60D2", "sa"],
			["60C1", "60C2", "60D1", "60D2", "as"],
			["60C1", "60C2", "60D1", "60D2", "aa"],
			["40A1", "40A2", "40B1", "40B2", "ss"],
			["40A1", "40A2", "40B1", "40B2", "sa"],
			["40A1", "40A2", "40B1", "40B2", "as"],
			["40A1", "40A2", "40B1", "40B2", "aa"],
			["40C1", "40C2", "40D1", "40D2", "ss"],
			["40C1", "40C2", "40D1", "40D2", "sa"],
			["40C1", "40C2", "40D1", "40D2", "as"],
			["40C1", "40C2", "40D1", "40D2", "aa"]
	];

	/*
	24x3 Matrix that specifies the reward amounts associated with the
	blue, green, red colors on each round.

	Column 1: blue reward amount
	Column 2: green reward amount
	Column 3: red reward amount
	 */
	var rewardAmounts = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
	]
	/*
	var stims = [
			["SHIP", "red", "unrelated"],
			["MONKEY", "green", "unrelated"],
			["ZAMBONI", "blue", "unrelated"],
			["RED", "red", "congruent"],
			["GREEN", "green", "congruent"],
			["BLUE", "blue", "congruent"],
			["GREEN", "red", "incongruent"],
			["BLUE", "green", "incongruent"],
			["RED", "blue", "incongruent"]
		];

	stims = _.shuffle(stims);
	*/

	roomChoice = _.shuffle(roomChoice);

	var next = function() {
		if (roomChoice.length === 0) {
			finish();
		}
		else {
			room = roomChoice.shift();
			show_round(room[0], room[1], room[2], room[3]);
			wordon = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt">Type "R" for Red, "B" for blue, "G" for green.</p>');
		}
	};
	
	var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode,
			response;

		switch (keyCode) {
			case 82:
				// "R"
				response="red";
				break;
			case 71:
				// "G"
				response="green";
				break;
			case 66:
				// "B"
				response="blue";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {
			listening = false;
			var hit = response == stim[1];
			var rt = new Date().getTime() - wordon;

			psiTurk.recordTrialData({'phase':"TEST",
                                     'word':stim[0],
                                     'color':stim[1],
                                     'relation':stim[2],
                                     'response':response,
                                     'hit':hit,
                                     'rt':rt}
                                   );
			remove_word();
			next();
		}
	};

	var finish = function() {
	    $("body").unbind("keydown", response_handler); // Unbind keys
	    currentview = new Questionnaire();
	};

	/*
	var show_word = function(text, color) {
		d3.select("#stim")
			.append("div")
			.attr("id","word")
			.style("color",color)
			.style("text-align","center")
			.style("font-size","150px")
			.style("font-weight","400")
			.style("margin","20px")
			.text(text);
	};
	*/

	var show_round = function(pieL1, pieL2, pieR1, pieR2, config) {
		let imagePathL1 = "{{ server_location }}/static/images/" + pieL1 + ".png";
		let imagePathL2 = "{{ server_location }}/static/images/" + pieL2 + ".png";
		let imagePathR1 = "{{ server_location }}/static/images/" + pieR1 + ".png";
		let imagePathR2 = "{{ server_location }}/static/images/" + pieR2 + ".png";
		alert(imagePathL1);
		d3.select("#pieL1")
			.append("img")
			.attr("src", imagePathL1);
		d3.select("#pieL2")
			.append("img")
			.attr("src", imagePathL2);
		alert(imagePathR1);
		d3.select("#pieR1")
			.append("img")
			.attr("src", imagePathR1);
		d3.select("#pieR1")
			.append("img")
			.attr("src", imagePathR2)
	};

	var remove_word = function() {
		d3.select("#word").remove();
	};

	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 

	// Start the test
	next();
};


/****************
* Questionnaire *
****************/

var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});

	};

	prompt_resubmit = function() {
		document.body.innerHTML = error_message;
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                psiTurk.computeBonus('compute_bonus', function(){
                	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                }); 


			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire.html');
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
	
	$("#next").click(function () {
	    record_responses();
	    psiTurk.saveData({
            success: function(){
                psiTurk.computeBonus('compute_bonus', function() { 
                	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                }); 
            }, 
            error: prompt_resubmit});
	});
    
	
};

// Task object to keep track of the current phase
var currentview;

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new CtrlValPie(); } // what you want to do when you are done with instructions
    );
});
