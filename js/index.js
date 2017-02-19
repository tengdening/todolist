// var arr=[
	// {
	// 	title:"睡觉睡觉睡觉",
	// 	done:true,
	// },
	// {
	// 	title:"吃饭吃饭吃饭",
	// 	done:true,
	// },
	// {
	// 	title:"学习学习学习",
	// 	done:false
	// },
	// {
	// 	title:"游戏游戏游戏",
	// 	done:true
	// },
	// {
	// 	title:"聊天聊天聊天",
	// 	done:false
	// },
	// {
	// 	title:"喝水喝水喝水",
	// 	done:false
	// }
// ];
var now=document.querySelector(".now .list");
var com=document.querySelector(".com-now .list");
var nowN=document.querySelector(".now .number");
var comN=document.querySelector(".com-now .number");
var srk=document.querySelector(".head-box input");


var arr=getItem();




//本地存储
function getItem(){
	var arr=localStorage.getItem("arr")||"[]";
	return JSON.parse(arr);
}
function setItem(data){
	localStorage.setItem("arr",JSON.stringify(data));
}
function add(t){
	arr.unshift({
		title:t,
		done:false
	})
	setItem(arr);
	reload();
}
srk.onkeydown=function(e){
	var ev=e||window.event;

	if (ev.keyCode==13) {
		if (this.value.length==0) {
			alert("小孩子，别捣乱");
			return;
		}else{
			add(this.value);
			this.value=("");
		}
	};
}
function change(i,key,value){
	arr[i][key]=value;
	setItem(arr);
	reload();
}
function del(i){
	arr.splice(i,1);
	setItem(arr);
	reload();
}
reload()
function reload(){
	var nowStr="";
	var comStr="";
	var nowNum=0;
	var comNum=0;
	for (var i = 0; i < arr.length; i++) {
		if(arr[i].done==true){
			comNum++;
			comStr+="<li draggable=true>"+
				"<input type='checkbox' checked onclick=change("+i+",'done',false)>"+
				"<p contenteditable=true onblur=change("+i+",'title',this.innerHTML)>"+arr[i].title+"</p>"+
				"<div class='delete' onclick=del("+i+")>一</div>"+
			"</li>"
		}else{
			nowNum++;
			nowStr+="<li draggable=true>"+
				"<input type='checkbox' onclick=change("+i+",'done',true)>"+
				"<p contenteditable=true onblur=change("+i+",'title',this.innerHTML)>"+arr[i].title+"</p>"+
				"<div class='delete' onclick=del("+i+")>一</div>"+
			"</li>"
		}
	};
	now.innerHTML=nowStr;
	com.innerHTML=comStr;
	nowN.innerHTML=nowNum;
	comN.innerHTML=comNum;
}

var lis=document.querySelectorAll(".list li");
var aa=null;
for (var i = 0; i < lis.length; i++) {
	lis[i].ondragstart=function(e){
		aa=this;
		var cc=this.innerHTML
		e.dataTransfer.setData("text/html",cc);
		console.log(cc)
		this.style.background="red";
	}
	lis[i].ondragover=function(e){
		e.preventDefault();
		this.style.background="green";
	}
	lis[i].ondrop=function(e){
		aa.innerHTML=this.innerHTML;
		console.log(this.innerHTML)
		console.log(aa.innerHTML)
		this.innerHTML=e.dataTransfer.getData("text/html");
	}
};
