/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 /*define function for multidivs*/
 /*var popup = document.createElement('div'); //div
// var columndiv = document.createElement('div'); 
           popup.className ="popup";
       //    var innercol =["col1","col2","col3"];
       var innercol =["col1","col2","col3","col4"];
         for (j=0;j<3;j++){
         var colone = document.createElement('div'); //div
         var imgcol = document.getElementById("col4");
         var colimg=document.createElement('img');
     colimg.className= "col4";
         colimg.src="images/blackarrow.png";
          colone.className=innercol[j];
             popup.appendChild(colone);
                 
            
               }
               popup.appendChild(colimg);
function multidivs(){
    var columnnames=["arrowdiv","contentdiv","ccontentdiv","rcontentdiv"];//styles for innerdiv
    var columnids=["arrow", "content", "ccontent", "rcontent"];
    var rows=100;
    var col = 4;
 //var columndiv = document.createElement('div'); 
     for( x=0; x<rows;x++) {
     var row= document.createElement('div');
      row.className = "innerdiv";
      //define for the inner divs to be created as columnd
  
      for(var i=0; i<col; i++){
          var columndiv = document.createElement('div'); //div
           columndiv.className =columnnames[i];
           columndiv.id=columnids[i];
           
          
            // columndiv.innerHTML="ok2";      
       columndiv.innerHTML="cell"+i; 
         
           //attach arrow image
          if(columndiv.className=== columnnames[0]){
              attachImage(columndiv);
            
               }
                               
           
         row.appendChild(columndiv);
              
        }
    document.getElementById('leftdiv').appendChild(row);
       }
      //  alert("total rows"+x);
    }
  //attach arrow image onload and thn on mouseover and mouseout
 function attachImage(columndiv){
     var img =document.createElement('img');
       img.className= "imgdiv";
        img.src="images/orangearrow.png";
      columndiv.appendChild(img);
      
     domouseover(); /*this will change the arrow directions and also add popup*/
     /*  domouseout();/*take out popup*/
       //onmouseover changes the arrow
    /*   function domouseover(){
       columndiv.addEventListener("mouseover", function(){
                img.src="images/whitearrow.png";
               columndiv.appendChild(img);
               
                columndiv.appendChild(popup);
                }); }
           
             function domouseout(){
               columndiv.addEventListener("mouseout", function(){
                 img.src="images/orangearrow.png";
                 columndiv.removeChild(popup);
             });   }
                  
        
         }*/


         
//upload image
 function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}
