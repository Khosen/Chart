/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 /*define function for multidivs*/
 var popup = document.createElement('div'); //div
 // var columndiv = document.createElement('div'); 
            popup.className ="popup";
            var table = document.createElement('table');
            var tbody = document.createElement('tbody');
            var tr = document.createElement('tr');
             var td = document.createElement('td');
             var td1 = document.createElement('td');
              var td2 = document.createElement('td');
               var td3 = document.createElement('td');
               
        
          var colimg=document.createElement('img');
           colimg.className= "col4";
          colimg.src="images/blackarrow.png";
         
                  
               td.className="col1";
               td1.className="col2";
               td2.className="col3";
               td3.appendChild(colimg);
             //  td3.className = "col4";
             //  td3.src= "images/blackarrow.png";
               
               tr.appendChild(td);
               tr.appendChild(td1);
               tr.appendChild(td2);
               tr.appendChild(td3);
              // tr.appendChild(td3);
               tbody.appendChild(tr);
               table.appendChild(tbody);
               popup.appendChild(table);
            