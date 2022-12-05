var side_control_page_1 = document.querySelector(".menu-controls");
var actionButton = document.querySelectorAll(".action-button button");
var hiddenUpload = document.querySelector(".action-button .hidden-upload");
var image_workspaceSpan = document.querySelector(".image-workspace span");
var preview_containerSpan = document.querySelector(".preview-container span");
var zoom = document.querySelectorAll(".menu-controls .zoom svg");
var rotate = document.querySelectorAll(".menu-controls .rotate svg");
var flip = document.querySelectorAll(".menu-controls .flip svg");
var move = document.querySelectorAll(".menu-controls .move svg");
var controlCropper = document.querySelectorAll(
  ".bottom-control .ctrl-cropper svg"
);
var lockCropper = document.querySelectorAll(".bottom-control .lock svg");
var dargMode = document.querySelectorAll(".bottom-control .drag-mode svg");

//Toggle pop-up
function myPopup() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}



// upload image
actionButton[0].onclick = () => hiddenUpload.click();
hiddenUpload.onchange = () => {
  // update on new file selected issue removed here
  document.querySelector(".image-workspace").innerHTML = `<img src="" alt="">`;
  var image_workspace = document.querySelector(".image-workspace img");

  var file = hiddenUpload.files[0];
  var url = window.URL.createObjectURL(new Blob([file], { type: "image/jpg" }));
  image_workspace.src = url;
  image_workspaceSpan.style.display = "none";
  preview_containerSpan.style.display = "none";

  var options = {
    dragMode: "move",
    preview: ".img-preview",
    viewMode: 2,
    modal: false,
    background: false,
    ready: function () {
      // zoom for image
      zoom[0].onclick = () => cropper.zoom(0.1);
      zoom[1].onclick = () => cropper.zoom(-0.1);

      // rotate image
      rotate[0].onclick = () => cropper.rotate(90);
      rotate[1].onclick = () => cropper.rotate(-90);

      // flip image
      var flipX = -1;
      var flipY = -1;
      flip[0].onclick = () => {
        cropper.scale(flipX, 1);
        flipX = -flipX;
      };
      flip[1].onclick = () => {
        cropper.scale(1, flipY);
        flipY = -flipY;
      };

      // cropper control
      controlCropper[0].onclick = () => cropper.clear()
      controlCropper[1].onclick = () => cropper.crop()

      // lock cropper
      lockCropper[0].onclick = () => cropper.disable()
      lockCropper[1].onclick = () => cropper.enable()
      
     
      
    },
  };
    

  var cropper = new Cropper(image_workspace, options);

//Image preview on pop-up
  document.getElementById("cropImageBtn").addEventListener("click", function dizplay() {
    var croppedImage = cropper.getCroppedCanvas().toDataURL("image/png");
    document.getElementById("output").src = croppedImage;
  });
 
  
// Clipping images (The most tedious part of this assignment)
  const img1 = document.getElementById("og")
  img1.addEventListener("click", changeNone)
  const img2 = document.getElementById("heart")
  img2.addEventListener("click", changeHeart)
  const img3 = document.getElementById("sqr")
  img3.addEventListener("click", changeSqr)
  const img4 = document.getElementById("circ")
  img4.addEventListener("click", changeCirc)
  const img5 = document.getElementById("rect")
  img5.addEventListener("click", changeRect)
  const shapesArr =[
    //heart
    "M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z",
    //square
    "5% 20% 15% 10%",
    //circle
    "50% at 50% 50%",
    //rectange
    "14% 0 19% 0",

  ]

  function changeHeart(){
    document.getElementById("output").style.setProperty("--shape", shapesArr[0]); 
  }
  function changeSqr(){
    document.getElementById("output").style.setProperty("--shape", shapesArr[1]); 
  }
  function changeCirc(){
    document.getElementById("output").style.setProperty("--shape", shapesArr[2]); 
  }
  function changeRect(){
    document.getElementById("output").style.setProperty("--shape", shapesArr[3]); 
  }
};

