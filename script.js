const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done  = document.querySelector('#done');
let dragElement  = null;
const addTask = document.querySelector("#addTask");
const addNewTask = document.querySelector("#add-new-task");
const deleteBtn = document.querySelector("#delete-btn");


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
            let allcol = [todo,progress,done];
    allcol.forEach(col => {
        const alltasks = col.querySelectorAll(".task");
        const count  = col.querySelector(".Count");
        count.innerHTML = alltasks.length;
    })
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

addNewTask.addEventListener("click", (dets)=>{
const title = document.querySelector("#add-title").value;

const desc = document.querySelector("#add-desc").value;

const task = document.createElement("div");
task.classList.add("task");
task.setAttribute("draggable","true");

task.innerHTML = `
<h2>${title}</h2>
<p>${desc}</p>
<button>Delete</button>
`

task.addEventListener("drag" , ()=>{
    dragElement = task;
})

todo.appendChild(task);
modal.classList.remove("active");

})


deleteBtn.addEventListener("click", (dets)=>{
    task = document.querySelector(".task");
    
})