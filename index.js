const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list=JSON.parse(localStorage.getItem("list"));

list.forEach(task => {
  toDoList(task);
})

formEl.addEventListener("submit", (event)=> {
  event.preventDefault(); //submit:no refresh
  toDoList();
});

function toDoList(task){

  let newTask = inputEl.value;
  if(task){
    newTask = task.name
  }

  const liEl = document.createElement("li");
  
  if(task && task.checked){
    liEl.classList.add("checked");
  }

  liEl.innerText = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = "";

  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = ` <i class="fas fa-check"></i>`;
  liEl.appendChild(checkBtnEl);

  const trashEl = document.createElement("div");
  trashEl.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
  liEl.appendChild(trashEl);

  checkBtnEl.addEventListener("click", ()=> {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });
  trashEl.addEventListener("click", ()=> {
    liEl.remove();
    updateLocalStorage();
  });

  updateLocalStorage();
};

function updateLocalStorage(){
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach(liEl => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked")
      //The contains() method is used to check whether the specified class exist in the CSS classes and with respect to it, it returns the Boolean value as true or false.
    })
  })
  localStorage.setItem("list", JSON.stringify(list))
}