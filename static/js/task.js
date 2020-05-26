/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to

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
* CTRL-VAL-PIE TEST *
********************/

/*
Instruction Pages
 */

var instruction1 = {
	type: "image-button-response",
	stimulus: "/static/images/Instructions1.png",
	choices: ['Next'],
	trial_duration: null
};

var instruction2 = {
	type: "image-button-response",
	stimulus: "/static/images/Instructions2.png",
	choices: ['Next'],
	trial_duration: null
};

var instruction3 = {
	type: "image-button-response",
	stimulus: "/static/images/Instructions3.png",
	choices: ['Next'],
	trial_duration: null
};

var instructions4 = {
	type: "image-button-response",
	stimulus: "/static/images/Instructions4.png",
	choices: ['Next'],
	trial_duration: null
};

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
];


var showRound = {
	type: "html-keyboard-response",
	stimulus: "<img src='static/images/2A1.png' alt='Left Left Pie Chart' class='chart'>" +
				"<img src='static/images/2A2.png' alt='Left Right Pie Chart' class='chart'>" +
				"<img src='static/images/2B1.png' alt='Right Left Pie Chart' class='chart'>" +
				"<img src='static/images/2B2.png' alt='Right Left Pie Chart' class='chart'>",

				//"<img src='static/images/select.png' alt='Selection Arrows'>" +

	choices: ["left arrow", "right arrow"],
	prompt: "<div id='prompt'>" +
			"<p style='text-align:center;'>Press RIGHT arrow to select.</p>" +
			"</div>"

};





/*******************
 * Run Task
 ******************/

jsPsych.init({
	//timeline: [instruction1, instruction2, instruction3, instructions4, showRound]
	timeline: [showRound]
});
