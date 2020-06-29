/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
//var subject_id = uniqueID(); //change later

// All HTML pages to be loaded
var pages = [
	"demographics.html",
	"olifequestionnaire.html"
];

// /* Subject ID generation */
// function uniqueID() {
// 	let id = Math.random().toString(36).substring(2) + Date.now().toString(36);
// 	return id;
// }

/********************
 * HTML manipulation
 * All HTML files in the templates directory are requested
 * from the server when the PsiTurk object is created above. We
 * need code to get those pages from the PsiTurk object and
 * insert them into the document.
 *
 ********************/

var check_demo = function() {
	var demoNames = ["Gender", "Ethnicity", "Race"];
	var demoResponses = [];
	for (var j = 0, k = demoNames.length; j < k; j++) {
		var checkit = 0;
		var demoVal = document.getElementsByName(demoNames[j]);
		for (var i = 0, l = demoVal.length; i < l; i++) {
			if (demoVal[i].checked) {
				demoResponses[j] = demoVal[i].value;
				checkit++;
			}
		}
		if (checkit === 0) {
			alert("If you wish to participate, you must answer the demographic questions.'");
			result=true
			return false;
		} else {
			result=false
		}
	}
	var ageN=document.getElementById("Age").value
	if (ageN.length < 2){
		alert("Please enter your age, or N/A")
		result2=true;
	}else{
		demoResponses.push(ageN);
		jsPsych.data.addProperties({demographics: demoResponses});
		result2=false;
	}
	if (result === true || result2 === true) {
		return false;
	} else {
		return true;
	}
}

var check_olife = function() {
	// 1:12 UA, 13:22, IA, 23:35 CD
	var olifeNames = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15",
		"16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33",
		"34","35","36","37","38","39","40","41","42","43"];
	var olifeResponses = [];
	for (var j = 0, k = olifeNames.length; j < k; j++) {
		var checkit = 0;
		var olifeVal = document.getElementsByName(olifeNames[j]);
		for (var i = 0, l = olifeVal.length; i < l; i++) {
			if (olifeVal[i].checked) {
				olifeResponses[j] = olifeVal[i].value; // yes=1 and no=2
				checkit++;
			}
		}
		if (checkit === 0) {
			alert("Please answer all of the questions on this page to complete the study.");
			result=true
			return false;
		} else {
			result=false
		}
	}
	if (result === true) {
		return false;
	} else {
		jsPsych.data.addProperties({olife: olifeResponses});
		return true;

	}
}
//hello

// specify the demographics file
var demographics = {
	type: 'external-html',
	url: "demographics.html",
	cont_btn: "submitDemo",
	check_fn: check_demo
}



// specify the olife questionnaire
var olifequestionnaire = {
	type:'external-html',
	url: "olifequestionnaire.html",
	execute_script: true,
	cont_btn: "submitOLIFE",
	check_fn: check_olife
};



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
//
// var roomInfo = [
// 	["4A1",	"4A2", "10A1", "10A2", "ss",   0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.6,  0.4,  0.07, 0.2,  0.73,  0, -1,  1,  2,  2,  1],
// 	["4B1",	"4B2", "10B1", "10B2", "ss",   0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.6,  0.4,  0,    0.2,  0.73, 0.07,  1,  2,  1,  1, -1,  1],
// 	["4A1",	"4A2", "15A1", "15A2", "ss",   0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.7,  0.3,  0.1,  0.2,  0.7,   0, -1,  1, -1, -2,  1],
// 	["4B1",	"4B2", "15B1", "15B2", "ss",   0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.7,  0.3,  0,    0.2,  0.7,  0.1,   1,  2,  1,  1,  2, -1],
// 	["4A1",	"4A2", "20A1", "20A2", "ss",   0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.78, 0.22, 0.15, 0.2,  0.65,  0, -1,  1, -1,  2, -1],
// 	["4B1",	"4B2", "20B1", "20B2", "ss",   0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.78, 0.22, 0,    0.2,  0.65, 0.15,  1,  2,  1,  0,  1, -1],
// 	["20A1", "20A2", "10A1", "10A2", "ss", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.6,  0.4,  0.07, 0.2,  0.73, -1,  2, -1,  2,  2,  1],
// 	["20B1", "20B2", "10B1", "10B2", "ss", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.6,  0.4,  0,    0.2,  0.73, 0.07,  0,  1, -1,  1, -1,  1],
// 	["20A1", "20A2", "15A1", "15A2", "ss", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.7,  0.3,  0.1,  0.2,  0.7,  -1,  2, -1, -1, -2,  1],
// 	["20B1", "20B2", "15B1", "15B2", "ss", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.7,  0.3,  0,    0.2,  0.7,  0.1,   0,  1, -1,  1,  2, -1],
// 	["4A1",	"4A2", "10A1", "10A2", "sa",   0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.6,  0.4,  0.07, 0.2,  0.73,  0, -1,  1,  2,  1,  2],
// 	["4B1",	"4B2", "10B1", "10B2", "sa",   0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.6,  0.4,  0,    0.2,  0.73, 0.07,  1,  2,  1, -1,  1,  1],
// 	["4A1",	"4A2", "15A1", "15A2", "sa",   0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.7,  0.3,  0.1,  0.2,  0.7,   0, -1,  1,  3, -1,  1],
// 	["4B1",	"4B2", "15B1", "15B2", "sa",   0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.7,  0.3,  0,    0.2,  0.7,  0.1,   1,  2,  1,  2,  1,  2],
// 	["4A1",	"4A2", "20A1", "20A2", "sa",   0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.78, 0.22, 0.15, 0.2,  0.65,  0, -1,  1, -1,  2,  1],
// 	["4B1",	"4B2", "20B1", "20B2", "sa",   0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.78, 0.22, 0,    0.2,  0.65, 0.15,  1,  2,  1,  1,  0,  0],
// 	["20A1", "20A2", "10A1", "10A2", "sa", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.6,  0.4,  0.07, 0.2,  0.73, -1,  2, -1,  2,  1,  2],
// 	["20B1", "20B2", "10B1", "10B2", "sa", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.6,  0.4,  0,    0.2,  0.73, 0.07,  0,  1, -1, -1,  1,  1],
// 	["20A1", "20A2", "15A1", "15A2", "sa", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.7,  0.3,  0.1,  0.2,  0.7,  -1,  2, -1,  3, -1,  1],
// 	["20B1", "20B2", "15B1", "15B2", "sa", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.7,  0.3,  0,    0.2,  0.7,  0.1,   0,  1, -1,  2,  1,  2],
// 	["4A1",	"4A2", "10A1", "10A2", "aa",   0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.6,  0.4,  0.07, 0.2,  0.73,  1, -1,  1,  2,  1,  2],
// 	["4B1",	"4B2", "10B1", "10B2", "aa",   0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.6,  0.4,  0,    0.2,  0.73, 0.07,  1,  2,  1, -1,  1,  1],
// 	["4A1",	"4A2", "15A1", "15A2", "aa",   0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.7,  0.3,  0.1,  0.2,  0.7,   1, -1,  1,  3, -1,  1],
// 	["4B1", "4B2", "15B1", "15B2", "aa",   0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.7,  0.3,  0,    0.2,  0.7,  0.1,   1,  2,  1,  2,  1,  2],
// 	["4A1",	"4A2", "20A1", "20A2", "aa",   0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.78, 0.22, 0.15, 0.2,  0.65,  1, -1,  1, -1,  2,  1],
// 	["4B1", "4B2", "20B1", "20B2", "aa",   0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.78, 0.22, 0,    0.2,  0.65, 0.15,  1,  2,  1,  1,  0,  0],
// 	["20A1", "20A2", "10A1", "10A2", "aa", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.6,  0.4,  0.07, 0.2,  0.73, -1,  2,  1,  2,  1,  2],
// 	["20B1", "20B2", "10B1", "10B2", "aa", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.6,  0.4,  0,    0.2,  0.73, 0.07,  1,  0,  0, -1,  1,  1],
// 	["20A1", "20A2", "15A1", "15A2", "aa", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.7,  0.3,  0.1,  0.2,  0.7,  -1,  2,  1,  3, -1,  1],
// 	["20B1", "20B2", "15B1", "15B2", "aa", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.7,  0.3,  0,    0.2,  0.7,  0.1,   1,  0,  0,  2,  1,  2],
// 	["4A1", "4A2", "10A1", "10A2", "as",   0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.6,  0.4,  0.07, 0.2,  0.73,  1, -1,  1,  2,  2,  1],
// 	["4B1", "4B2", "10B1", "10B2", "as",   0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.6,  0.4,  0,    0.2,  0.73, 0.07,  1,  2,  1,  1, -1,  1],
// 	["4A1", "4A2", "15A1", "15A2", "as",   0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.7,  0.3,  0.1,  0.2,  0.7,   1, -1,  1, -1, -2,  1],
// 	["4B1",	"4B2", "15B1", "15B2", "as",   0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.7,  0.3,  0,    0.2,  0.7,  0.1,   1,  2,  1,  1,  2, -1],
// 	["4A1",	"4A2", "20A1", "20A2", "as",   0,    0.3,  0.7,  0.1,  0.2,  0.7,  0,    0.78, 0.22, 0.15, 0.2,  0.65,  1, -1,  1, -1,  2, -1],
// 	["4B1",	"4B2", "20B1", "20B2", "as",   0.3,  0.7,  0,    0.2,  0.7,  0.1,  0.78, 0.22, 0,    0.2,  0.65, 0.15,  1,  2,  1,  0,  1, -1],
// 	["20A1", "20A2", "10A1", "10A2", "as", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.6,  0.4,  0.07, 0.2,  0.73, -1,  2,  1,  2,  2,  1],
// 	["20B1", "20B2", "10B1", "10B2", "as", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.6,  0.4,  0,    0.2,  0.73, 0.07,  1,  0,  0,  1, -1,  1],
// 	["20A1", "20A2", "15A1", "15A2", "as", 0,    0.78, 0.22, 0.15, 0.2,  0.65, 0,    0.7,  0.3,  0.1,  0.2,  0.7,  -1,  2,  1, -1, -2,  1],
// 	["20B1", "20B2", "15B1", "15B2", "as", 0.78, 0.22, 0,    0.2,  0.65, 0.15, 0.7,  0.3,  0,    0.2,  0.7,  0.1,   1,  0,  0,  1,  2, -1]
// ];
//
//
// /* Stimulus HTML template for the room choice round */
// var roundStimTemplate = "<div id='selected'>" +
// 						"<img src='static/images/roomSquare.png' alt='Room Selection square'  id='room_selection_square' onload='selectSquare()'> " +
// 						"<div id='pie_charts' >" +
// 						"<img src='static/images/img_1' alt='Left Left Pie Chart' class='left_left_chart'>" +
// 						"<img src='static/images/img_2' alt='Left Right Pie Chart' class='left_right_chart'>" +
// 						"<img src='static/images/img_3' alt='Right Left Pie Chart' class='right_left_chart'>" +
// 						"<img src='static/images/img_4' alt='Right Right Pie Chart' class='right_right_chart'>" +
// 						"</div>" +
// 						"<div id='configuration'>" +
// 						"<p class='left_config'> l_config </p>" +
// 						"<p class='right_config'> r_config </p>" +
// 						"</div>" +
// 						"<div id='prompt'>" +
// 						"<p id='left_selection_prompt' style='left: 18%'> Press LEFT arrow to select. </p>" +
// 						"<p id='right_selection_prompt' style='left: 61%'> Press Right arrow to select. </p>" +
// 						"</div>";
//
//
//
// /* Stimulus HTML template for the room trial after choice */
// var trialStimTemplate = "<div id='selected'>" +
// 						"<img src='static/images/pieSquare.png' alt='Pie Selection square'  id='pie_selection_square' onload='selectSquare()'> " +
// 						"<img src='static/images/autoSquare.png' alt='Auto Selection square'  id='auto_selection_square'> " +
// 						"</div>" +
// 						"<div id ='reward'>" +
// 						"<p class='blue_reward'> $blue_amt </p>" +
// 						"<p class='green_reward'> $green_amt </p>" +
// 						"<p class='red_reward'> $red_amt </p>" +
// 						"</div>" +
// 						"<div id='pie_charts'>"+
// 						"<img src='static/images/img_1' alt='Left Pie Chart' class='left_chart' >" +
// 						"<img src='static/images/img_2' alt='Right Pie Chart' class='right_chart'>" +
// 						"</div>"+
// 						"<div id='prompt'>" +
// 						"<p id='left_selection_prompt' style='left: 17%'> Press LEFT arrow to select. </p>" +
// 						"<p id='right_selection_prompt' style='left: 61%'> Press Right arrow to select. </p>" +
// 						"</div>";
//
// /* Stimulus HTML template for the reward display */
// var rewardStimTemplate = "<div id = value>" +
// 						 "<p class='reward_amt' style='color:text_color'>$reward_value</p>" +
// 						 "</div>";
// /*
// "<div id ='reward_img'>" +
// "<img src='static/images/color_selected' alt='Selected Color' class='center_chart'>" +
// "</div>";
// */
//
// var fixation = {
// 	type: 'html-keyboard-response',
// 	stimulus: '<div style="font-size:60px;">+</div>',
// 	choices: jsPsych.NO_KEYS,
// 	trial_duration: 1000,
// };
//
//
// var nxtround = {
// 	type: 'html-keyboard-response',
// 	stimulus: '<div style="font-size:35px;">Wait for the next round</div>',
// 	choices: jsPsych.NO_KEYS,
// 	trial_duration: 1000,
// };
//
// /*
// function spin(element, speed=20) {
// 	var looper;
// 	var degrees = 0;
// 	var elem = document.getElementById(element);
// 	elem.style.transform = "rotate(" + degrees + "deg)";
// 	looper = setTimeout('spin(\''+element+'\','+speed+')', speed);
// 	degrees++;
// 	if (degrees > 359) {
// 		degrees = 1;
// 	}
// 	document.getElementById("status").innerHTML = "rotate(" + degrees + "deg)";
// }
// */
//
// /* Returns the stimulus HTML string for the room choice page with the images replaced */
// function roundSetImages(img1, img2, img3, img4, config, stimTemplate) {
// 	var imgMap = {
// 		img_1: img1 + ".png",
// 		img_2: img2 + ".png",
// 		img_3: img3 + ".png",
// 		img_4: img4 + ".png",
// 		l_config: (config[0] === 's') ? "Self-play" : "Auto-play",
// 		r_config: (config[1] === 's') ? "Self-play" : "Auto-play",
// 	};
// 	return stimTemplate.replace(/img_1|img_2|img_3|img_4|l_config|r_config/gi, function(matched) {
// 		return imgMap[matched];
// 	});
// }
//
//
// /* Returns the stimulus HTML string for the room trial page with the images and rewards replaced */
// function trialSetImages(img1, img2, redReward, greenReward, blueReward, stimTemplate) {
// 	var imgMap = {
// 		img_1: img1 + ".png",
// 		img_2: img2 + ".png",
// 		red_amt: redReward,
// 		green_amt: greenReward,
// 		blue_amt: blueReward,
//
// 	};
// 	return stimTemplate.replace(/img_1|img_2|blue_amt|green_amt|red_amt/gi, function(matched) {
// 		return imgMap[matched];
// 	});
// }
//
//
// /* Returns the stimulus HTML string for the result page with the images and rewards replaced */
// function rewardSetImages(amount, color, stimTemplate) {
// 	var imgMap = {
// 		reward_value: amount,
// 		color_selected: color + ".png",
// 		text_color: color.substring(0, color.length - 1)
// 	};
// 	return stimTemplate.replace(/reward_value|color_selected|text_color/gi, function(matched) {
// 		return imgMap[matched];
// 	});
// }
//
// function selectSquare(){
// 	if (select === 1){
// 		if (chosPie === 37) {
// 			document.getElementById('pie_selection_square').style.left = "190px";
// 			document.getElementById('pie_selection_square').style.display = "inline";
// 		} else if (chosPie === 39) {
// 			document.getElementById('pie_selection_square').style.left = "650px";
// 			document.getElementById('pie_selection_square').style.display = "inline";
// 		}
// 	} else if (select === 2) {
// 		if (chosRoom === 37) {
// 			document.getElementById('room_selection_square').style.left = "125px";
// 			document.getElementById('room_selection_square').style.display = "inline";
// 		} else if (chosRoom === 39) {
// 			document.getElementById('room_selection_square').style.left = "575px";
// 			document.getElementById('room_selection_square').style.display = "inline";
// 		}
// 	} else if (select === 0) {
// 		if (autoSelect === 37) {
// 			document.getElementById('auto_selection_square').style.left = "190px";
// 			document.getElementById('auto_selection_square').style.display = "inline";
// 			document.getElementById('left_selection_prompt').style.display = "inline";
// 		} else if (autoSelect === 39) {
// 			document.getElementById('auto_selection_square').style.left = "650px";
// 			document.getElementById('auto_selection_square').style.display = "inline";
// 			document.getElementById('right_selection_prompt').style.display = "inline";
// 		}
// 	} else if (select === 3) {
// 		document.getElementById('right_selection_prompt').style.display = "inline";
// 		document.getElementById('left_selection_prompt').style.display = "inline";
// 	}
// }
//
// /* Uses the currentRound to determine which reward should be displayed */
// function determineReward() {
// 	let colors = ["Red2", "Green2", "Blue2"];
// 	let selection;
// 	let weights;
// 	if (chosRoom === 37) {
// 		selection = [currentRound[17], currentRound[18], currentRound[19]];
// 		if (chosPie === 37) {
// 			weights = [currentRound[5], currentRound[6], currentRound[7]];
// 		} else if (chosPie === 39){
// 			weights = [currentRound[8], currentRound[9], currentRound[10]];
// 		}
// 	} else if (chosRoom === 39) {
// 		selection = [currentRound[20], currentRound[21], currentRound[22]];
// 		if (chosPie === 37) {
// 			weights = [currentRound[11], currentRound[12], currentRound[13]];
// 		} else if (chosPie === 39) {
// 			weights = [currentRound[14], currentRound[15], currentRound[16]];
// 		}
// 	}
// 	let resultColor = jsPsych.randomization.sampleWithReplacement(colors, 1, weights)[0];
// 	let resultValue = (resultColor === "Red2") ? (selection[0]) : ((resultColor === "Green2") ? (selection[1]) : (selection[2]));
// 	console.log("Selected from: ", selection, " ", "with weights: ", weights);
// 	console.log("Color: ", resultColor, " ", "Value: ", resultValue);
// 	return {color: resultColor, value: resultValue};
// }
//
// var randomizedRoomChoice = jsPsych.randomization.shuffle(roomInfo); //Randomized order of the room choice rounds
// var roundStims = []; //HTML templates corresponding to the randomized order of the room choice rounds
//
// for (var i=0; i < randomizedRoomChoice.length; i++) {
// 	roundStims.push(
// 		roundSetImages(randomizedRoomChoice[i][0], randomizedRoomChoice[i][1],
// 			randomizedRoomChoice[i][2], randomizedRoomChoice[i][3],
// 			randomizedRoomChoice[i][4], roundStimTemplate)
// 	)
// }
//
// /* Global variables */
// var currentRound = null;
// var chosRoom = null;
// var chosPie = null;
// var next = null;
// var room = null;
// var select = null;
// var autoList = null;
// var autoSelect = null;
// var reward = null;
//
//
// /* Shows the choice between two rooms - 4 pie charts */
// var showRound = {
// 	type: "html-keyboard-response",
// 	choices: [37, 39],
// 	stimulus: function() {
// 		select = 3;
// 		next = roundStims.shift();
// 		return next;
// 	},
// 	on_finish: function(data) {
// 		chosRoom = data.key_press;
// 		select = 2;
// 		autoList = Math.random() < 0.5 ? [39,37,39,37] : [37, 39, 37, 39];
// 		currentRound = randomizedRoomChoice.shift();
// 		if (data.key_press === 37) {
// 			data.chosRoom=[currentRound[0],currentRound[1]];
// 			data.rewVals=[currentRound[17], currentRound[18], currentRound[19]];
// 			data.Play=[currentRound[4][0]];
// 		} else if (data.key_press === 39) {
// 			data.chosRoom = [currentRound[2], currentRound[3]];
// 			data.rewVals = [currentRound[20], currentRound[21], currentRound[22]];
// 			data.Play=[currentRound[4][1]];
// 		}
// 		console.log("Current Round Information: ", currentRound);
// 	}
// };
//
//
//
// /* Shows the choice in a room - 2 pie charts */
// var showRoom = {
// 	type: "html-keyboard-response",
// 	choices: [37,39],
// 	data: {rewVal: null, rewCol: null},
// 	stimulus: function() {
// 		select = 3;
// 		if (chosRoom === 37) { // Left, Get the first two images
// 			if (currentRound[4][0] === 'a') {
// 				select = 0;
// 				autoSelect = autoList.shift();
// 			}
// 			room = trialSetImages(currentRound[0], currentRound[1], currentRound[17], currentRound[18], currentRound[19], trialStimTemplate);
// 			console.log("Showing Room Stim: ", room);
// 			return room;
// 		} else if (chosRoom === 39) { // Right, Get the last two images
// 			if (currentRound[4][1] === 'a') {
// 				select = 0;
// 				autoSelect = autoList.shift();
// 			}
// 			room = trialSetImages(currentRound[2], currentRound[3], currentRound[20], currentRound[21], currentRound[22], trialStimTemplate);
// 			console.log("Showing Room Stim: ", room);
// 			return room
// 		} else {
// 			return "<p>Error Occurred</p>"
// 		}
// 	},
// 	on_finish: function(data) {
// 		reward = determineReward();
// 		data.rewVal = reward.value;
// 		data.rewCol = reward.color;
// 		if (select === 0 && data.key_press !== autoSelect) {
// 			alert('Please select the indicated option during auto-play.');
// 			chosPie = autoSelect;
// 			select = 1;
// 		} else {
// 			chosPie = data.key_press;
// 			select = 1;
// 		}
// 		if (data.key_press === 37 && chosRoom === 37) {
// 			data.chosPie = [currentRound[0]];
// 		} else if (data.key_press === 39 && chosRoom === 37) {
// 			data.chosPie = [currentRound[1]];
// 		} else if (data.key_press === 37 && chosRoom === 39) {
// 			data.chosPie = [currentRound[2]];
// 		} else if (data.key_press === 39 && chosRoom === 39) {
// 			data.chosPie = [currentRound[3]];
// 		}
// 	}
// };
//
//
// var showSelect = {
// 	type: "html-keyboard-response",
// 	trial_duration: 700,
// 	choices: jsPsych.NO_KEYS,
// 	stimulus: function() {
// 		if (select === 1) {
// 			if (chosPie === 37 || chosPie === 39) {
// 				console.log("Showing Room Select: ", room);
// 				return room
// 			}
// 		} else if (select === 2) {
// 			if (chosRoom === 37 || chosRoom === 39) {
// 				return next;
// 			}
// 		} else {
// 			return "<p>Error Occurred</p>"
// 		}
// 	}
// };
//
//
// /* Shows the reward you received from making a choice */
// var showReward = {
// 	type: "html-keyboard-response",
// 	choices: jsPsych.NO_KEYS,
// 	trial_duration: 2000,
// 	stimulus: function() {
// 		console.log("CURRENT ROUND", currentRound);
// 		return rewardSetImages(reward.value, reward.color, rewardStimTemplate);
// 	}
// };


experiment.push(olifequestionnaire, demographics, instruction1, instruction2, instruction3, instructions4);


// let n=4;
// //for (let i=0; i<randomizedRoomChoice.length; i++) {
// for (let i=0; i<1; i++) {
// 	experiment.push(showRound, showSelect);
// 	for (let j=0; j<n; j++) {
// 		experiment.push(fixation, showRoom, showSelect, showReward);
// 	}
// 	experiment.push(nxtround);
// }


/*******************
 * Run Task
 ******************/

jsPsych.init({
	timeline: experiment,
	on_finish: function() {
		alert("Experiment has finished.");
		//let saveData;
		//saveData = jsPsych.data.get().ignore(['stimulus', 'trial_type', 'trial_index', 'time_elapsed', 'internal_node_id']).filterCustom(function(trial) {return trial.key_press != null});
		//saveData.localSave('csv','testdata.csv');

		// Define data file name and get its contents from jsPsych
		//var timestamp = (new Date).toISOString().replace(/z|t/gi,' ').trim();
		var data_file_name = 'cvp_S_' + subject_id + '.csv';
		var data_file_content = jsPsych.data.get().ignore(['stimulus', 'trial_type', 'trial_index', 'time_elapsed', 'internal_node_id']).filterCustom(function(trial) {return trial.key_press != null});

		// Post data file to /save_data_file custom Python routine
		$.ajax({
			type: 'POST',
			url: "/save_data_file",
			dataType: 'json',
			data: {
				file_name: data_file_name,
				file_data: data_file_content.csv(),
			},
		});
	}
});

