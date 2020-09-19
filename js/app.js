//DEFINE UI ELEMENTS

let form = document.querySelector('#task_form')
let taskinput = document.querySelector('#new_task')
let taskList = document.querySelector('ol')
let filter = document.querySelector('#filter_task')
let clearTasks = document.querySelector('#clear_task')

//DEFINE EVENT LISTNER

form.addEventListener('submit', addTask)
taskList.addEventListener('click', removeTask)
clearTasks.addEventListener('click', clearTask)
filter.addEventListener('keyup', filterTask)
document.addEventListener('DOMContentLoaded', getTasks)



// DEFINE FUNCTIONS


//ADD A TASK
function addTask(e) {
    if (taskinput.value === '') {
        alert('Please Add a Task')
    } else {
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(taskinput.value + ' '))
        let list = document.createElement('a')
        list.setAttribute('href', '#')
        list.innerHTML = 'x'
        li.appendChild(list)
        taskList.appendChild(li)

        storeTaskLocalStorage(taskinput.value) //STORE IN LOCAL STORAGE

        taskinput.value = ''
    }
    e.preventDefault()
}

// REMOVE A TASK
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        let rmv = e.target.parentElement
        rmv.remove()

        removefromLocalStorage(rmv)
    }

}

// CLEAR ALL TASKS
function clearTask(e) {
    if (confirm('Are you sure to remove all the task?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
        }
    }
    // CLEAR ALL FROM LOCAL STORAGE
    localStorage.clear()

}
// FILTER TASKS
function filterTask(e) {
    let text = e.target.value.toLowerCase()
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

// LOCAL STORAGE MANUPULATION

// STORE IN LOCAL STORAGE
function storeTaskLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// GET LOCAL STORAGE DATA
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(task => {
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(task + ' '))
        let list = document.createElement('a')
        list.setAttribute('href', '#')
        list.innerHTML = 'x'
        li.appendChild(list)
        taskList.appendChild(li)
    })
}

// REMOVE FROM LOCAL STORAGE
function removefromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    let li = taskItem
    li.removeChild(li.lastChild) //REMOVE a TAG

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}