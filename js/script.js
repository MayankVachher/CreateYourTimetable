/* This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var timerID = null;
var j = 10;
var k = 9.375;
var count = 1;
var elements = new Array("AC","ACB","ACD","ADD","CA","CDN","CF","CMP","DBSI","DHD","DM","EIIT","ENT","FCS","GradAlgo","IA","IEA","IVD","LCS","LPL",
"MBB","MC","ML","OS","PHY","PLBS","PRP","PSOSM","PvsNP","ROB","SB","SC","SE","TMC");
var groupIndexes = new Array(3,8,5,4,5,8,8,2,1,4,1,2,7,8,5,6,1,3,1,2,0,2,7,10,9,4,7,4,8,7,3,6,5,6);
var profs = new Array("Dr. Somitra Sanadhya","Dr. Dhruv Grover","Dr. M.S. Hashmi","Dr. Rajiv Raman","Dr. Subhasis Bannerji","Ms. Geeta Tripathi (G)","Dr. Angshul Majumdar","Dr. ApalaG","Dr. Vikram Goyal","Dr. Saket Srivastava","Guest Faculty","Dr. Shreemoy Mishra","Mr. Hemant Kumar","Dr. Gaurav Gupta","Dr. Debajyoti Bera","Dr. Mayank Vatsa","Dr. Shreemoy Mishra","Dr. Sujay Deb","Dr. Astrid Kiehn","Prof. Ashwin Srinivasan","Dr. Sriram K","Dr. Vinayak Naik","Dr. Mayank Vatsa","Dr. Pushpendra Singh","Guest Faculty","Dr. Vikram Goyal","Dr. Sanjit Kaul","Dr. PK","Dr. Debajyoti Bera","Dr. P.B. Sujit","Dr. Sriram K","Prof. Ashwin Srinivasan","Dr. Ashish ureka",
"Dr. Donghoon Chan");

var selectedCourses = new Array();
var collisionCourses = new Array();
function rotate(eleStr,deg){
	document.getElementById(eleStr).setAttribute(
			"style", "transform:rotate(" + deg + "deg);"
		  + "-moz-transform: rotate(" + deg + "deg);"
		  + "-o-transform: rotate(" + deg + "deg);"
		  + "-webkit-transform:rotate(" + deg + "deg);"
		  + "filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=" + deg + ");");
	if(eleStr=="reset"){
			var element = document.getElementById("reset");
			element.style.marginLeft= "0px";
			element.style.display = "inline-block";
	}
}
function setTd(groupIndex, className, innerHTML){
 //var e = document.getElementsByClassName("group"+groupIndex);
 var x = document.getElementById(groupIndex+":1");
 var y = document.getElementById(groupIndex+":2");
 x.className = className;
 y.className = className;
 x.innerHTML = innerHTML;
 y.innerHTML = innerHTML;
 /*for(var i=0; i<e.length ; i++){
	e[i].className = className;
	e[i].innerHTML = innerHTML;
 }*/
}
function addTd(groupIndex, className, innerHTML){
 var e = document.getElementsByClassName("group"+groupIndex);
 for(var i=0; i<e.length ; i++){
	e[i].className += className;
	e[i].innerHTML += innerHTML;
 }
}
function increase(){
 x=document.getElementById("navbar");
 y=document.getElementById("arrow");
 z=document.getElementById("tick");
 a=document.getElementById("cross");
 b=document.getElementById("reset");
 
 rotate("arrow",-11.25 * count);
 count++;
 x.style.marginLeft=(j-300)+"px";
 y.style.marginLeft=k+"px";
 z.style.marginLeft=(k-250)+"px";
 a.style.marginLeft=(k-200)+"px";
 b.style.marginLeft=(k-250)+"px";

 k+=15.625;
 j+=18.75;
}
function decrease(){
 x=document.getElementById("navbar");
 y=document.getElementById("arrow");
 z=document.getElementById("tick"); 
 a=document.getElementById("cross");
 b=document.getElementById("reset");

 rotate("arrow",-11.25 * count);
 x.style.marginLeft=j+"px";
 y.style.marginLeft=(250+k)+"px";
 z.style.marginLeft=k+"px";
 a.style.marginLeft=(50+k)+"px";
 b.style.marginLeft=k+"px";

 count--;
 k-=15.625;
 j-=18.75;
}
function toggle(){
 x=document.getElementById("navbar");

 if(x.style.marginLeft=="-300px"){
	j = 0;
	k = 0;
	count = 0;
	for(var i=0;i<=16;i++){
		setTimeout("increase()",i*12.5);
	}
 }
 else{
	j = 0;
	k = 0;
	count = 16;
	for(var i=0;i<=16;i++){
		setTimeout("decrease()",i*12.5);
	}
 }
}
var timeouts =[];
function reset_rotate(){
	var rot = 22.5;
	for(var i=0; i<=16; i++){
		timeouts.push(setTimeout("rotate(\"reset\","+ (i*rot) +")",i*31.25));
	}
}
function stop_reset_rotate(){
	for(var i =0; i<timeouts.length ; i++){
		clearTimeout(timeouts[i]);
	}
	timeouts = [];
}

function addCourse(index){
 var x = document.getElementById(index+"");
 x.className += " selected";
 addTd( groupIndexes[index-1], " selected", elements[index-1]+" ")
/* var e = document.getElementsByClassName("group"+groupIndexes[index-1]);
 for(var i=0;i<e.length; i++){
	e[i].className+=" selected";
	e[i].innerHTML+=elements[index-1]+" ";
 }*/
 addInfo(index);
}
function deleteCourse(index){
 var x = document.getElementById(index+"");
 x.className = "options";
 var g="group"+groupIndexes[index-1];

 setTd(groupIndexes[index-1], g , "");
/*
 var e = document.getElementsByClassName(g);
 for(var i=0;i<e.length; i++){
	e[i].className = g;
	e[i].innerHTML="";
 }*/
 removeInfo(index-1);
}
function addCollision(index){
 var x = document.getElementById(index+"");
 x.className += " selected";

 addTd( groupIndexes[index-1], " collision", elements[index-1]+" ")
 /*var e = document.getElementsByClassName("group"+groupIndexes[index-1]);
 for(var i=0;i<e.length; i++){
	e[i].className += " collision";
	e[i].innerHTML+=elements[index-1]+" ";
 }*/
}
function deleteCollision(index){
 //Color back to normal in the NavBar
 var x = document.getElementById(index+"");
 x.className = "options";

 //Restore td styling and remove text
 var g="group"+groupIndexes[index-1];
 setTd(groupIndexes[index-1], g , "");
 /*var e = document.getElementsByClassName(g);
 for(var i=0;i<e.length; i++){
	e[i].className = g;
	e[i].innerHTML="";
 }*/
 
 var toSplice = new Array();
 var toColor = new Array();
 var newSelectedCourses = new Array();
 // Get all clashing courses
 for(var i=0; i< selectedCourses.length; i++){
	if(groupIndexes[index-1]==groupIndexes[selectedCourses[i]] && (index-1)!=selectedCourses[i]){
		toSplice.push(i);
		toColor.push(selectedCourses[i]);
	}	
 }
 //Remove from Selected Courses Array
 for (var i=0; i<toSplice.length; i++){
	selectedCourses[toSplice[i]]=0;
 }
 for(var i =0; i<selectedCourses.length; i++){
	if(selectedCourses[i]!=0){
		newSelectedCourses.push(selectedCourses[i]);
	}
 }
 selectedCourses = newSelectedCourses;

 // Color the removed courses again
 for (var i=0; i<toColor.length; i++){
	color(toColor[i]+1);
 }
}
function color(indexCourseSelect){
 var present = 0;
 var collision =0;
 var tempIndex = -1;
 for(var i=0 ;i<selectedCourses.length ; i++){
	if(selectedCourses[i]==indexCourseSelect-1){
		present=1;
		tempIndex=i;
	}
	if(groupIndexes[selectedCourses[i]]==groupIndexes[indexCourseSelect-1] && selectedCourses[i]!=indexCourseSelect-1){
		collision=1;
	}
 }
 
 if(present==1 && collision==1){
	//Remove text for only the un-clicked Course
	//splice must happen before call to deleteCollision()
 	selectedCourses.splice(tempIndex,1);
	deleteCollision(indexCourseSelect);
 }
 else if(present==0 && collision==1){  //Selected new course and collision happening
	selectedCourses.push(indexCourseSelect-1);
	collisionCourses.push(indexCourseSelect-1);
	addCollision(indexCourseSelect);
 }
 else if(present==1 && collision==0){ // Unclick without any collisions
	deleteCourse(indexCourseSelect);
	selectedCourses.splice(tempIndex,1);
 }
 else{ // Course selected, no collisions
	selectedCourses.push(indexCourseSelect-1);
	addCourse(indexCourseSelect);
 }

}
function clearall(){
	//Clear TD elements of the table
	for(var i=1 ; i<=9 ; i++){
		var x = document.getElementById(i+":1");
		var y = document.getElementById(i+":2");
		x.className = "group"+i;
		y.className = "group"+i;
		x.innerHTML = "";
		y.innerHTML = "";
	}
	//Clear the navbar elements
	for(var i =1; i<=34;i++){
		var x = document.getElementById(i+"");
		x.className = "options";
	}
	
	for(var i=0 ; i<selectedCourses.length; i++){
		removeInfo(selectedCourses[i]);
	}
	selectedCourses = new Array();
	collisionCourses = new Array();
}
function addInfo(index){
 var x = document.getElementsByClassName("group"+groupIndexes[index-1]);
 var ele = document.getElementById("infobar");
 for(var a=0 ; a< x.length ; a++){
	x[a].onmousemove = function(e) {
		ele.className="infobar-shown";
		ele.style.top = e.pageY*1 + 15 + "px";
		ele.style.left = e.pageX*1 + 15 + "px";
	};
	x[a].onmouseout = function(e) {
		ele.className="infobar-hidden";
		ele.innerHTML="";
	};
	x[a].onmouseover = function(e) {
		ele.innerHTML = document.getElementById(""+index).innerHTML;
		ele.innerHTML += "<br><br>"+profs[index-1];
	};
 }
}
//Takes input index as, the real index and not index-1
function removeInfo(index){
 var x = document.getElementsByClassName("group"+groupIndexes[index]);
 var y = document.getElementById("infobar");
 y.className="infobar-hidden";
 y.innerHTML="";
 for(var a=0 ; a< x.length ; a++){
	x[a].onmousemove = "";
	x[a].onmouseout = "";
	x[a].onmouseover = "";
	x[a].innerHTML = "";
 }
}
function finish(){
	//Remove rotation
	document.getElementById("reset").onmouseover = function(){};
	if(finish_without_posting()!=-1){
		toggle();
		post_to_url();
	}
	else// Cannot POST so restore rotation
		document.getElementById("reset").onmouseover = reset_rotate; 
	
}
function finish_without_posting(){
	var groups = new Array(0,0,0,0,0,0,0,0,0);
	for(var i=0; i<selectedCourses.length ;i++){
		var tmp = groupIndexes[selectedCourses[i]];
		groups[tmp-1]++;
	}
	var zeros = 0;
	for(var i=0; i<9 ; i++){
		if(groups[i]>1){
			alert("First resolve all clashes in timetable!");
			return -1;
		}
		else if(groups[i]==0){
			zeros++;
		}
	}
	if(zeros==9){
		alert("Select courses to form your timetable.");
		return -1;
	}
	for(var i=0; i<9 ; i++){
		if(groups[i]==1){
			var x = document.getElementById((i+1)+":1");
			var y = document.getElementById((i+1)+":2");
			x.className = "final"+(i+1);
			y.className = "final"+(i+1);
		}
	}
	//Start freezing
	//Remove Cross
	document.getElementById("cross").style.display = "none";
	//Remove Tick
	document.getElementById("tick").style.display = "none";
	//Freeze changes in navbar
	for(var i=1;i<34;i++){
		document.getElementById(""+i).onclick = "";
	}
	//Add reset
	document.getElementById("reset").style.display = "inline-block";
	return 1;
}
function courses_from_index(){
	var coursesStr = "";
	for(var i=0; i<selectedCourses.length ; i++){
		if(i!=selectedCourses.length-1)
			coursesStr+=elements[selectedCourses[i]]+":";
		else
			coursesStr+=elements[selectedCourses[i]];
	}
	return coursesStr;
}

function courses_from_string(){
	var tempArray = storedCourses.split(":");
	var newSelectedCourses = new Array();
	for(var i=0 ; i<elements.length ; i++){
		for(var a =0 ; a< tempArray.length; a++){
			if(tempArray[a]==elements[i])
				newSelectedCourses.push(i);
		}
	}
	return newSelectedCourses;
}
function post_to_url() {
    method = "post";
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", "/");

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "courses");
    hiddenField.setAttribute("value", courses_from_index());
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    form.submit();
}
function reset(){
	stop_reset_rotate();
	//Remove reset
	document.getElementById("reset").removeAttribute('style');
	//Add cross
	document.getElementById("cross").style.display = "inline-block";
	//Add tick
	document.getElementById("tick").style.display = "inline-block";
	//Unfreeze navbar
	for(var i=1;i<34;i++){
		document.getElementById(i+"").onclick = function(e){
			var targ;
			if (!e) var e = window.event;
			if (e.target) targ = e.target;
			else if (e.srcElement) targ = e.srcElement;
			color(targ.id);
		};
	}
	//reset td classes back to selected
	for(var i = 0; i<selectedCourses.length ; i++){
		var groupIndex = groupIndexes[selectedCourses[i]];
		var x = document.getElementById(groupIndex+":1");
		var y = document.getElementById(groupIndex+":2");
		x.className = "group" + i + " selected";
		y.className = "group" + i + " selected";
	}
}
function assignId(){
	for(var i=1 ; i<=9 ; i++){
		var temp = document.getElementsByClassName("group"+i);
		temp[0].id = i+":1";
		temp[1].id = i+":2";
	}
}