// UI VARIABLES.
const clearButton = document.querySelector('.tasks-clear');
const filterInput = document.querySelector('.filter');
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('.task-input');
const tasksList = document.querySelector('.tasks-list');

function loadEventListeners() {
  try {
    // EVENTS.
    // Add 'GET TASKS FROM LOCAL STORAGE' event.
    document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);

    // Add 'ADD TASK' event.
    form.addEventListener('submit', addTask);

    // Add 'DELETE TASK' event on ALL document body (later in 'deleteTask()' we specifies the target).
    document.body.addEventListener('click', deleteTask);

    // Add 'CLEAR TASK LIST' event.
    clearButton.addEventListener('click', clearTasksList);

    // Add 'FILTER TASKS' event.
    filterInput.addEventListener('input', filterTasks);

    // FUNCTIONS.
    // Get tasks from Local Storage.
    function getTasksFromLocalStorage() {
      try {
        let tasks;

        // Checking if we already have this key 'tasks' in LS.
        if (localStorage.getItem('tasks') !== null) {

          // If YES - getting the data from it. 
          // REMEMEBER - Local Storage can store ONLY 'STRING' type of data. We need to convert this string into object at first.
          tasks = JSON.parse(localStorage.getItem('tasks'));

          // Then we loops through the task list from Local Storage and insert all tasks from it into the DOM.
          tasks.forEach((task) => {
            // Create 'li' element.
            const li = document.createElement('li');

            // Add a class for new 'li' element.
            li.className = 'tasks-list-item';

            // Add an icon (html-element) into 'li' element.
            li.innerHTML = '<i class="fas fa-times"></i>';

            // Create text node, insert in it value from task list.
            const textNode = document.createTextNode(task);

            // Push this node to 'li' element.
            li.appendChild(textNode);

            // Append 'li' element to 'ul' (basically add task to task list).
            tasksList.appendChild(li);
          });
        } else {
          // If NO - just stop this function.
          return;
        };
      } catch (err) {
        console.error(`getTasksFromLocalStorage(): ${err}`);
      };
    };

    // Add task in list.
    function addTask(event) {
      try {
        // Create 'li' element.
        const li = document.createElement('li');

        // Add a class for new 'li' element.
        li.className = 'tasks-list-item';

        // Add an icon (html-element) into 'li' element.
        li.innerHTML = '<i class="fas fa-times"></i>';

        // Create text node, insert in it value from 'new task' input.
        const textNode = document.createTextNode(taskInput.value);

        // Push this node to 'li' element.
        li.appendChild(textNode);

        // Append 'li' element to 'ul' (basically add task to task list).
        tasksList.appendChild(li);

        // Store data in Local Storage.
        storeTaskInLocalStorage(taskInput.value);

        // Clear the 'new task' input.
        taskInput.value = '';

        // Page always reloading after data submit in form, but we don't need that. So we stopped this default behaviour.
        event.preventDefault();
      } catch (err) {
        console.error(`addTask(): ${err}`);
      };
    };

    // Store task in Local Storage.
    function storeTaskInLocalStorage(task) {
      try {
        let tasks;

        // Checking if we already have this key 'tasks' in LS.
        if (localStorage.getItem('tasks') === null) {
          // If NO - then create new empty array with key 'tasks'.
          tasks = [];
        } else {
          // If YES - getting the data from it. 
          // REMEMEBER - Local Storage can store ONLY 'STRING' type of data. We need to convert this string into object at first.
          tasks = JSON.parse(localStorage.getItem('tasks'));
        };

        // Receiving input data from function 'addTask()' and pushing it to array. 
        tasks.push(task);

        // Converting object back to string and set it in Local Storage.
        localStorage.setItem('tasks', JSON.stringify(tasks));

        console.log(tasks);
      } catch (err) {
        console.error(`storeTaskInLocalStorage(): ${err}`);
      };
    };

    // Delete ONE targeted task from task list.
    function deleteTask(event) {
      try {
        // Event fires off if we click on something which contains class "fas".
        if (event.target.classList.contains('fas')) {
          // We need to delete 'li' from DOM, so we can just delete parent of our target, which is exactly this 'li'. 
          event.target.parentElement.remove();

          // Also remove task from Local Storage.
          deleteTaskFromLocalStorage(event.target.parentElement);
        };
      } catch (err) {
        console.error(`deleteTask(): ${err}`);
      };
    };

    // Delete one targeted task from Local Storage.
    function deleteTaskFromLocalStorage(targetedElement) {
      try {
        let tasks;

        // Checking if we already have this key 'tasks' in LS.
        if (localStorage.getItem('tasks') !== null) {
          // If YES - getting the data from it. 
          // REMEMEBER - Local Storage can store ONLY 'STRING' type of data. We need to convert this string into object at first.
          tasks = JSON.parse(localStorage.getItem('tasks'));
        } else {
          // If NO - just stop this function.
          return;
        };

        // Now we looping trough tasks array...
        tasks.forEach((task, index) => {
          // ... and compare target's text content with array content. 
          if (targetedElement.textContent === task) {
            // When they matched each other - delete this task from array by it's index.
            tasks.splice(index, 1);
          };
          
          // Finally its time to set modified array to Local Storage.
          localStorage.setItem('tasks', JSON.stringify(tasks));
        });
      } catch (err) {
        console.error(`deleteTaskFromLocalStorage(): ${err}`);
      }
    };

    // Delete ALL tasks from task list.
    function clearTasksList(event) {
      try {
        // VARIANT 1: 'WHILE' loop + 'removeChild()' (FASTER METHOD).
        // Checking if we have at least one 'firstElementChild' element (basically task) in our parent element (task list).
        if (tasksList.firstElementChild) {
          if (confirm('ARE YOU SURE?')) {
            // Here we put 'firstChild' because we want to check existence not only elements but also text nodes from linebreaks...
            while (tasksList.firstChild) {
              // ... and remove them until nothing left.
              tasksList.removeChild(tasksList.firstChild);

              // Also we delete all data from the Local Storage.
              localStorage.clear();
            };
          };
        } else {
          alert('THERE\'S NOTHING TO DELETE!');
        };

        // // VARIANT 2: 'innerHTML' (SLOWER METHOD).
        // // Checking if the task list has at least one 'firstElementChild'.
        // // Just 'firstChild' won't do because even if we delete all tasks from task list one by one - we'll still have a text nodes from linebreaks in node list.
        // if (tasksList.firstElementChild) {
        //   if (confirm('ARE YOU SURE?')) {
        //     // We simply assign an empty string to the target's 'innerHTML'...
        //     tasksList.innerHTML = '';

        //     // ... and delete all data from the Local Storage.
        //     localStorage.clear();
        //   };
        // } else {
        //   alert('THERE\'S NOTHING TO DELETE!');
        // };

        event.preventDefault();
      } catch (err) {
        console.error(`clearTaskList(): ${err}`);
      };
    };

    // Tasks filtering.
    function filterTasks(event) {
      try {
        // Getting the text from search input and transform it to lower case.
        const text = event.target.value.toLowerCase();

        // Getting the already existed tasks from task list. 
        const items = document.querySelectorAll('.tasks-list-item');

        // Iterating NodeList with tasks.
        items.forEach((task) => {
          // Getting the text from each task and transform it to lower case.
          const item = task.innerText.toLowerCase();

          // Compare text from filter input with text from each existed task.
          if (item.indexOf(text) != -1) {
            // Result of comparison positive - display that component as usual.
            task.style.display = 'flex';
            // Result of comparison negative - don't display unmatched component at all.
          } else {
            task.style.display = 'none';
          };
        });
      } catch (err) {
        console.error(`filterTasks(): ${err}`);
      };
    };
  } catch (err) {
    console.error(`loadEventListeners(): ${err}`);
  };
};

loadEventListeners();