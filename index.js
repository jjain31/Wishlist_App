let todoInput=document.querySelector(".input");
let addTodoButton=document.querySelector(".button");
let todoListall=document.querySelector(".todos-container");
let text;
let localdata=JSON.parse(localStorage.getItem("todo"));
let todolist=localdata||[];
function generateUUID() {
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
     var r = Math.random() * 16 | 0,
       v = c === 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
   });
 }
 
function addTodo(e){
   e.preventDefault();
   text=todoInput.value;
   if(text.length>0){
      todolist.push({id:generateUUID(),todo:text,isCompleted:false});
   }
   renderTodoList(todolist);
   localStorage.setItem("todo",JSON.stringify(todolist));
   todoInput.value="";
 

}

function renderTodoList(todolist){
   todoListall.innerHTML=todolist.map(({id,todo,isCompleted})=> `<div class=" todo relative"><input id="item-${id} class="t-checkbox" ${isCompleted?"checked":""} type="checkbox" data-key=${id}><label class="todo todo-text t-pointer ${isCompleted?"checked-todo":""}" data-key=${id} for="item-${id}">${todo}</label><button class="absolute right-0 button cursor del-btn "><span  data-todokey=${id} class="material-symbols-outlined">
delete
</span></button></div>`)
}
todoListall.addEventListener("click",(e)=>{
let key=e.target.dataset.key;
let detTodokey=e.target.dataset.todokey;
todolist=todolist.map(todo=>todo.id===key?{...todo,isCompleted:!todo.isCompleted}:todo);
todolist=todolist.filter(todo=>todo.id!=detTodokey);
renderTodoList(todolist);
localStorage.setItem("todo",JSON.stringify(todolist));
});
addTodoButton.addEventListener("click",addTodo);