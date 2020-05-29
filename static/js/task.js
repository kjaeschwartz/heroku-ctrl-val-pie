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

/* Stimulus HTML template for the room choice round */
var roundStimTemplate = "<div id='pie_charts'>" +
						"<img src='static/images/img_1' alt='Left Left Pie Chart' class='left_left_chart'>" +
						"<img src='static/images/img_2' alt='Left Right Pie Chart' class='left_right_chart'>" +
						"<img src='static/images/img_3' alt='Right Left Pie Chart' class='right_left_chart'>" +
						"<img src='static/images/img_4' alt='Right Left Pie Chart' class='right_right_chart'>" +
						"</div>" +
						"<div id='configuration'>" +
						"<p class='left_config'> l_config </p>" +
						"<p class='right_config'> r_config </p>" +
						"</div>" +
						"<div id='prompt'>" +
						"<p class='left_selection_prompt'> Press LEFT arrow to select. </p>" +
						"<p class='right_selection_prompt'> Press RIGHT arrow to select. </p>" +
						"</div>";

/* Stimulus HTML template for the room trial */
var trialStimTemplate = "<div id ='reward'>" +
						"<img src='static/images/blue_reward' alt='Blue Reward' class='left_reward'>" +
						"<img src='static/images/green_reward' alt='Green Reward' class='middle_reward'>" +
						"<img src='static/images/red_reward' alt='Red Reward' class='right_reward'>" +
						"</div>" +
						"<div id='pie_charts'>" +
						"<img src='static/images/img_1' alt='Left Pie Chart' class='left_chart'>" +
						"<img src='static/images/img_2' alt='Right Pie Chart' class='right_chart'>" +
						"</div>" +
						"<div id='prompt'>" +
						"<p class='left_selection_prompt'> Press LEFT arrow to select. </p>" +
						"<p class='right_selection_prompt'> Press RIGHT arrow to select. </p>" +
						"</div>";

/* Stimulus HTML template for the reward display */
var rewardStimTemplate = "<div id = value>" +
	"<p>reward_value</p>" +
	"</div>" +
	"<div id ='reward'>" +
	"<img src='static/images/color_selected' alt='Selected Color' class='left_left_chart'>" +
	"</div>";

/* Returns the stimulus HTML string for the room choice page with the images replaced */
function roundSetImages(img1, img2, img3, img4, config, stimTemplate) {
	var imgMap = {
		img_1: img1 + ".png",
		img_2: img2 + ".png",
		img_3: img3 + ".png",
		img_4: img4 + ".png",
		l_config: (config[0] === 's') ? "self-play" : "auto-play",
		r_config: (config[1] === 's') ? "self-play" : "auto-play",
	};
	return stimTemplate.replace(/img_1|img_2|img_3|img_4|l_config|r_config/gi, function(matched) {
		return imgMap[matched];
	});
}

/* Returns the stimulus HTML string for the room trial page with the images and rewards replaced */
function trialSetImages(img1, img2, blueReward, greenReward, redReward, stimTemplate) {
	var imgMap = {
		img_1: img1,
		img_2: img2,
		blue_reward: blueReward,
		green_reward: greenReward,
		red_reward: redReward
	};
	return stimTemplate.replace(/img_1|img_2|blue_reward|green_reward|red_reward/gi, function(matched) {
		return imgMap[matched];
	});
}

/* Returns the stimulus HTML string for the result page with the images and rewards replaced */
function rewardSetImages(reward, color, stimTemplate) {
	var imgMap = {
		reward_value: reward,
		color_selected: color
	};
	return stimTemplate.replace(/reward_value|color_selected/gi, function(matched) {
		return imgMap[matched];
	});
}

var randomizedRoomChoice = jsPsych.randomization.shuffle(roomChoice); //Randomized order of the room choice rounds
var roundStims = []; //HTML templates corresponding to the randomized order of the room choice rounds

for (var i=0; i < randomizedRoomChoice.length; i++) {
	roundStims.push({
		stimulus: roundSetImages(randomizedRoomChoice[i][0], randomizedRoomChoice[i][1],
			                     randomizedRoomChoice[i][2], randomizedRoomChoice[i][3],
			                     randomizedRoomChoice[i][4], roundStimTemplate)
	})
}

var showRound = {
	type: "html-keyboard-response",
	choices: [37, 39],
	timeline: roundStims
};


var displayReward {
	type: "image-keyboard-response",
	post_trial_gap: 2000
}




/*******************
 * Run Task
 ******************/

jsPsych.init({
	//timeline: [instruction1, instruction2, instruction3, instructions4, showRound]
	timeline: [showRound],
	on_finish: function() {
		alert("Experiment has finished.");
	}
});
