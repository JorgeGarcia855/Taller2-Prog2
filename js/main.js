$(document).ready(function(){
   $("body").hide().fadeIn(3000); 
});

$(document).ready(function(){ 
    $("#petedit-button").click(function(){ 
        $(this).next('#editpet').slideToggle();
        $(this).toggleClass('active');  


    });

});

var rowId = 0

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
const dbName = "petDB";

var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
  console.log("Database error");
};
request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("pets", { keyPath: "id" });
  objectStore.createIndex("petNameInput", "petNameInput", { unique: false });
};

var request = indexedDB.open(dbName, 2);
request.onsuccess = function(event) {
	var db = event.target.result;
	var tx = db.transaction("pets");
	var objectStore = tx.objectStore("pets");
	objectStore.getAll().onsuccess = function(event) {
	  //console.log(event.target.result);
	  rowId = event.target.result.length;
	};
};

$(document).ready(function() {
    $(document).on('submit', '#pet-form', function() {
        rowId++
        let fecha = new Date();
        let pet = {
            dateInput: document.getElementById("date-input").value,
            ownerInput: document.getElementById("owner-input").value,
            petNameInput: document.getElementById("petname-input").value,
            microchipInput: document.getElementById("mc-input").value,
            petSpeciesInput: document.getElementById("petspecies-input").value,
            petSexInput: document.getElementById("petsex-input").value,
            petSizeInput: document.getElementById("petsize-input").value,
            dangerInput: document.getElementById("danger-input").value,
            sterilizedInput: document.getElementById("sterilized-input").value,
            localityInput: document.getElementById("locality-input").value,
            LastModification:fecha.toLocaleString()
        }
        
        var request = indexedDB.open(dbName, 2);
        request.onsuccess = function(event) {
            var db = event.target.result;
            var customerObjectStore = db.transaction("pets", "readwrite").objectStore("pets");
           pet["id"] = rowId;
           customerObjectStore.add(pet);
        };
    
        let tr = document.createElement("tr")
        tr.setAttribute("id", "row-" + rowId)
    
        let tdId = document.createElement("td")
        tdId.innerHTML = rowId
        tr.appendChild(tdId)
    
        Object.keys(pet).forEach((key) => {
            let td = document.createElement("td")
            td.innerHTML = pet[key]
            tr.appendChild(td)
        })
    
    
        let editmicrochip = document.createElement("td");
            console.log(document.getElementById("mc-input").value);
            console.log(document.getElementById("sterilized-input").value);
        if(document.getElementById("mc-input").value!=""){
            editmicrochip.innerHTML=fecha.toLocaleString();
            tr.appendChild(editmicrochip);
        }else{
            editmicrochip.innerHTML="";
            tr.appendChild(editmicrochip);
        }
    
        let editesterilizacion=document.createElement("td");
    
        if(document.getElementById("sterilized-input").value=="Si"){
            editesterilizacion.innerHTML=fecha.toLocaleString();
             tr.appendChild(editesterilizacion);
        }else{
            editesterilizacion.innerHTML="";
             tr.appendChild(editesterilizacion);
        }
        let tdActions = document.createElement("td")
        let input = document.createElement("input")
        
        input.setAttribute("id", "delete-" + rowId)
        input.setAttribute("type", "button")
        input.value = "Eliminar"
        input.onclick = function () {
            let id = this.getAttribute("id")
            id = +id.replace("delete-", "")
        
            document.getElementById("row-"+ id).remove()
        }
    
        tdActions.appendChild(input)
        tr.appendChild(tdActions)
        document.getElementById("body-table").appendChild(tr)
    
        let tdActions2 = document.createElement("td");
        var img = document.createElement('img');
        
        if (document.getElementById("petspecies-input").value == "Canino") {
            img.setAttribute('id', 'dog-image')
            fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => {
                img.setAttribute("src", data.message);
                tdActions2.appendChild(img)
                tr.appendChild(tdActions2)
                document.getElementById("body-table").appendChild(tr)
            });
            
        } else {
            img.setAttribute('id', 'cat-image')
            fetch('https://api.thecatapi.com/v1/images/search')
            .then(response => response.json())
            .then(data => {
                img.setAttribute("src", data[0].url);
                tdActions2.appendChild(img)
                tr.appendChild(tdActions2)
                document.getElementById("body-table").appendChild(tr)
            });
        }
      return false;
     });
})

function habilitarMicrochip(){

    let  id= document.getElementById("mcedit-input").value;

    if(document.getElementById("body-table").rows[id-1].cells[4].innerText==""){
        document.getElementById("Microchipnew-inputtext").disabled= false;
    }
    else{
        document.getElementById("Microchipnew-inputtext").disabled= true;
    }
}
document.getElementById("mcedit-input").addEventListener("change", habilitarMicrochip);

function habilitarEsterilizacion(){
    let  id= document.getElementById("mcedit-input").value;

    if(document.getElementById("body-table").rows[id-1].cells[9].innerText=="No"){
        document.getElementById("Esterilizadonew-select").disabled= false;
    }
    else{
        document.getElementById("Esterilizadonew-select").disabled= true;
    }
}

document.getElementById("mcedit-input").addEventListener("change", habilitarEsterilizacion);

document.getElementById("savechanges-button").onclick=function(){
    let fecha1 = new Date(); 
    let  id= document.getElementById("mcedit-input").value;

    document.getElementById("body-table").rows[id-1].cells[7].innerHTML=document.getElementById("petsizeedit-input").value;
    document.getElementById("body-table").rows[id-1].cells[8].innerHTML=document.getElementById("dangeredit-input").value;
    document.getElementById("body-table").rows[id-1].cells[10].innerHTML=document.getElementById("localityedit-input").value;
    document.getElementById("body-table").rows[id-1].cells[11].innerHTML=fecha1.toLocaleString();

    if(document.getElementById("body-table").rows[id-1].cells[4].innerHTML==""){
        document.getElementById("body-table").rows[id-1].cells[4].innerHTML=document.getElementById("Microchipnew-inputtext").value;
        document.getElementById("body-table").rows[id-1].cells[12].innerHTML=fecha1.toLocaleString();
    }
    if(document.getElementById("body-table").rows[id-1].cells[9].innerHTML=="No"){
        document.getElementById("body-table").rows[id-1].cells[9].innerHTML=document.getElementById("Esterilizadonew-select").value;
        if(document.getElementById("Esterilizadonew-select").value=="Si")
        document.getElementById("body-table").rows[id-1].cells[13].innerHTML=fecha1.toLocaleString();

    }
}

