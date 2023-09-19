import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://realtime-database-e3e26-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

//line 1-10 is mandatory firebase code, where shoppingList is the name of DB

const inputEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addBtn.addEventListener("click", function(){
    let inputValue = inputEl.value

    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot){
    
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()
        for(let i=0; i<itemsArray.length; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]    

            appendItemToShoppingListEl(currentItem)
        }
    }else{
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl(){
    inputEl.value = ""
}

function appendItemToShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}





//Firebase code
/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "---COPY REFERENCE URL from FIREBASE" 
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
*/


//Removing through ID in DB
/*
newEl.addEventListener("dblclick", function() {
        let exactLocationOfStoryInDB = ref(database, `newsStories/${storyID}`)
        
        remove(exactLocationOfStoryInDB)
    })
*/