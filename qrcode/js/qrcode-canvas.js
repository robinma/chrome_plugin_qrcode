(function(win) {

  var init = function(options) {
    //of option is string
    if (typeof options === 'string') {
      options = {
        'text': options
      };
    }

    options = $.extend({}, {
      render: "canvas",
      width: 280,
      height: 280,
      typeNumber: -1,
      correctLevel: QRErrorCorrectLevel.H,
      background: "#ffffff",
      foreground: "#000000"
    }, options);

    return createCanvas(options);
  }

    var createCanvas  = function(options){
      // create the qrcode itself
      var qrcode  = new QRCode(options.typeNumber, options.correctLevel);
      var text=utf16to8(options.text);
      qrcode.addData(text);
      qrcode.make();

      // create canvas element
      var canvas  = document.createElement('canvas');
      canvas.width  = options.width;
      canvas.height = options.height;
      var ctx   = canvas.getContext('2d');

      // compute tileW/tileH based on options.width/options.height
      var tileW = options.width  / qrcode.getModuleCount();
      var tileH = options.height / qrcode.getModuleCount();

      // draw in the canvas
      for( var row = 0; row < qrcode.getModuleCount(); row++ ){
        for( var col = 0; col < qrcode.getModuleCount(); col++ ){
          ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
          var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
          var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
          ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
        } 
      }
      // return just built canvas
      return canvas;
    }
function utf16to8(str) {  
    var out, i, len, c;  
    out = "";  
    len = str.length;  
    for(i = 0; i < len; i++) {  
    c = str.charCodeAt(i);  
    if ((c >= 0x0001) && (c <= 0x007F)) {  
        out += str.charAt(i);  
    } else if (c > 0x07FF) {  
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));  
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));  
    } else {  
        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));  
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));  
    }  
    }  
    return out;  
}
    win.qrcode_canvas=init;
})(this);