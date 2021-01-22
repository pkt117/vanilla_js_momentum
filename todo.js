const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = "toDos";

let toDos = [];



function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDos){
        return toDos.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}


function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    // 로컬스토리지는 무조건 string 형태로 저장되므로 오브젝트 형식의 toDos를 string 형으로

}


function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj ={
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
   
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
   
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if ( loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // 오브젝트형으로 변환
        // forEach는 각각의 array의 요소마다 함수실행
        parsedToDos.forEach(function(toDos){
            paintToDo(toDos.text);
        });
    }else{

    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();