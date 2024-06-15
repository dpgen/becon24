$(function () {
  
  /* global variables */
  const register = $(".register");
  const registerContent = register.innerHTML;

  $("#minister_btn_upload").on("click", function () {
    if($("#minister_text_1").val()==""){
      $("#error_paragraph_1").css('display', 'block');
      return;
    }else if($("#minister_text_2").val()==""){
      $("#error_paragraph_2").css('display', 'block');
      return;
    }
    $("#error_paragraph_1").css('display', 'none');
    $("#error_paragraph_2").css('display', 'none');
    processImage();
  });
  
  

  function processImage () {
    const text1 = $(`#minister_text_1`).val()
    const text2 = $(`#minister_text_2`).val()

    // name, y, x
    const textData1 = [`${text1}`, 615, 974];
    // name, y, x
    const textData2 = [`${text2}`, 1700, 821];

    createDP(textData1, textData2, function (url) {
      navigateTo("yourdp", createHTMLForImage(url));

      function createHTMLForImage(url) {
        return `
          <h3>Download and share the invite
            with the minister</h3>
          <a class="heading-links-a" href="${url}" download="BECON_INVITE_${text1.replace(/\./g, "")}">Download e-invite</a>
        `;
      }
    });
  }
  
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
  function createDP(ministerText, personText, cb) {
    var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      imageCount = 1;
      
    var frameImg = loadImage("./dpEngine/img/min_conf_IV_frame.png");

    function loadImage(src) {
      var img = new Image();
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

      ctx = canvas.getContext("2d");

      //Write minister name
      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      ctx.font = "50px Montserrat-ExtraBold";
      ctx.fillStyle = "#212121";
      var canvasText = ministerText[0].toUpperCase();
      ctx.fillText(canvasText, ministerText[2], ministerText[1]);
      // ctx.renderText(name[3], name[2], name[1], 1);

      //Write other name
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      ctx.font = "41.5px Montserrat-Regular";
      ctx.fillStyle = "#212121";
      ctx.fillText(personText[0], personText[2], personText[1]);

      cb(canvas.toDataURL("image/jpeg", 1.0));
    }
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight, letterSpacing) {
    var words = text.split(" ");
    var line = "";

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      // var metrics = context.measureText(testLine);
      // var testWidth = metrics.width;
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
    var letters = text.split("");
    var line = "";

    for (var n = 0; n < letters.length; n++) {
      var testLine = line + letters[n];
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

  // var canvas = document.getElementById('myCanvas');
  // var context = canvas.getContext('2d');
  // var maxWidth = 400;
  // var lineHeight = 24;
  // var x = (canvas.width - maxWidth) / 2;
  // var y = 60;
  // var text = 'All the world\'s a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts.';

  // context.font = '15pt Calibri';
  // context.fillStyle = '#333';

  // wrapText(context, text, x, y, maxWidth, lineHeight, 0);

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
