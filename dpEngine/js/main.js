$(function () {
  /* global variables */
  function DifferenceInDays(firstDate, secondDate) {
    return Math.ceil((secondDate - firstDate) / (1000 * 60 * 60 * 24));
  }

  /* global variables */
  const today = new Date();
  const eventDate = new Date("2021/08/08");
  const daysToGo = DifferenceInDays(today, eventDate);

  const register = $(".register");
  const registerContent = register.innerHTML;

  $(".image-editor-1").cropit();
  $(".image-editor-2").cropit();
  $(".image-editor-3").cropit();

  $("#btn_upload_1").on("click", function () {
    console.log("Cicked here");
    // if($("#input_text_1").val()==""){
    //   $("#error_paragraph").css('display', 'block');
    //   return;
    // }
    // $("#error_paragraph").css('display', 'none');
    exportCropitImage(0, $(".image-editor-1"))
  });
  $("#btn_upload_2").on("click", function () {
    exportCropitImage(1, $(".image-editor-2"))
  });
  $("#btn_upload_3").on("click", function () {
    // if($("#input_text_3").val()==""){
    //   $("#error_paragraph_1").css('display', 'block');
    //   return;
    // }
    // $("#error_paragraph_1").css('display', 'none');
    exportCropitImage(2, $(".image-editor-3"))
    processImage();
  });

  function exportCropitImage(index, handler){
    let imageData = handler.cropit("export", {
      type: "image/jpeg",
      quality: 1.0,
      originalSize: true,
    });
    let images = getImageArray();
    images[index] = imageData;
    setImageArray(images);
  }
  
  function countLines(text, maxWidth) {
    var words = text.split(" ").filter(word => word!=="");
    var line = "";
    let count = 0;
    // console.log(words)
    // console.log(text.length)

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      if (testLine.length > maxWidth && n > 0) {
        // console.log(line)
        count++;
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    return (count + 1);
  }


  function processImage () {
    register.html(`<h3>Getting Your Video...</h3><h3>This might take some seconds</h3><h3>0% done</h3>`);
    const text1 = $(`#input_text_1`).val()
    const text2 = $(`#input_text_2`).val()
    const text3 = $(`#input_text_3`).val()
    // name, y, x
    const textData1 = [`${text1}`, 599, 440];
    // name, y, x
    const textData2 = [`${text2}`, 415, 444];

    // const numberOfLines = countLines(text3, 20);
    let textData3 = [];
    textData3 = [`${text1}`, 489, 424, `${text3}`, 425, 412];
    // switch (numberOfLines) {
    //   case 7:
    //     // name, y, x, message, x, y
    //     textData3 = [`${text1}`, 715, 424, `${text3}`, 424, 264];
    //     break;
    //   case 6:
    //     // name, y, x, message, x, y
    //     textData3 = [`${text1}`, 693, 424, `${text3}`, 424, 304];
    //     break;
    //   case 5:
    //     // name, y, x, message, x, y
    //     textData3 = [`${text1}`, 652, 424, `${text3}`, 425, 314];
    //     break;
    //   case 4:
    //     // name, y, x, message, x, y
    //     textData3 = [`${text1}`, 628, 424, `${text3}`, 425, 364];
    //     break;
    //   case 3:
    //     // name, y, x, message, x, y
    //     textData3 = [`${text1}`, 597, 424, `${text3}`, 425, 384];
    //     break;
    //   case 2:
    //     // name, y, x, message, x, y
    //     textData3 = [`${text1}`, 563, 440, `${text3}`, 441, 413];
    //     break;
    //   default:
    //     // name, y, x, message, x, y
    //     textData3 = [`${text1}`, 489, 424, `${text3}`, 425, 412];
    //     break;
    // }

    // button.attr("disabled", "disabled").html("...processing");

    // x, y, width, height
    // const picData1 = [132, 485, 244, 244];
    // const picData2 = [163, 416, 226, 226];
    // const picData3 = [140, 372, 238, 238];
    const picData1 = [195, 139, 689, 1218];
    const picData2 = [195, 139, 689, 1218];
    const picData3 = [195, 139, 689, 1218];
    let images = getImageArray();

    createDP(0,images[0], picData1, textData1, genericCb);

    function genericCb (index, url) {
      //adasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdadasdasdasdasdasdasdsaadsdasdasdasdasdasdasdasdasdasdadas
      let images = getImageArray();
      if (index < 2) {
        $.ajax({
          url: "https://api.cloudinary.com/v1_1/dzzw47btk/image/upload",
          type: "POST",
          data: {
            file: url,
            upload_preset: "udwlnsng",
          },
          success: function (result) {
            // console.log(result);
            // console.log(result.public_id);
            images[index] = result.public_id;
            setImageArray(images);
  
            if(index == 0){
              register.html(`<h3>Getting Your Video...</h3><h3>This might take some seconds</h3><h3>30% done</h3>`);
              createDP(1,images[1], picData2, textData2, genericCb);
            }else{
              register.html(`<h3>Getting Your Video...</h3><h3>This might take some seconds</h3><h3>60% done</h3>`);
              createDP(2,images[2], picData3, textData3, genericCb);
            }
          },
          error: function (xhr, status, error) {
            console.log(error);
          },
        });
        return;
      }
      $.ajax({
        url: "https://api.cloudinary.com/v1_1/dzzw47btk/image/upload",
        type: "POST",
        data: {
          file: url,
          upload_preset: "udwlnsng",
        },
        success: function (result) {
          images[index] = result.public_id;
          setImageArray(images);

          register.html(`<h3>Getting Your Video...</h3><h3>This might take some seconds</h3><h3>90% done</h3>`);
          navigateTo("yourdp", createHTMLForImage(url));
        },
        error: function (xhr, status, error) {
          console.log(error);
        },
      });

      function createHTMLForImage(url) {
        let images = getImageArray();
        return `
        <h3>Do the work of an Evangelist,
            share your Video far & wide</h3>
        <a class="heading-links-a" href="https://res.cloudinary.com/dzzw47btk/video/upload/w_1080,h_1920/l_${
          images[0]
        },so_0,eo_5/l_${images[1]},so_5,eo_9/l_${images[2]},so_9,eo_13/fl_attachment/BeconClip_xfqv3u.mp4" download="Becon_Vid">Download my video</a>
        `;
        // return `
        // <h3>Do the work of an Evangelist,
        //     share your Video far & wide</h3>
        // <a class="heading-links-a" href="https://res.cloudinary.com/dzzw47btk/video/upload/w_1080,h_1080/l_${
        //   images[0]
        // },so_0,eo_5/l_${images[1]},so_5,eo_10/l_${images[2]},so_10,eo_15/l_Main_Flyer_jt8grg,so_15/fl_attachment/BeconClip_c6kyba.mp4" download="Becon_Vid_${text1.replace(/\./g, "")}">Download my video</a>
        // `;
      }
    }
  };
  
  if (CanvasRenderingContext2D && !CanvasRenderingContext2D.renderText) {
    // @param  letterSpacing  {float}  CSS letter-spacing property
    CanvasRenderingContext2D.prototype.renderText = function (
      text,
      x,
      y,
      letterSpacing
    ) {
      if (!text || typeof text !== "string" || text.length === 0) {
        return;
      }

      if (typeof letterSpacing === "undefined") {
        letterSpacing = 0;
      }

      // letterSpacing of 0 means normal letter-spacing

      var characters = String.prototype.split.call(text, ""),
        index = 0,
        current,
        currentPosition = x,
        align = 1;

      if (this.textAlign === "right") {
        characters = characters.reverse();
        align = -1;
      } else if (this.textAlign === "center") {
        var totalWidth = 0;
        for (var i = 0; i < characters.length; i++) {
          totalWidth += this.measureText(characters[i]).width + letterSpacing;
        }
        currentPosition = x - totalWidth / 2;
      }

      while (index < text.length) {
        current = characters[index++];
        this.fillText(current, currentPosition, y);
        currentPosition +=
          align * (this.measureText(current).width + letterSpacing);
      }
    };
  }

  function createDP(index, imageUrl, pic, name, cb) {
    var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      imageCount = 2,
      view = {
        x: pic[0],
        y: pic[1],
        width: pic[2],
        height: pic[3],
      },
      innerText = {
        x: view.width * 0.7,
        y: view.height - 80,
      };

    let userImg = loadImage(imageUrl);
    let frameImg = null;
    // if(index == 0){
    //   switch (daysToGo) {
    //     case 3:
    //       frameImg = loadImage("./dpEngine/img/Frame1_3d.png");
    //       break;
    //     case 2:
    //       frameImg = loadImage("./dpEngine/img/Frame1_2d.png");
    //       break;
    //     case 1:
    //       frameImg = loadImage("./dpEngine/img/Frame1_1d.png");
    //       break;
    //     default:
    //       frameImg = loadImage("./dpEngine/img/Frame1_dd.png");
    //       break;
    //   }
    // }else if(index == 1){
    //   frameImg = loadImage("./dpEngine/img/Frame2.png");
    // }else{
    //   frameImg = loadImage("./dpEngine/img/Frame3.png");
    // }
    frameImg = loadImage("./dpEngine/img/fullFrame2.png");

    function loadImage(src) {
      let img = new Image();
      img.onload = transformImage;
      img.src = src;
      return img;
    }

    function transformImage() {
      if (--imageCount !== 0) return;

      canvas.width = frameImg.width;
      canvas.height = frameImg.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(frameImg, 0, 0);

      ctx.save();
      // ctx.beginPath();
      // if(index == 0){
      //   ctx.arc(254, 607, 122, 0, Math.PI * 2, true);
      // }else if(index == 1){
      //   ctx.arc(276, 529, 113, 0, Math.PI * 2, true);
      // }else{
      //   ctx.arc(259, 491, 119, 0, Math.PI * 2, true);
      // }
      // ctx.closePath();
      // ctx.clip();

      ctx.drawImage(userImg, view.x, view.y, view.width, view.height);

      ctx.restore();

      ctx = canvas.getContext("2d");

      // if(index < 2){
      //   //Write user name
      //   ctx.textBaseline = "top";
      //   ctx.textAlign = "left";
      //   ctx.font = "50px AL_Nevrada_Personal_Use_Only";
      //   ctx.fillStyle = "#bd8e44";
      //   var canvasText = name[0];
      //   ctx.fillText(canvasText, name[2], name[1]);
      //   // ctx.renderText(name[3], name[2], name[1], 1);
      // }else{
      //   //write messge
      //   ctx.textBaseline = "top";
      //   ctx.textAlign = "left";
      //   ctx.font = "50px AL_Nevrada_Personal_Use_Only";
      //   ctx.fillStyle = "#bd8e44";
      //   // ctx.fillText(canvasText, name[2], name[1]);
      //   wrapText(ctx, name[3], name[4], name[5], 20, 63, 0);

      //   //Write user name
      //   ctx.font = "33px Ubuntu-Regular";
      //   ctx.fillStyle = "#342c2c";
      //   var canvasText = `-${name[0]}`;
      //   ctx.fillText(canvasText, name[2], name[1]);
      // }
      
      cb(index, canvas.toDataURL("image/jpeg", 1.0));
    }
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight, letterSpacing) {
    var words = text.split(" ").filter(word => word!=="");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      // let metrics = context.measureText(testLine);
      // let testWidth = metrics.width;
      if (testLine.length > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
        // if (maxWidth <= 25) {
        //   maxWidth += 5;
        // } else {
        //   maxWidth -= 5;
        // }
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function wrapTextLetter(
    context,
    text,
    x,
    y,
    maxLetters,
    lineHeight,
    letterSpacing
  ) {
    let letters = text.split("");
    let line = "";

    for (let n = 0; n < letters.length; n++) {
      let testLine = line + letters[n];
      if (testLine.length > maxLetters && n > 0) {
        context.fillText(line, x, y);
        line = letters[n];
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  function navigateTo(view, temp = "") {
    switch (view) {
      case "yourdp":
        register.html(temp);
        break;
      default:
        register.innerHTML = registerContent;
    }
  }
  console.log("DOM fully loaded and parsed");
});
