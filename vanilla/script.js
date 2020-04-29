let newImage = new Image();
newImage.src = "./time-lapse/image.jpg";
newImage.width = "800";
newImage.height = "600";
let htmlImage = document.getElementById("showImage")


function updateImage()
{
if(newImage.complete) {
      if (htmlImage.childElementCount >0 ) {
            htmlImage.removeChild(htmlImage.firstChild);
        }

    
    newImage = new Image();
    newImage.width = "800";
    newImage.height = "600";
    newImage.src = "./time-lapse/image.jpg?" + new Date().getTime();
    htmlImage.appendChild(newImage);
    
}

    setTimeout(updateImage,30000);


}
