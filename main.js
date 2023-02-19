// Wait for the page to finish loading before executing the code
window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const list = document.querySelector('#tasks');
  
    // Add a submit event listener to the form
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const task = input.value.trim();
      
      // If the input is empty, flash its background color and return
      if (!task) {
        input.style.backgroundColor = '#8A2611';
        setTimeout(() => {
          input.style.backgroundColor = '';
        }, 200);
        return;
      }
  
      // Create the new task element
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
  
      taskActionsEl.appendChild(taskEditEl);
      taskActionsEl.appendChild(taskDeleteEl);
      taskEl.appendChild(taskActionsEl);
  
      list.appendChild(taskEl);
  
      input.value = '';
  
      // Add event listeners to the new task element's buttons
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
      });
    });
  });
  