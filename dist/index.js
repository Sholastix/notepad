// UI VARIABLES.
const clearButton = document.querySelector('.tasks-clear');
const filter = document.querySelector('.filter');
const form = document.querySelector('#task-form');
const input = document.querySelector('.task-input');
const tasksList = document.querySelector('.tasks-list');

function loadEventListeners() {
  try {
    // Add 'ADD TASK' event.
    form.addEventListener('submit', addTask);

    // Add 'DELETE TASK' event.
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
        const textNode = document.createTextNode(input.value);

        // Push this node to 'li' element.
        li.appendChild(textNode);

        // Append 'li' element to 'ul' (basically add task to task list).
        tasksList.appendChild(li);

        // Clear the 'new task' input.
        input.value = '';
      } catch (err) {
        console.error(`addTask(): ${err}`);
      };
    };

    // Delete ONE targeted task from the list.
    function deleteTask(event) {
      try {
        if (event.target.className === 'fas fa-times') {
          event.target.parentElement.remove();
        };
      } catch (err) {
        console.error(`deleteTask(): ${err}`);
      };
    };

    // Delete ALL tasks from list.
    function clearTasksList(event) {
      try {
        while (tasksList.firstChild) {
          tasksList.removeChild(tasksList.firstChild);
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