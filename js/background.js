(function(root,mainRoll){

    mainRoll(root,root.$);

})(this,function(root,$){

  var tabId;

    //enter
   var init=function(){

        events();
   }

   var events=function(){
      //when tab change
      chrome.tabs.onUpdated.addListener(function(id,info,tab){
        setpageAction(id,info);
      });
      chrome.tabs.onSelectionChanged.addListener(function(id,info){
        setpageAction(id,info);
      }); 

    }
   //set page action show
   var setpageAction=function(tabid,info){
    tabId=tabid;
    chrome.pageAction.show(tabid);
   }


   init();
});