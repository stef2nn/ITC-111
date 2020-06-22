// Selecting Elements
const clear = document.querySelector(".clear"); //selects clear button
const dateElement = document.getElementById("date"); // shows todays date
const list = document.getElementById("list"); // where to-do items live
const input = document.getElementById("input");  // get user input

// Classes' Name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// Get item from localStorage
let data = localStorage.getItem("TODO");

// check if data is empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set id to last in list
    loadList(LIST); // load list into the content section
}else{
    // if data is empty 
    LIST = [];
    id = 0;
}

// load item to user content section
function loadList(array){
    array.forEach(function(item){
        addTODO(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});  // Ended first class here

// Show today's date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do
function addToDo(toDo, id, done, trash){
    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>`
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//after entering a todo item you will need to press enter to add the item
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
                LIST.push({
                    name : toDo,
                    id : id,
                    done : false,
                    trash : false
                });
                // add the item to localStorage. MUST BE ADDED WHERE LIST ARRAY IS UPDATED.add-to-do
                localStorage.setItem("TODO", JSON.stringify(LIST));
                id++;
        }
        input.value = "";
    }
});

// complet to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;  
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event) {
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    if(elementJob == "complete") {
        completeToDo(element)
    }else if(elementJob == "delete"){
        removeToDo(element)
    }
});