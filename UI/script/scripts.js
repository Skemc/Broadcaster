const showMenu = () =>{
	document.querySelector('.side-menu').style.display = "block";
	
};
const showMore = () =>{
	document.querySelector('.more-icon').style.display = "block";
	document.querySelector('.showing').style.display = "none";
	document.querySelector('.removing').style.display = "block";
  };
 
const closeDrop = () =>{
	document.querySelector('.more-icon').style.display = "none";
	document.querySelector('.showing').style.display = "block";
	document.querySelector('.removing').style.display = "none";
  };

const closeMore = () =>{
    document.querySelector('.side-menu').style.display = "none";
};  

var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
};

var loadFiles = function(event) {
	var video = document.getElementById('output1');
	video.src = URL.createObjectURL(event.target.files[0]);
};

