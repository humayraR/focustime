
const bullet = "\u2022";
const bulletWithSpace = `${bullet} `;
const enter = 13;


const handleInput = (event) => {
    const { keyCode, target } = event;
    const { selectionStart, value } = target;

    if (keyCode === enter) {
        target.value = [...value]
        .map((c, i) => i === selectionStart - 1
            ? `\n${bulletWithSpace}`
            : c
        )
        .join('');
        
        target.selectionStart = selectionStart+bulletWithSpace.length;
        target.selectionEnd = selectionStart+bulletWithSpace.length;
    }
    
    if (value[0] !== bullet) {
        target.value = `${bulletWithSpace}${value}`;
    }

	let currTask = document.getElementById("task-selector").value;

	if (currTask.localeCompare("choose-a-task")) {
		localStorage.setItem(`${currTask}`, target.value);
	}
}

var newOptions = JSON.parse(localStorage.getItem("newOptions") || "[]");
var taskDetailsCount = 13;
var projectCount = 6;

const PT_dbox_elem = document.getElementById("dialogBox-2");
const PT_dbox_msg = document.getElementById("dbox-msg-2");
const PT_new_item = document.getElementById("dbox-input-2");
const PT_dbox_btn_done = document.getElementById("confirm-btn-2");
const PT_dbox_btn_cancel = document.getElementById("cancel-btn-2");
const PT_dbox_btn_skip = document.getElementById("skip-btn-2");
const task_selectBox = document.getElementById("task-selector");
const project_selectBox = document.getElementById("project-selector");
var newItem_type = "";
var newItem_selectBox;

PT_dbox_btn_cancel.addEventListener('click', () => {
	if (newItem_type == "task") {
		newItem_selectBox.value = newItem_selectBox.options[0].value;
	}

	else {
		newItem_selectBox.value = newItem_selectBox.options[1].value;
	}
	
	PT_dbox_elem.style.display = "none";
	newItem_type = "";
	newItem_selectBox = null;

	document.getElementById('container-body').style.pointerEvents = 'auto'; 
});

PT_dbox_btn_skip.addEventListener('click', () => {
	if (newItem_type == "task") {
		newItem_selectBox.value = newItem_selectBox.options[0].value;
	}

	else {
		newItem_selectBox.value = newItem_selectBox.options[1].value;
	}

	PT_dbox_elem.style.display = "none";
	newItem_type = "";
	newItem_selectBox = null;

	document.getElementById('container-body').style.pointerEvents = 'auto'; 
});

task_selectBox.addEventListener('change', () => {
	if (task_selectBox.value == "create-task") {
		newItem_type = "task";
		newItem_selectBox = task_selectBox;
		PT_dbox_msg.textContent = "What is the new task? (1-30 characters)";

		PT_dbox_elem.style.display = "block";
		document.getElementById('container-body').style.pointerEvents = 'none';  
	}

	else {
		updateNotes(task_selectBox.value);
	}
});

project_selectBox.addEventListener('change', () => {
	if (project_selectBox.value == "create-project") {
		newItem_type = "project";
		newItem_selectBox = project_selectBox;
		PT_dbox_msg.textContent = "What is the new project? (1-30 characters)";

		PT_dbox_elem.style.display = "block";
		document.getElementById('container-body').style.pointerEvents = 'none';  
	}
});

PT_dbox_btn_done.addEventListener('click', () => {
    if(!checkNameLength(PT_new_item.value)){
        alert("New task/project name should be 1-30 characters in length. Please try again.");
    }

    else {   
        PT_dbox_elem.style.display = "none";
		createNewOption(newItem_selectBox, newItem_type);
		document.getElementById('container-body').style.pointerEvents = 'auto';   
    }
});

function createNewOption(selectBox, type) {
	var newOption;
	var newOptionValue = PT_new_item.value;

	if (type == "task") {
		taskDetailsCount++;
		newOption = new Option(newOptionValue, "task-"+taskDetailsCount);
		let project = project_selectBox.value;

		//newOptions.push({project : `${project}`, task : `${newOptionValue}`, update : 'task'});
		newOptions.push({project : `${project.text}`, projectID : `${project}`, task : `${newOptionValue}`, update : 'task'});
	}

	else {
		projectCount++;
		newOption = new Option(newOptionValue, "project-"+projectCount);
		let task = task_selectBox.value;

		//newOptions.push({project : `${"project-"+projectCount}`, task : `${task}`, update : 'project'});
		newOptions.push({project : `${newOptionValue}`, projectID : `${"project-"+projectCount}`, task : `${task}`, update : 'project'});
	}

	selectBox.add(newOption, selectBox.options.length);
	selectBox.value = newOption.value;

	localStorage.setItem("newOptions", JSON.stringify(newOptions));

	//notify users
	toast_elem.className = "show";
	toast_elem.textContent = "New "+ type + " '" + newOptionValue + "' created.";

	setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 3000);
}

function updateSelector(newOptionsList) {
	if(newOptionsList != null) {
		for (i = 0; i < newOptionsList.length; i++) {
			if (newOptionsList[i].update == "task") {
				taskDetailsCount++;
				let taskBox = document.getElementById("task-selector");
		
				let newOption = new Option(newOptionsList[i].task, "task-"+taskDetailsCount);
				taskBox.add(newOption, taskBox.options.length);
			}
		
			else {
				projectCount++;
				let projectBox = document.getElementById("project-selector");
		
				let newOption = new Option(newOptionsList[i].project, "project-"+projectCount);
				projectBox.add(newOption, projectBox.options.length);
			}
		}
	}
}

updateSelector(JSON.parse(localStorage.getItem('newOptions') || "[]"));

function updateNotes(taskID) {
	var taskNotes = localStorage.getItem(taskID);
	var notesArea = document.querySelector(".notes");
	if (taskNotes != null) {
		notesArea.innerHTML = taskNotes;
	}

	else {
		notesArea.innerHTML = bulletWithSpace;
	}
}

function checkNameLength(name) {
    let result = false;
    if (name.length > 0 && name.length <= 30) {
        result = true;
    }

    return result;
}

// http://www.developphp.com/video/JavaScript/Audio-Playlist-Play-Buttons-JavaScript-Programming-Tutorial 
function audioApp(album_title){
	var audio = new Audio();
	var audio_folder = "audio/";
	var audio_ext = ".mp3";
	var audio_index = 1;
	var is_playing = false;
	var playingtrack, tracks; 
	var trackbox = document.getElementById("trackbox");
	if (album_title == "Blonde") {
		tracks = {
			0:["Nikes", "nikes"],
			1:["Ivy", "ivy"],
			2:["Pink + White", "pink+white"],
			3:["Be Yourself", "be_yourself"],
			4:["Solo", "solo"],
			5:["Skyline To", "skyline_to"],
			6:["Self Control", "self_control"],
			7:["Good Guy", "good_guy"],
			8:["Nights", "nights"],
			9:["Solo (Reprise)", "solo_reprise"],
			10:["Pretty Sweet", "pretty_sweet"],
			11:["Facebook Story", "facebook_story"],
			12:["Close To You", "close_to_you"],
			13:["White Ferrari", "white_ferrari"],
			14:["Seigfried", "seigfried"],
			15:["Godspeed", "godspeed"],
			16:["Future Free", "futura_free"]
		};
	}
	else if (album_title == "Flower Boy") {
		tracks = {
			0:["Foreword", "nikes"],
			1:["Where This Flower Blooms", "ivy"],
			2:["Sometimes...", "pink+white"],
			3:["See You Again", "be_yourself"],
			4:["Who Dat Boy", "solo"],
			5:["Pothole", "skyline_to"],
			6:["Garden Shed", "self_control"],
			7:["Boredom", "good_guy"],
			8:["I Ain't Got Time!", "nights"],
			9:["911 / Mr. Lonely", "solo_reprise"],
			10:["Droppin' Seeds", "pretty_sweet"],
			11:["November", "facebook_story"],
			12:["Glitter", "close_to_you"],
			13:["Enjoy Right Now, Today", "white_ferrari"]
		};
	}
	else if (album_title == "Ctrl") {
		tracks = {
			0:["Supermodel", "nikes"],
			1:["Love Galore", "ivy"],
			2:["Droves In The Wind", "pink+white"],
			3:["Drew Barrymore", "be_yourself"],
			4:["Prom", "solo"],
			5:["The Weekend", "skyline_to"],
			6:["Go Gina", "self_control"],
			7:["Garden (Say It Like Dat)", "good_guy"],
			8:["Broken Clocks", "nights"],
			9:["Anything", "solo_reprise"],
			10:["Wavy (Interlude)", "pretty_sweet"],
			11:["Normal Girl", "facebook_story"],
			12:["Pretty Little Birds", "close_to_you"],
			13:["20 Something", "white_ferrari"]
		};
	}
	else if (album_title == "Kids See Ghosts") {
		tracks = {
			0:["Feel The Love", "nikes"],
			1:["Fire", "ivy"],
			2:["4th Dimension", "pink+white"],
			3:["Freeee (Ghost Town Pt. 2)", "be_yourself"],
			4:["Reborn", "solo"],
			5:["Kids See Ghosts", "skyline_to"],
			6:["Cudi Montage", "self_control"]
		};
	}
	else if (album_title == "Coloring Book") {
		tracks = {
			0:["All We Got", "nikes"],
			1:["No Problem", "ivy"],
			2:["Summer Friends", "pink+white"],
			3:["D.R.A.M. Sings Special", "be_yourself"],
			4:["Blessings", "solo"],
			5:["Same Drugs", "skyline_to"],
			6:["Mixtape", "self_control"],
			7:["Angels", "good_guy"],
			8:["Juke Jam", "nights"],
			9:["All Night", "solo_reprise"],
			10:["How Great", "pretty_sweet"],
			11:["Smoke Break", "facebook_story"],
			12:["Finish Line / Drown", "close_to_you"],
			13:["Blessings", "white_ferrari"]
		};
	}
	else if (album_title == "Freudian") {
		tracks = {
			0:["Get You", "nikes"],
			1:["Best Part", "ivy"],
			2:["Hold Me Down", "pink+white"],
			3:["Neu Roses (Transgressor's Song)", "be_yourself"],
			4:["Loose", "solo"],
			5:["We Find Love", "skyline_to"],
			6:["Blessed", "self_control"],
			7:["Take Me Away", "good_guy"],
			8:["Transform", "nights"],
			9:["Freudian", "solo_reprise"]
		};
	}
	else if (album_title == "American Teen") {
		tracks = {
			0:["American Teen", "nikes"],
			1:["Young Dumb & Broke", "ivy"],
			2:["Location", "pink+white"],
			3:["Another Sad Love Song", "be_yourself"],
			4:["Saved", "solo"],
			5:["Coaster", "skyline_to"],
			6:["8TEEN", "self_control"],
			7:["Let's Go", "good_guy"],
			8:["Hopeless", "nights"],
			9:["Cold Blooded", "solo_reprise"],
			10:["Winter", "pretty_sweet"],
			11:["Therapy", "facebook_story"],
			12:["Keep Me", "close_to_you"],
			13:["Shot Down", "white_ferrari"],
			14:["Angels", "nikes"]
		};
	}
	else if (album_title == "Happier Than Ever") {
		tracks = {
			0:["Getting Older", "nikes"],
			1:["I Didn't Change My Number", "ivy"],
			2:["Billie Bossa Nova", "pink+white"],
			3:["my future", "be_yourself"],
			4:["Oxytooin", "solo"],
			5:["GOLDWING", "skyline_to"],
			6:["Lost Cause", "self_control"],
			7:["Halley's Comet", "good_guy"],
			8:["Not My Responsibility", "nights"],
			9:["OverHeated", "solo_reprise"],
			10:["Everybody Dies", "pretty_sweet"],
			11:["Your Power", "facebook_story"],
			12:["NDA", "close_to_you"],
			13:["Therefore I Am", "white_ferrari"],
			14:["Happier Than Ever", "nikes"],
			15:["Male Fantasy", "ivy"]
		};
	}
	else if (album_title == "An Evening With Silk Sonic") {
		tracks = {
			0:["Silk Sonic Intro", "nikes"],
			1:["Leave The Door Open", "ivy"],
			2:["Fly As Me", "pink+white"],
			3:["After Last Night", "be_yourself"],
			4:["Smokin Out The Window", "solo"],
			5:["Put On A Smile", "skyline_to"],
			6:["777", "self_control"],
			7:["Skate", "good_guy"],
			8:["Blast Off", "nights"]
		};
	}
	else if (album_title == "Punk") {
		tracks = {
			0:["Die Slow", "nikes"],
			1:["Stressed", "ivy"],
			2:["Stupid/Asking", "pink+white"],
			3:["Recognize Real", "be_yourself"],
			4:["Contagious", "solo"],
			5:["Peepin Out The Window", "skyline_to"],
			6:["Rich Nigga Shit", "self_control"],
			7:["Livin It Up", "good_guy"],
			8:["Yea Yea Yea", "nights"],
			9:["Insure My Wrist", "solo_reprise"],
			10:["Scoliosis", "pretty_sweet"],
			11:["Bubbly", "facebook_story"],
			12:["Road Rage", "close_to_you"],
			13:["Faces", "white_ferrari"],
			14:["Droppin Jewels", "nikes"],
			15:["Fifth Day Dead", "ivy"],
			16:["Icy Hot", "close_to_you"],
			17:["Love You More", "white_ferrari"],
			18:["Hate The Game", "nikes"],
			19:["Day Before", "ivy"]
		};
	}
	else if (album_title == "Faces") {
		tracks = {
			0:["Inside Outside", "nikes"],
			1:["Here We Go", "ivy"],
			2:["Friends", "pink+white"],
			3:["Angle Dust", "be_yourself"],
			4:["Malibu", "solo"],
			5:["What Do You Do", "skyline_to"],
			6:["It Just Doesn't Matter", "self_control"],
			7:["Therapy", "good_guy"],
			8:["Polo Jeans", "nights"],
			9:["Happy Birthday", "solo_reprise"],
			10:["Wedding", "pretty_sweet"],
			11:["Funeral", "facebook_story"],
			12:["Diablo", "close_to_you"],
			13:["Ave Maria", "white_ferrari"],
			14:["55", "nikes"],
			15:["San Francisco", "ivy"],
			16:["Colors and Shapes", "close_to_you"],
			17:["Insomniak", "white_ferrari"],
			18:["Uber", "nikes"],
			19:["Rain", "ivy"],
			20:["Apparition", "nikes"],
			21:["Thumbalina", "ivy"],
			22:["New Faces v2", "pink+white"],
			23:["Grand Finale", "be_yourself"],
			24:["Yeah - Bonus", "solo"]
		};
	}
	else if (album_title == "The Melodic Blue") {
		tracks = {
			0:["trademark usa", "nikes"],
			1:["pink panties", "ivy"],
			2:["scapegoats", "pink+white"],
			3:["range brothers", "be_yourself"],
			4:["issues", "solo"],
			5:["gorgeous", "skyline_to"],
			6:["south africa", "self_control"],
			7:["lost souls", "good_guy"],
			8:["cocoa", "nights"],
			9:["family ties", "solo_reprise"],
			10:["scars", "pretty_sweet"],
			11:["during activity", "facebook_story"],
			12:["booman", "close_to_you"],
			13:["first order of business", "white_ferrari"],
			14:["vent", "nikes"],
			15:["San Francisco", "ivy"],
			16:["Colors and Shapes", "close_to_you"],
			17:["Insomniak", "white_ferrari"],
			18:["Uber", "nikes"],
			19:["Rain", "ivy"],
			20:["Apparition", "nikes"],
			21:["Thumbalina", "ivy"],
			22:["New Faces v2", "pink+white"],
			23:["Grand Finale", "be_yourself"],
			24:["Yeah - Bonus", "solo"]
		};
	}
	// Change strings to match the music page (4 albums)
	else if (album_title == "Certified Lover Boy") {
		tracks = {
			0:["Champagne Poetry", "nikes"],
			1:["Papi's Home", "ivy"],
			2:["Girls Want Girls (Ft. Lil Baby)", "pink+white"],
			3:["In The Bible (Ft. Giveon & Lil Dunk)", "be_yourself"],
			4:["Love All (Ft. JAY-Z)", "solo"],
			5:["Fair Trade (Ft. Travis Scott)", "skyline_to"],
			6:["Way 2 Sexy (Ft. Future & Young Thug)", "self_control"],
			7:["TSU", "good_guy"],
			8:["N 2 Deep (Ft. Future)", "nights"],
			9:["Pipe Down", "solo_reprise"],
			10:["Yebba's Heartbreak (Ft. YEBBA)", "pretty_sweet"],
			11:["No Friends In The Industry", "facebook_story"],
			12:["Knife Talk (Ft. 21 Savage & Project Pat)", "close_to_you"],
			13:["7am on Bridle Path", "white_ferrari"],
			14:["Race My Mind", "nikes"],
			15:["Fountains (Ft. Tems)", "ivy"],
			16:["Get Along Better (Ft. Ty Dolla $ign)", "close_to_you"],
			17:["You Only Live Twice (Ft. Lil Wayne & Rick Ross)", "white_ferrari"],
			18:["IMY2 (Ft. Kid Cudi)", "nikes"],
			19:["Fucking Fans", "ivy"],
			20:["The Remorse", "nikes"]
		};
	}
	else if (album_title == "evermore") {
		tracks = {
			0:["willow", "nikes"],
			1:["champagne problems", "ivy"],
			2:["gold rush", "pink+white"],
			3:["'tis the damn season", "be_yourself"],
			4:["evermore (Ft. Bon Iver)", "solo"],
			5:["happiness", "skyline_to"],
			6:["dorothea", "self_control"],
			7:["cowboy like me", "good_guy"],
			8:["tolerate it", "nights"],
			9:["coney island (Ft. The National)", "solo_reprise"],
			10:["no body, no crime (Ft. HAIM)", "pretty_sweet"],
			11:["marjorie", "facebook_story"],
			12:["closure", "close_to_you"],
			13:["long story short", "white_ferrari"],
			14:["ivy", "ivy"]
		};
	}
	else if (album_title == "SOUR") {
		tracks = {
			0:["brutal", "nikes"],
			1:["traitor", "ivy"],
			2:["drivers license", "pink+white"],
			3:["1 step forward, 3 steps back", "be_yourself"],
			4:["deja vu", "solo"],
			5:["good 4 u", "skyline_to"],
			6:["enough for you", "self_control"],
			7:["happier", "good_guy"],
			8:["jealousy, jealousy", "nights"],
			9:["favorite crime", "solo_reprise"],
			10:["hope ur ok", "pretty_sweet"]
		};
	}
	else if (album_title == "After Hours") {
		tracks = {
			0:["Alone Again", "nikes"],
			1:["Too Late", "ivy"],
			2:["Hardest to Love", "pink+white"],
			3:["Scared To Live", "be_yourself"],
			4:["Snowchild", "solo"],
			5:["Escape From LA", "skyline_to"],
			6:["Heartless", "self_control"],
			7:["Faith", "good_guy"],
			8:["Blinding Lights", "nights"],
			9:["In Your Eyes", "solo_reprise"],
			10:["Save Your Tears", "pretty_sweet"],
			11:["Repeat After Me", "facebook_story"],
			12:["After Hours", "close_to_you"],
			13:["Until I Bleed Out", "white_ferrari"]
		};
	}
	else {
		tracks = {
			0:["Dorothea", "nikes"],
			1:["Happiness", "ivy"],
			2:["Cowboy like Me", "pink+white"],
			3:["'Tis the Damn Season", "be_yourself"],
			4:["Evermore (featuring Bon Iver)", "solo"],
			5:["It's Time to Go", "skyline_to"],
			6:["Marjorie", "self_control"],
			7:["Willow", "good_guy"],
			8:["Tolerate It", "nights"],
			9:["Coney Island", "solo_reprise"],
			10:["No Body, No Crime", "pretty_sweet"],
			11:["Right Where You Left Me", "facebook_story"],
			12:["Champagne Problems", "close_to_you"],
			13:["Long Story Short", "white_ferrari"],
			14:["Gold Rush", "nikes"],
			15:["Ivy", "ivy"]
		};
	}
	
	const keys = Object.keys(tracks);
	var audio_tracker = 0;
	var audio_max_tracks = 0;
	for(var track in tracks){
		var tb = document.createElement("div");
		var pb = document.createElement("button");
		var tn = document.createElement("div");
		tb.className = "trackbar";
		pb.className = "playbutton";
		tn.className = "trackname";
		tn.innerHTML = audio_index+". "+tracks[track][0];
		pb.id = tracks[track][1];
		pb.addEventListener("click", switchTrack);
		tb.appendChild(pb);
		tb.appendChild(tn);
		trackbox.appendChild(tb);
		audio_index++;
		audio_max_tracks++;
	}
	audio.addEventListener("ended",nextTrack);
  	var mutebtn = document.getElementById("mutebutton"); 
	mutebtn.addEventListener("click", mute);
	var sd = document.getElementById("volumeslider");
	sd.addEventListener("input",setVolume);

	// create a function that calculates the total length of the song queue (album)
	
	function nextTrack() {
		// reset the button display after the track finishes 
		document.getElementById(playingtrack).style.background = "url(assets/playButton.svg)";
		// counter which keeps track of which track user is on and which track to play next
		if (audio_tracker < audio_max_tracks - 1) {
			audio_tracker++;
			playingtrack = tracks[audio_tracker][1];
			document.getElementById(playingtrack).style.background = "url(assets/pauseButton.svg)";
			audio.src = audio_folder+playingtrack+audio_ext;
	        audio.play();
		}
  		else {
		  	playingtrack = "";
		  	is_playing = false;
		}
	}
	function switchTrack(event){
		setVolume();
		// case where user switches tracks while one is already playing
		if(is_playing){
			// if current playing track does not equal the next chosen track
		    if(playingtrack != event.target.id){
			    is_playing = true;
				document.getElementById(playingtrack).style.background = "url(assets/playButton.svg)";
			    event.target.style.background = "url(assets/pauseButton.svg)";
			    audio.src = audio_folder+event.target.id+audio_ext;
	            audio.play();
			} else {
			    audio.pause();
			    is_playing = false;
				event.target.style.background = "url(assets/playButton.svg)";
			}
		// case where user chooses a track while nothing is playing
		} else {
			is_playing = true;
			event.target.style.background = "url(assets/pauseButton.svg)";
			if(playingtrack != event.target.id){
				audio.src = audio_folder+event.target.id+audio_ext;
			}
			// keeping track of which track number we are currently at
			for(var key in keys) {
				if(tracks[key][1] == event.target.id)
					audio_tracker = key;
			}
	        audio.play();
		}
		// keeping track of which track number we are currently at
		for(var key in keys) {
			if(tracks[key][1] == event.target.id)
				audio_tracker = key;
		}
		playingtrack = event.target.id;
	}
  	function mute() {
		if(audio.muted){
		    audio.muted = false;
		    mutebtn.style.background = "url(assets/volume.svg) no-repeat";
			mutebtn.style.backgroundSize = "contain";
	    } else {
		    audio.muted = true;
		    mutebtn.style.background = "url(assets/muteVolume.svg) no-repeat";
			mutebtn.style.backgroundSize = "contain";
	    }
	}	
	function setVolume() {
		audio.volume = sd.value / 100;
	}
}
