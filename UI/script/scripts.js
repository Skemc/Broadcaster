const showMenu = () =>{
    document.querySelector('.side-menu').style.display = "block";
}

const closeMore = () =>{
    document.querySelector('.side-menu').style.display = "none";
}  

var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
};

var loadFiles = function(event) {
	var video = document.getElementById('output1');
	video.src = URL.createObjectURL(event.target.files[0]);
};
