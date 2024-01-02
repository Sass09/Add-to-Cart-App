
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-255ee-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)

const database = getDatabase(app)
const shoppinglistInDB = ref(database, "shoppingList")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    push(shoppinglistInDB, inputValue)

    inputClear()
 
})


onValue(shoppinglistInDB, function(snapshot){

    if (snapshot.exists()){

    let shoppinglistArray = Object.entries(snapshot.val())
  
    clearShoppingList()

        for (let i=0; i< shoppinglistArray.length; i++){
            let currentItem = shoppinglistArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            appendItemToShoppingListEl(currentItem)

        }
   }   else {
    shoppingListEl.innerHTML = "No items have been added yet...."
}

})





function clearShoppingList(){
shoppingListEl.innerHTML = ""
}


function inputClear(){
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl (item){
    
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

newEl.addEventListener("click", function(){
    let exactLocationOfIteminDB = ref(database,`shoppingList/${itemID}`)
    remove(exactLocationOfIteminDB)
})


    shoppingListEl.append(newEl)


}