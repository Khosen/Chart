

function domouseover(){

    var cell = document.getElementById("popCell");
    var tab = document.createElement("table");
    var newtr = document.createElement("tr");
    var newtd = document.createElement("td");
    var newtbody = document.createElement("tbody");
    tab.className="popup";
    
    cell.addEventListener("mouseover", function(){
             img.src="images/whitearrow.png";
            newtr.appendChild(newtd);
            newtbody.appendChild(newtr);
            tab.appendChild(newtbody);
            

            cell.appendChild(img);
            
             cell.appendChild(tab);
             }); }
        
       /*   function domouseout(){
            columndiv.addEventListener("mouseout", function(){
              img.src="images/orangearrow.png";
              columndiv.removeChild(popup);
          });   }
               
     
      }
      var popup = document.createElement('div'); //div
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
*/