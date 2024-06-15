
//Ministers Button Validation
document.getElementById("minister_text_1").addEventListener("input", (e) => {
  // console.log(document.getElementById("minister_text_2").value);
  e.target.value && document.getElementById("minister_text_2").value
    ? (document.getElementById("minister_btn_upload").disabled = false)
    : (document.getElementById("minister_btn_upload").disabled = true);
});
document.getElementById("minister_text_2").addEventListener("input", (e) => {
  e.target.value && document.getElementById("minister_text_1").value
    ? (document.getElementById("minister_btn_upload").disabled = false)
    : (document.getElementById("minister_btn_upload").disabled = true);
});
document.getElementById("minister_btn_upload").addEventListener('click', () => {
  document.querySelectorAll('.upload-wrapper').forEach((wrapper, index) => {
    wrapper.style.transform = 'translate(-100%)'
  })
})