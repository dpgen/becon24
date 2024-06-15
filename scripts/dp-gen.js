const backPage = document.querySelector(".back");
const uploadButton = document.querySelectorAll(".upload-button");
let translateValue = 0;
const uploadWrapper = document.querySelectorAll(".upload-wrapper");
const images = document.querySelectorAll(".user-image");

backPage.addEventListener("click", () => {
  if (translateValue < 0) {
    translateValue += 100;
    uploadWrapper.forEach((item) => {
      item.style.transform = `translate(${translateValue}%)`;
      item.style.position = "relative";
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    translateValue >= 0
      ? (backPage.disabled = true)
      : (backPage.disabled = false);
  }
});
//Button Validation
images.forEach((image, index) => {
  image.addEventListener("change", (e) => {
    image.value
      ? (uploadButton[index].disabled = false)
      : (uploadButton[index].disabled = true);
  });
});

uploadButton.forEach((item, index) => {
  item.addEventListener("click", () => {
    // console.log(index, uploadWrapper.length - 1);
    // console.log($(`#input_text_${index+1}`).val())
    // if($(`#input_text_${index+1}`).val()==""){
    //   return;
    // }
    if (translateValue < uploadWrapper.length * 100) {
      translateValue -= 100;
      uploadWrapper.forEach((item) => {
        item.style.transform = `translate(${translateValue}%)`;
      });
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    if (index === uploadWrapper.length - 2) {
      // uploadWrapper[index].style.transform = "translate(0%)";
      uploadWrapper.forEach((item) => {
        item.style.position = `absolute`;
      });
      uploadWrapper[uploadWrapper.length - 1].style.transition = "all 0s";
      uploadWrapper[uploadWrapper.length - 1].style.position = "relative";
      uploadWrapper[uploadWrapper.length - 1].style.transform = "translate(0%)";
    }
    translateValue >= 0
      ? (backPage.disabled = true)
      : (backPage.disabled = false);
  });
});

// Modal
const modalBtn = document.querySelector(".modal-btn");
const modalSection = document.querySelectorAll(".modal-section");
let index = 1;
let modalTransition = 0;
modalBtn.addEventListener("click", () => {
  document.querySelector(".modal-container").scrollTop =
    document.documentElement.scrollTop = 0;
  // if (index >= 3) {
  //   document.querySelector(".modal").style.transform = "scale(0)";
  // } else {
  //   modalTransition -= 100;
  //   modalSection.forEach((item) => {
  //     item.style.transform = `translate(${modalTransition}%)`;
  //   });
  //   document.querySelectorAll(".modal-indicator span")[
  //     index
  //   ].style.backgroundColor = "#a58543";
  // }
  // index++;
  // if (index > 2) {
  //   modalBtn.innerHTML = "Yay! I’m ready";
  // }
      document.querySelector(".modal").style.display = "none";

});

document.querySelector(".modal-button").addEventListener("click", () => {
  document.querySelector(".modal").style.transform = "scale(0)";
});
