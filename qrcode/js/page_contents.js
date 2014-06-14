/**
 * @author robin ma
 */
(function($,win){
	
	var init=function(){
		
		//events();
	};
	
	var events=function(){
		// chrome.extension.sendRequest({greeting:'Hello'},function(res){
			// console.log(res);
		// });
		var port=chrome.extension.connect({name:"ltc_clients"});
		setInterval(function(){
			port.postMessage({getdata:'getData'});
		},10000);
		port.postMessage({getdata:'getData'});
		port.onMessage.addListener(function(msg){
			if(msg.question=='q1'){
				console.log(msg.data);
				insertHtml(msg.data);
			}
		});
	}

	
	init();
}(jQuery,window));
