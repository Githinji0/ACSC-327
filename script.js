// Check authentication on page load
window.addEventListener('DOMContentLoaded', async () => {
    await checkAuth();
    await loadTasks();
});

// Check if user is authenticated
async function checkAuth() {
    try {
        const response = await fetch('get_user.php');
        const data = await response.json();
        
        if (!data.success) {
            window.location.href = 'login.html';
        } else {
            document.getElementById('username').textContent = `Welcome, ${data.username}`;
        }
    } catch (error) {
        window.location.href = 'login.html';
    }
}

// Load tasks from server
async function loadTasks() {
    try {
        const response = await fetch('get_tasks.php');
        const data = await response.json();
        
        if (data.success) {
            displayTasks(data.tasks);
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// Display tasks in the UI
function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state">No tasks yet. Add one above!</li>';
        return;
    }
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.is_completed ? 'completed' : '';
        
        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" 
                       ${task.is_completed ? 'checked' : ''} 
                       onchange="toggleTask(${task.id}, this.checked)">
                <span class="task-text">${escapeHtml(task.task_text)}</span>
            </div>
            <button onclick="deleteTask(${task.id})" class="btn-delete">Delete</button>
        `;
        
        taskList.appendChild(li);
    });
}

// Add new task
async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }
    
    try {
        const formData = new FormData();
        formData.append('task_text', taskText);
        
        const response = await fetch('add_task.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            taskInput.value = '';
            await loadTasks();
        } else {
            alert('Failed to add task');
        }
    } catch (error) {
        console.error('Error adding task:', error);
        alert('An error occurred');
    }
}

// Toggle task completion
async function toggleTask(taskId, isCompleted) {
    try {
        const formData = new FormData();
        formData.append('task_id', taskId);
        formData.append('is_completed', isCompleted ? 1 : 0);
        
        const response = await fetch('update_task.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            await loadTasks();
        } else {
            alert('Failed to update task');
            await loadTasks();
        }
    } catch (error) {
        console.error('Error updating task:', error);
        await loadTasks();
    }
}

// Delete task
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    try {
        const formData = new FormData();
        formData.append('task_id', taskId);
        
        const response = await fetch('delete_task.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            await loadTasks();
        } else {
            alert('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('An error occurred');
    }
}

// Logout
function logout() {
    window.location.href = 'check_auth.php?logout=1';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Allow adding task with Enter key
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    if (taskInput) {
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTask();
            }
        });
    }
});
