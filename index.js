const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list_container");

function addTask(){
    if (inputBox.value === "")
    {
        alert("you must add the task");
    }
    else{
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.insertBefore(li, listContainer.firstChild);
        let span = document.createElement('span');
        span.innerHTML = "\u00d7" ;
        li.appendChild(span);
    }
    inputBox.value = " ";
    saveData();
}

listContainer.addEventListener("click" , function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle('checked');

        if (e.target.classList.contains('checked')) {
            // Move completed task to bottom
            listContainer.appendChild(e.target);
        } else {
            // Move uncompleted task to top
            listContainer.insertBefore(e.target, listContainer.firstChild);
        }

        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (inputBox.value.trim() !== "") {
            addTask(); // <-- function to create and append the new task
            inputBox.value = ""; // clear input
            saveData(); // optionally save
        }
    }
});

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML)
}

function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();