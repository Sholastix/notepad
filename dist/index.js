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
        const textNode = document.createTextNode(input.value);

        // Push this node to 'li' element.
        li.appendChild(textNode);

        // Append 'li' element to 'ul' (basically add task to task list).
        tasksList.appendChild(li);

        // Clear the 'new task' input.
        input.value = '';

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
        // Checking if we have at least one child element in our parent element (task list)...
        while (tasksList.firstChild) {
          // ... and remove it until there are none.
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