# To-Do List Application

A simple yet complete to-do list application built with HTML, CSS, JavaScript, PHP, and MySQL.

## Features

- **User Authentication**: Register and login system
- **Add Tasks**: Create new to-do items
- **Mark as Completed**: Check off completed tasks
- **Delete Tasks**: Remove tasks you no longer need
- **User-Specific Tasks**: Each user sees only their own tasks
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### 1. Database Setup

1. Open phpMyAdmin or MySQL command line
2. Import the `database.sql` file to create the database and tables:
   ```sql
   source database.sql;
   ```
   Or manually run the SQL commands in `database.sql`

### 2. Configure Database Connection

Edit `config.php` if needed to match your MySQL settings:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');          // Your MySQL username
define('DB_PASS', '');              // Your MySQL password
define('DB_NAME', 'todo_app');
```

### 3. Run the Application

1. Place all files in your web server directory (e.g., `htdocs` for XAMPP, `www` for WAMP)
2. Start Apache and MySQL servers
3. Open your browser and navigate to: `http://localhost/ACSC-327/register.html`
4. Register a new account
5. Login and start managing your tasks!

## File Structure

```
ACSC-327/
├── index.html          # Main to-do list page
├── login.html          # Login page
├── register.html       # Registration page
├── style.css           # All CSS styles
├── script.js           # Frontend JavaScript
├── config.php          # Database configuration
├── check_auth.php      # Authentication checker
├── login.php           # Login handler
├── register.php        # Registration handler
├── get_user.php        # Get current user info
├── get_tasks.php       # Fetch user's tasks
├── add_task.php        # Add new task
├── update_task.php     # Mark task as complete/incomplete
├── delete_task.php     # Delete a task
└── database.sql        # Database schema
```

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP 7+
- **Database**: MySQL
- **Security**: Password hashing, SQL injection prevention, XSS protection

## Usage

1. **Register**: Create a new account with a username and password
2. **Login**: Access your personal to-do list
3. **Add Tasks**: Type a task and click "Add Task" or press Enter
4. **Complete Tasks**: Check the checkbox to mark tasks as complete
5. **Delete Tasks**: Click the "Delete" button to remove tasks
6. **Logout**: Click the logout button when you're done

## Security Features

- Passwords are hashed using PHP's `password_hash()`
- SQL injection prevention using prepared statements
- Session-based authentication
- XSS protection with HTML escaping
- User isolation (users can only see/modify their own tasks)

---

Enjoy using your To-Do List application!
