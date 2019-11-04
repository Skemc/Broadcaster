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

function initMap() {
    var rwanda = {lat: -1.9496959999999999, lng:  30.1006848};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: rwanda});
    var marker = new google.maps.Marker({position: rwanda, map: map});
  } 