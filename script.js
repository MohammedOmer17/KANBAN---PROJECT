const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done  = document.querySelector('#done');
let dragElement  = null;
const addTask = document.querySelector("#addTask");

const tasks = document.querySelectorAll('.task');
tasks.forEach(task =>{
    task.addEventListener("drag",(e)=>{
        dragElement=task;
    })
})

function  addDragEventToColumns(column){
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hoverover");
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hoverover");
    })
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove("hoverover");
    })
}

addDragEventToColumns(todo);
addDragEventToColumns(progress);
addDragEventToColumns(done);

const modal = document.querySelector(".modal");
const bg = document.querySelector(".bg");

addTask.addEventListener("click", ()=>{
    modal.classList.toggle ("active");
})

bg.addEventListener("click",()=>{
    modal.classList.remove("active");
})