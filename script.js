const tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

let dragElement;

const addTask = document.querySelector("#addTask");
const addNewTask = document.querySelector("#add-new-task");

const modal = document.querySelector(".modal");
const bg = document.querySelector(".bg");


// 🔥 FUNCTION TO UPDATE STORAGE + COUNT
function updateStorage() {
  let allcol = [todo, progress, done];

  allcol.forEach((col) => {
    const alltasks = col.querySelectorAll(".task");

    tasksData[col.id] = Array.from(alltasks).map((t) => ({
      title: t.querySelector("h2").innerText,
      desc: t.querySelector("p").innerText
    }));

    const count = col.querySelector(".Count");
    if (count) count.innerText = alltasks.length;
  });

  localStorage.setItem("tasks", JSON.stringify(tasksData));
}


// 🔥 LOAD FROM LOCAL STORAGE
if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));

  for (let col in data) {
    const column = document.querySelector(`#${col}`);

    data[col].forEach((task) => {
         if (!task) return; 

      const newtask = document.createElement("div");
      newtask.classList.add("task");
      newtask.setAttribute("draggable", "true");

      newtask.innerHTML = `
        <h2>${task.title}</h2>
        <p>${task.desc}</p>
        <button>Delete</button>
      `;

      column.appendChild(newtask);

      // DRAG EVENT
      newtask.addEventListener("dragstart", () => {
        dragElement = newtask;
      });

      // DELETE EVENT
      newtask.querySelector("button").addEventListener("click", () => {
        newtask.remove();
        updateStorage();
      });
    });
  }
}


// 🔥 DRAG EVENTS FOR EXISTING TASKS
document.querySelectorAll(".task").forEach((task) => {
  task.addEventListener("dragstart", () => {
    dragElement = task;
  });
});


// 🔥 COLUMN DRAG LOGIC
function addDragEventToColumns(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hoverover");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("hoverover");
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();

    if (dragElement) {
      column.appendChild(dragElement);
      column.classList.remove("hoverover");
      updateStorage(); // 🔥 SAVE AFTER DROP
    }
  });
}

addDragEventToColumns(todo);
addDragEventToColumns(progress);
addDragEventToColumns(done);


// 🔥 OPEN MODAL
addTask.addEventListener("click", () => {
  modal.classList.add("active");
});

// 🔥 CLOSE MODAL
bg.addEventListener("click", () => {
  modal.classList.remove("active");
});


// 🔥 ADD NEW TASK
addNewTask.addEventListener("click", () => {
  const title = document.querySelector("#add-title").value;
  const desc = document.querySelector("#add-desc").value;



  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("draggable", "true");

  task.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <button>Delete</button>
  `;

  todo.appendChild(task);

  // DRAG
  task.addEventListener("dragstart", () => {
    dragElement = task;
  });

  // DELETE
  task.querySelector("button").addEventListener("click", () => {
    task.remove();
    updateStorage();
  });

  // CLEAR INPUT
  document.querySelector("#add-title").value = "";
  document.querySelector("#add-desc").value = "";

  modal.classList.remove("active");

  updateStorage(); // 🔥 SAVE AFTER ADD
});