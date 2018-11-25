var ajax = {}

ajax.convert =   function(dict)
{
 let output = "";
 let keys = Object.keys(dict);
 for(let i =0; i<keys.length; i++){
   let key = keys[i];
   output += encodeURIComponent(key);
   output += "="+encodeURIComponent(dict[key])+"&"
 }
 output = output.substring(0,(output.length-1));
 return output;
}

ajax.get = function(url){
 request = new XMLHttpRequest();
 request.open("GET",url,true);
 request.send();
 return new Promise(
   function(resolve, reject){
     request.onreadystatechange = function(){
       if(this.readyState == 4){
         if(this.status == 200){
           resolve(this.responseText);
         }else{
           reject(this.status);
         }
       }
     }
   }
 );
}

ajax.submit_form = function(form){
	let request = new XMLHttpRequest();
	conosle.log(form.method);
	console.log(form.action);
	request.open(form.method,form.action, true);
	request.setRequestHeader("Content-Type", "application/octet-stream");

	let data = new FormData(form);
	request.send(data);
	return new Promise(
   		function(resolve,reject){
     		request.onreadystatechange = function(){
	       		if(this.readyState==4){
	         		if(this.status == 200){
	           			resolve(this.responseText);
	         		}
	         		else{
	           		reject(this.status);
	         		}
	       		}
     		}
   		}

 );
}


ajax.post = function(url, data){
  let request = new XMLHttpRequest();
  request.open("POST",url, true);
  console.log(ajax.convert(data));
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.setRequestHeader("enc-type", " multipart/form-data");
 request.send(ajax.convert(data));
 return new Promise(
   function(resolve,reject){
     request.onreadystatechange = function(){
       if(this.readyState==4){
         if(this.status == 200){
           resolve(this.responseText);
         }
         else{
           reject(this.status);
         }
       }
     }
   }

 );

 }
//
