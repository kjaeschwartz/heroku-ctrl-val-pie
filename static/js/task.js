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

var experiment = [];

var roomInfo = [
		["2A1", "2A2", "2B1", "2B2", "ss",     0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.6,  0.4,  0.07, 0.2,  0.73,  0, -1,  1,  2,  2,  1],
		["2A1", "2A2", "2B1", "2B2", "ss",     0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.6,  0.4,  0,    0.2,  0.73, 0.07,  1,  2,  1,  1, -1,  1],
		["2A1", "2A2", "2B1", "2B2", "ss",     0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.7,  0.3,  0.1,  0.2,  0.7,   0, -1,  1, -1, -2,  1],
		["2A1", "2A2", "2B1", "2B2", "ss",     0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.7,  0.3,  0,    0.2,  0.7,  0.1,   1,  2,  1,  1,  2, -1],
		["2C1", "2C2", "2D1", "2D2", "ss",     0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.78, 0.22, 0.15, 0.2,  0.65,  0, -1,  1, -1,  2, -1],
		["2C1", "2C2", "2D1", "2D2", "ss",     0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.78, 0.22, 0,    0.2,  0.65, 0.15,  1,  2,  1,  0,  1, -1],
		["2C1", "2C2", "2D1", "2D2", "ss",     0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.6,  0.4,  0.07, 0.2,  0.73, -1,  2, -1,  2,  2,  1],
		["2C1", "2C2", "2D1", "2D2", "ss",     0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.6,  0.4,  0,    0.2,  0.73, 0.07,  0,  1, -1,  1, -1,  1],
		["60A1", "60A2", "60B1", "60B2", "ss", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.7,  0.3,  0.1,  0.2,  0.7,  -1,  2, -1, -1, -2,  1],
		["60A1", "60A2", "60B1", "60B2", "ss", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.7,  0.3,  0,    0.2,  0.7,  0.1,   0,  1, -1,  1,  2, -1],
		["60A1", "60A2", "60B1", "60B2", "sa", 0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.6,  0.4,  0.07, 0.2,  0.73,  0, -1,  1,  2,  1,  2],
		["60A1", "60A2", "60B1", "60B2", "sa", 0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.6,  0.4,  0,    0.2,  0.73, 0.07,  1,  2,  1, -1,  1,  1],
		["60C1", "60C2", "60D1", "60D2", "sa", 0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.7,  0.3,  0.1,  0.2,  0.7,   0, -1,  1,  3, -1,  1],
		["60C1", "60C2", "60D1", "60D2", "sa", 0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.7,  0.3,  0,    0.2,  0.7,  0.1,   1,  2,  1,  2,  1,  2],
		["60C1", "60C2", "60D1", "60D2", "sa", 0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.78, 0.22, 0.15, 0.2,  0.65,  0, -1,  1, -1,  2,  1],
		["60C1", "60C2", "60D1", "60D2", "sa", 0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.78, 0.22, 0,    0.2,  0.65, 0.15,  1,  2,  1,  1,  0,  0],
		["40A1", "40A2", "40B1", "40B2", "sa", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.6,  0.4,  0.07, 0.2,  0.73, -1,  2, -1,  2,  1,  2],
		["40A1", "40A2", "40B1", "40B2", "sa", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.6,  0.4,  0,    0.2,  0.73, 0.07,  0,  1, -1, -1,  1,  1],
		["40A1", "40A2", "40B1", "40B2", "sa", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.7,  0.3,  0.1,  0.2,  0.7,  -1,  2, -1,  3, -1,  1],
		["40A1", "40A2", "40B1", "40B2", "sa", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.7,  0.3,  0,    0.2,  0.7,  0.1,   0,  1, -1,  2,  1,  2],
		["40C1", "40C2", "40D1", "40D2", "aa", 0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.6,  0.4,  0.07, 0.2,  0.73,  1, -1,  1,  2,  1,  2],
		["40C1", "40C2", "40D1", "40D2", "aa", 0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.6,  0.4,  0,    0.2,  0.73, 0.07,  1,  2,  1, -1,  1,  1],
		["40C1", "40C2", "40D1", "40D2", "aa", 0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.7,  0.3,  0.1,  0.2,  0.7,   1, -1,  1,  3, -1,  1],
		["40C1", "40C2", "40D1", "40D2", "aa", 0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.7,  0.3,  0,    0.2,  0.7,  0.1,   1,  2,  1,  2,  1,  2],
		["10B2", "10C2", "10D2", "10D2", "aa", 0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.78, 0.22, 0.15, 0.2,  0.65,  1, -1,  1, -1,  2,  1],
		["10B2", "10C2", "10D2", "10D2", "aa", 0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.78, 0.22, 0,    0.2,  0.65, 0.15,  1,  2,  1,  1,  0,  0],
		["10B2", "10C2", "10D2", "10D2", "aa", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.6,  0.4,  0.07, 0.2,  0.73, -1,  2,  1,  2,  1,  2],
		["10B2", "10C2", "10D2", "10D2", "aa", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.6,  0.4,  0,    0.2,  0.73, 0.07,  1,  0,  0, -1,  1,  1],
		["20A1", "20A2", "20B1", "20B2", "aa", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.7,  0.3,  0.1,  0.2,  0.7,  -1,  2,  1,  3, -1,  1],
		["20A1", "20A2", "20B1", "20B2", "aa", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.7,  0.3,  0,    0.2,  0.7,  0.1,   1,  0,  0,  2,  1,  2],
		["20A1", "20A2", "20B1", "20B2", "as", 0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.6,  0.4,  0.07, 0.2,  0.73,  1, -1,  1,  2,  2,  1],
		["20A1", "20A2", "20B1", "20B2", "as", 0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.6,  0.4,  0,    0.2,  0.73, 0.07,  1,  2,  1,  1, -1,  1],
		["30A1", "30A2", "30B1", "30B2", "as", 0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.7,  0.3,  0.1,  0.2,  0.7,   1, -1,  1, -1, -2,  1],
		["30A1", "30A2", "30B1", "30B2", "as", 0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.7,  0.3,  0,    0.2,  0.7,  0.1,   1,  2,  1,  1,  2, -1],
		["30A1", "30A2", "30B1", "30B2", "as", 0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.78, 0.22, 0.15, 0.2,  0.65,  1, -1,  1, -1,  2, -1],
		["30A1", "30A2", "30B1", "30B2", "as", 0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.78, 0.22, 0,    0.2,  0.65, 0.15,  1,  2,  1,  0,  1, -1],
		["30C1", "30C2", "30D1", "30D2", "as", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.6,  0.4,  0.07, 0.2,  0.73, -1,  2,  1,  2,  2,  1],
		["30C1", "30C2", "30D1", "30D2", "as", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.6,  0.4,  0,    0.2,  0.73, 0.07,  1,  0,  0,  1, -1,  1],
		["30C1", "30C2", "30D1", "30D2", "as", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.7,  0.3,  0.1,  0.2,  0.7,  -1,  2,  1, -1, -2,  1],
		["30C1", "30C2", "30D1", "30D2", "as", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.7,  0.3,  0,    0.2,  0.7,  0.1,   1,  0,  0,  1,  2, -1]
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
						"<p class='blue_reward'> $blue_amt </p>" +
						"<p class='green_reward'> $green_amt </p>" +
						"<p class='red_reward'> $red_amt </p>" +
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
						"<p class='reward_amt' style='color:text_color'>$reward_value</p>" +
						"</div>" +
						"<div id ='reward_img'>" +
						"<img src='static/images/color_selected' alt='Selected Color' class='center_chart'>" +
						"</div>";

var fixation = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;">+</div>',
	choices: jsPsych.NO_KEYS,
	trial_duration: 1000,
};

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
		img_1: img1 + ".png",
		img_2: img2 + ".png",
		blue_amt: blueReward,
		green_amt: greenReward,
		red_amt: redReward,
	};
	return stimTemplate.replace(/img_1|img_2|blue_amt|green_amt|red_amt/gi, function(matched) {
		return imgMap[matched];
	});
}

/* Returns the stimulus HTML string for the result page with the images and rewards replaced */
function rewardSetImages(reward, color, stimTemplate) {
	var imgMap = {
		reward_value: reward,
		color_selected: color + ".png",
		text_color: color.substring(0, color.length - 1)
	};
	return stimTemplate.replace(/reward_value|color_selected|text_color/gi, function(matched) {
		return imgMap[matched];
	});
}

var randomizedRoomChoice = jsPsych.randomization.shuffle(roomInfo); //Randomized order of the room choice rounds (all room info 40x23)
var roundStims = []; //HTML templates corresponding to the randomized order of the room choice rounds (just stimulus templates)

for (var i=0; i < randomizedRoomChoice.length; i++) {
	roundStims.push(
		 roundSetImages(randomizedRoomChoice[i][0], randomizedRoomChoice[i][1],
			 			randomizedRoomChoice[i][2], randomizedRoomChoice[i][3],
			 			randomizedRoomChoice[i][4], roundStimTemplate)
	)
}

/* The current row in the matrix that is being played */
var currentRound = null;


/* Shows the choice between two rooms - 4 pie charts */
var showRound = {
	type: "html-keyboard-response",
	choices: [37, 39],
	stimulus: function() {
		return roundStims.shift();
	}
};


/* Shows the choice in a room - 2 pie charts */
var showRoom = {
	type: "html-keyboard-response",
	choices: [37, 39],
	stimulus: function() {

		let keypress = jsPsych.data.get().last(2).values()[0].key_press;
		currentRound = randomizedRoomChoice.shift();

		if (keypress === 37) { // Left, Get the first two images
			return trialSetImages(currentRound[0], currentRound[1], currentRound[17], currentRound[18], currentRound[19], trialStimTemplate);
		} else if (keypress === 39) { // Right, Get the last two images
			return trialSetImages(currentRound[2], currentRound[3], currentRound[20], currentRound[21], currentRound[22], trialStimTemplate);
		} else {
			return "<p>Error Occurred</p>"
		}
	}
};

/* Uses the currentRound to determine which reward should be displayed */
function determineReward() {
	let roundChoice = jsPsych.data.get().last(4).values()[0].key_press;
	let roomChoice = jsPsych.data.get().last(2).values()[0].key_press;
	let colors = ["Red2", "Green2", "Blue2"];
	let selection;
	let weights;

	if (roundChoice === 37 && roomChoice === 37) {
		selection = [currentRound[17], currentRound[18], currentRound[19]];
		weights = [currentRound[5], currentRound[6], currentRound[7]];
	} else if (roundChoice === 37 && roomChoice === 39) {
		selection = [currentRound[20], currentRound[21], currentRound[22]];
		weights = [currentRound[8], currentRound[9], currentRound[10]];
	} else if (roundChoice === 39 && roomChoice === 37) {
		selection = [currentRound[17], currentRound[18], currentRound[19]];
		weights = [currentRound[11], currentRound[12], currentRound[13]];
	} else if (roundChoice === 39 && roomChoice === 39) {
		selection = [currentRound[20], currentRound[21], currentRound[22]];
		weights = [currentRound[14], currentRound[15], currentRound[16]];
	}
	let resultColor = jsPsych.randomization.sampleWithReplacement(colors, 1, weights)[0];
	let resultValue = (resultColor === "Red2") ? (selection[0]) : ((resultColor === "Green2") ? (selection[1]) : (selection[2]));
	return {color: resultColor, value: resultValue};

}


/* Shows the reward you received from making a choice */
var showReward = {
	type: "html-keyboard-response",
	choices: jsPsych.NO_KEYS,
	trial_duration: 1500,
	stimulus: function() {
		let reward = determineReward();
		return rewardSetImages(reward.value, reward.color, rewardStimTemplate);
	}
};

for (let i=0; i<randomizedRoomChoice.length; i++) {
	experiment.push(showRound, fixation, showRoom, fixation, showReward, fixation);
}

/*******************
 * Run Task
 ******************/

jsPsych.init({
	//timeline: [instruction1, instruction2, instruction3, instructions4, showRound]
	timeline: experiment,
	on_finish: function() {
		alert("Experiment has finished.");
	}
});
