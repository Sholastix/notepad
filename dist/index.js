// UI VARIABLES.
const clearButton = document.querySelector('.tasks-clear');
const filterInput = document.querySelector('.filter');
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('.task-input');
const tasksList = document.querySelector('.tasks-list');

function loadEventListeners() {
  try {
    // Add 'ADD TASK' event.
    form.addEventListener('submit', addTask);

    // Add 'DELETE TASK' event on ALL document body (later in deleteTask() we specifies the target).
    document.body.addEventListener('click', deleteTask);

    // Add 'CLEAR TASK LIST' event.
    clearButton.addEventListener('click', clearTasksList);

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

        // Clear the 'new task' input.
        taskInput.value = '';

        // Page always reloading after data submit in form, but we don't need that. So we stopped this default behaviour.
        event.preventDefault();
      } catch (err) {
        console.error(`addTask(): ${err}`);
      };
    };

    // Delete ONE targeted task from the list.
    function deleteTask(event) {
      try {
        // Event fires off if we click on something which contains class "fas".
        if (event.target.classList.contains('fas')) {
          // We need to delete 'li', so we can just delete parent of our target, which is exactly this 'li'. 
          event.target.parentElement.remove();
        };
      } catch (err) {
        console.error(`deleteTask(): ${err}`);
      };
    };

    // Delete ALL tasks from list.
    function clearTasksList(event) {
      try {
        // // VARIANT 1: 'WHILE' loop + 'removeChild()' (FASTER METHOD).
        // // Checking if we have at least one child element in our parent element (task list)...
        // while (tasksList.firstChild) {
        //   // ... and remove it until there are none.
        //   tasksList.removeChild(tasksList.firstChild);
        // };

        // VARIANT 2: 'innerHTML' (SLOWER METHOD).
        // Checking if the task list has at least one 'firstElementChild'.
        // Just 'firstChild' won't do cause even if we delete all tasks from task list one by one - we'll still have a text nodes (from linebreaks).
        if (tasksList.firstElementChild) {
          if (confirm('ARE YOU SURE?')) {
            // We just assign target's 'innerHTML' with empty string.
            tasksList.innerHTML = '';
          };
        } else {
          alert('THERE\'S NOTHING TO DELETE!');
        };

        event.preventDefault();
      } catch (err) {
        console.error(`clearTaskList(): ${err}`);
      };
    };
  } catch (err) {
    console.error(`loadEventListeners(): ${err}`);
  };
};

loadEventListeners();