(function(win){

    var init=function(){
        
        todo();
        
    };

    var downloadMime = 'image/octet-stream';

    var todo=function(){
      getCurrWin(function(winid){
        getCurrTab(winid,function(tab){
          createQR(tab);
          console.log(tab)
        });
      })
    }

    var getCurrWin=function(callback){
      
      chrome.windows.getCurrent(function(winobj){
          var winId=winobj.id;
          if(typeof callback === 'function') callback(winId);
        });

    }

    var getCurrTab=function(winid,callback){
      chrome.tabs.getAllInWindow(winid,function(tabs){
        tabs.forEach(function(tab){
          if(tab.active){
            if(typeof callback === 'function') callback(tab);
            return;
          }
        });
      })
    }
    //get canvas dataURl
    var getDataURL=function(canvas,type){
      return canvas.toDataURL(type);
    }
    //save file
    var saveFile=function(strData){
      document.location.href=strData;
      console.log(strData)
    };

    var saveAsImage=function(canvas,type){
      if(type ===undefined){type = 'png';}
      type=fixType(type);
      var strData=getDataURL(canvas,type);
      saveFile(strData.replace(type,downloadMime));
    }

    var createQR=function(tabinfo){
      var str=tabinfo.url;
      var qrcanvas=qrcode_canvas(str);
      var dataurl=getDataURL(qrcanvas,'png');

      var img=document.createElement('img');
      img.src=dataurl;

      $('#qrcode').html(img);
      $('.txtinfo').text(str);
      // $('#qrcode').on('click','img',function(){
      //   saveAsImage(qrcanvas)
      // });

    }

    var fixType=function(type){
      type=type.toLowerCase().replace(/jpg/i,'jpeg');
      var r=type.match(/png|jpg|gif/)[0];
      return 'image/'+r;
    }

    init();
})(this);