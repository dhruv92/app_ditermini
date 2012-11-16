function filter(completionMenu, url, param_key, processResponse, searchDiv){
	this.element = document.getElementById(completionMenu);
	this.url = url;
	this.param_key = param_key;
	this.processResponse = processResponse;
	this.searchDiv=searchDiv;
	this.substring = this.element.value;
	var obj=this;
	this.element.onkeyup = function(event){
		obj.onKeyUp(event);
	}		
	this.requestURL = "";
	this.xmlhttp = null;
	if (window.XMLHttpRequest) {
		this.xmlhttp=new XMLHttpRequest();	
		this.xmlhttp.onreadystatechange=function(event){
			obj.onReadyStateChange(event);
		}
	}
}

filter.prototype.onReadyStateChange = function() {
	if (this.xmlhttp.readyState==4 && this.xmlhttp.status==200)  {
		this.processResponse(this.xmlhttp.responseText,this.searchDiv);
	}
}

filter.prototype.onKeyUp = function(event) {
    this.substring = encodeURIComponent(this.element.value);
	if (this.substring.length==0)  { 
		document.getElementById(this.searchDiv).innerHTML="";
		return;
	}	
	this.requestURL= this.url+"?"+this.param_key+"="+this.substring;
	this.xmlhttp.open("GET",this.requestURL,true);
	this.xmlhttp.send();
}
