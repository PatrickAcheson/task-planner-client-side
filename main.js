window.addEventListener('load', () => {
  const form = document.querySelector('#new-task-form');
  const input = document.querySelector('#new-task-input');
  const list = document.querySelector('#tasks');
  
  const tasks = JSON.parse(sessionStorage.getItem('tasks')) || [];

  const addTask = (task) => {
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');

    const taskContentEl = document.createElement('div');
    taskContentEl.classList.add('content');

    const taskInputEl = document.createElement('input');
    taskInputEl.classList.add('text');
    taskInputEl.type = 'text';
    taskInputEl.value = task;
    taskInputEl.setAttribute('readonly', 'readonly');

    taskContentEl.appendChild(taskInputEl);
    taskEl.appendChild(taskContentEl);

    const taskActionsEl = document.createElement('div');
    taskActionsEl.classList.add('actions');

    const taskEditEl = document.createElement('button');
    taskEditEl.classList.add('edit');
    taskEditEl.textContent = 'Edit';

    const taskDeleteEl = document.createElement('button');
    taskDeleteEl.classList.add('delete');
    taskDeleteEl.textContent = 'Delete';

    const taskButtonEl = document.createElement('button');
    taskButtonEl.classList.add('tickbox');
    taskButtonEl.style.backgroundColor = 'red';

    taskActionsEl.appendChild(taskEditEl);
    taskActionsEl.appendChild(taskDeleteEl);
    taskActionsEl.appendChild(taskButtonEl);
    taskEl.appendChild(taskActionsEl);

    list.appendChild(taskEl);

    taskButtonEl.addEventListener('click', (e) => {
      if (taskButtonEl.style.backgroundColor === 'red') {
        taskButtonEl.style.backgroundColor = 'green';
      } else {
        taskButtonEl.style.backgroundColor = 'red';
      }
    });

    taskEditEl.addEventListener('click', (e) => {
      if (taskEditEl.textContent.toLowerCase() === 'edit') {
        taskEditEl.textContent = 'Save';
        taskInputEl.removeAttribute('readonly');
        taskInputEl.focus();
      } else {
        taskEditEl.textContent = 'Edit';
        taskInputEl.setAttribute('readonly', 'readonly');
      }
    });

    taskDeleteEl.addEventListener('click', (e) => {
      list.removeChild(taskEl);
      tasks.splice(tasks.indexOf(taskInputEl.value), 1);
      sessionStorage.setItem('tasks', JSON.stringify(tasks));
    });
  };

  tasks.forEach(addTask);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = input.value.trim();
    if (!task) {
      input.style.backgroundColor = '#8A2611';
      setTimeout(() => {
        input.style.backgroundColor = '';
      }, 200);
      return;
    }

    tasks.push(task);
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
    addTask(task);
    input.value = '';
  });
});
