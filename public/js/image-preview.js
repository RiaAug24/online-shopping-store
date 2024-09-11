const imagePicker = document.querySelector("#img-upload-ctrl input");
const imagePreviewElement = document.querySelector("#img-upload-ctrl img");

let updateImagePreview = () => {
  const files = imagePicker.files;
  // console.log(files[0].name);
  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }

  const pickedFile = files[0];
  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = "block";
};

imagePicker.addEventListener("change", updateImagePreview);
