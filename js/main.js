var rowId = 0




document.getElementById("petsave-button").onclick = function () {
    
   
    
    rowId++
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
        localityInput: document.getElementById("locality-input").value
    }

    

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

}

