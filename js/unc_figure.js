// Button selection for image
var totUncButton = document.getElementById('tot_unc_button');
var dataUncButton = document.getElementById('data_unc_button');
var knowUncButton = document.getElementById('know_unc_button');

var totUncSrc = 'images/total_uncertainty.png';
var dataUncSrc = 'images/data_uncertainty.png';
var knowUncSrc = 'images/knowledge_uncertainty.png';


totUncButton.onclick = function()
{
   document.getElementById("uncertainty_pic").src= totUncSrc;
   totUncButton.class = 'unc-img-selector-button selected';
   dataUncButton.class = 'unc-img-selector-button';
   knowUncButton.class = 'unc-img-selector-button';
}
dataUncButton.onclick = function()
{
   document.getElementById("uncertainty_pic").src= dataUncSrc;
   totUncButton.class = 'unc-img-selector-button';
   dataUncButton.class = 'unc-img-selector-button selected';
   knowUncButton.class = 'unc-img-selector-button';
}
knowUncButton.onclick = function()
{
   document.getElementById("uncertainty_pic").src= knowUncSrc;
   totUncButton.class = 'unc-img-selector-button';
   dataUncButton.class = 'unc-img-selector-button';
   knowUncButton.class = 'unc-img-selector-button selected';
}

// Interactive canvas
var canvas = document.getElementById('canvas');
var unc_img = document.getElementById('uncertainty_pic')

canvas.width = unc_img.width;
canvas.height = unc_img.height;
var circleColors = [
  "rgba(130, 70, 180, 0.6)",
  "rgba(70, 130, 180, 0.6)",
  "rgba(170, 50, 150, 0.6)",
  "rgba(200, 90, 60, 0.6)"];
var ctx = canvas.getContext('2d');

window.addEventListener('resize', function(){
  canvas.width = unc_img.width;
  canvas.height = unc_img.height;
})


var mouse_img_coords = {
  x: 0,
  y: 0
}
unc_img.addEventListener('mousemove', function(event) {
  var rect = event.target.getBoundingClientRect();
  var x = event.clientX - rect.left; //x position within the element.
  var y = event.clientY - rect.top;  //y position within the element.
  if (x < 0) {
    mouse_img_coords.x = 0;
  } else if (x >= unc_img.width) {
    mouse_img_coords.x = (unc_img.width - 1) / unc_img.width;
  } else {
    mouse_img_coords.x = x / unc_img.width;
  }
  if (y < 0) {
    mouse_img_coords.y = 0;
  } else if (y >= unc_img.height) {
    mouse_img_coords.y = (unc_img.height - 1) / unc_img.height;
  } else {
    mouse_img_coords.y = y / unc_img.height;
  }
})


function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2., false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  this.updatePos = function(new_x, new_y) {
    this.x = new_x;
    this.y = new_y;
  }
}

function Triangle(x, y, width, dataArr, circleRadius) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = Math.sqrt(0.75) * this.width;
  this.dataArr = dataArr;
  this.dataRes = Math.sqrt(dataArr.length);
  this.rimColor = [200, 200, 210];
  this.backgroundOpacity = 0.3;
  this.MinBackgroundOpacity = 0.3;
  this.MaxBackgroundOpacity = 0.5;
  this.background = "rgba(" + this.rimColor[0] + ", " + this.rimColor[1]+ ", " + this.rimColor[2] + ", " +this.backgroundOpacity + ")";
  this.circlesArr = [];
  this.mouseOverImg = false;
  this.lineWidth = 1;
  this.maxLineWidth = 1.5;
  for (var i = 0; i < dataArr[0].length; i++) {
    var circle = new Circle(x, y, circleRadius, circleColors[Math.floor(Math.random() * circleColors.length)]);
    this.circlesArr.push(circle);
  }
  this.drawSelf = function() {
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(this.x + Math.floor(this.width / 2), this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x, this.y + this.height)
    ctx.closePath();
    ctx.strokeStyle = this.rimColor;
    ctx.stroke();
  }
  this.draw = function() {
    this.drawSelf();
    for (var i = 0; i < this.circlesArr.length; i++) {
      this.circlesArr[i].draw();
    }
  }

  this.update = function() {
    dataPointIdx = this.dataRes * Math.floor(mouse_img_coords.y * this.dataRes) + Math.floor(mouse_img_coords.x * this.dataRes);
    dataPoint = this.dataArr[dataPointIdx];
    for (var i = 0; i < this.circlesArr.length; i++) {
      var new_x = this.x + dataPoint[i][0] * this.width;
      var new_y = this.y + this.height - dataPoint[i][1] * this.width;
      this.circlesArr[i].updatePos(new_x, new_y);
    }
    // Update the rim
    if (this.mouseOverImg) {
      if (this.lineWidth < this.maxLineWidth) {
        this.lineWidth += 0.05;
      }
      if (this.backgroundOpacity < this.MaxBackgroundOpacity) {
        this.backgroundOpacity += 0.04;
      }
    } else {
      if (this.lineWidth > 1) {
        this.lineWidth -= 0.05
      }
      if (this.backgroundOpacity > this.MinBackgroundOpacity) {
        this.backgroundOpacity -= 0.04;
      }
    }
    this.background = "rgba(" + this.rimColor[0] + ", " + this.rimColor[1]+ ", " + this.rimColor[2] + ", " +this.backgroundOpacity + ")";
  }

}


function loadJSON(callback) {

   var xobj = new XMLHttpRequest();
       xobj.overrideMimeType("application/json");
   xobj.open('GET', 'json/path.json', true); // Replace 'my_data' with the path to your file
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
}

document.onload = loadJSON(function(response) {
  // Parse JSON string into object
    var dataJson = JSON.parse(response);
    $(window).resize();
    $(canvas).resize();

    var triangle = new Triangle(canvas.width * 0.1, canvas.width * 0.15, 0.8 * canvas.width, dataJson, 4);

    window.addEventListener('resize', function(){
      triangle.x = unc_img.width * 0.1;
      triangle.y = unc_img.width * 0.15;
      triangle.width = 0.8 * unc_img.width;
      triangle.height = Math.sqrt(0.75) * triangle.width
    })
    unc_img.addEventListener('mouseover', function(event) {
      // Change lineWidth of Triangle
      triangle.mouseOverImg = true;
    })
    unc_img.addEventListener('mouseout', function(event) {
      // Change lineWidth of Triangle
      triangle.mouseOverImg = false;
    })

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      triangle.update();
      triangle.draw();
    }
    animate();
});
