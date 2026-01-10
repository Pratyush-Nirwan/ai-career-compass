# To-Do List with Calendar Integration

This project is a simple yet functional **To-Do List application** built using **HTML, CSS, and JavaScript**.  
It was created as part of a learning exercise to understand **DOM manipulation, event handling, and browser storage**.

The application allows users to manage tasks with deadlines and view them in a calendar-style list.

## Features

- Add tasks with optional deadlines
- Mark tasks as completed
- Automatically sort tasks by deadline (earliest first)
- Calendar view for upcoming tasks
- Completed tasks remain visible until cleared
- Clear all completed tasks at once
- Tasks are saved using `localStorage` (data persists after refresh)
- Keyboard support (press Enter to add task)
- Clean and responsive UI

## Technologies Used

- **HTML** – Structure of the application  
- **CSS** – Styling and UI improvements  
- **JavaScript** – Logic, DOM manipulation, and data handling  
- **localStorage** – To store tasks persistently in the browser  

No external libraries or frameworks were used.

## How the Project Works

1. The user enters a task and (optionally) selects a deadline.
2. Tasks are stored as objects in `localStorage`.
3. JavaScript dynamically updates the DOM to display:
   - The task list
   - The calendar view
4. Tasks are automatically sorted by date.
5. Clicking on a task marks it as completed.
6. The **Clear All** button removes only completed tasks from both:
   - To-Do list
   - Calendar view

## Folder Structure

project-folder/
│
├── index.html
├── style.css
├── script.js
└── README.md

## Concepts Practiced

- DOM manipulation (`createElement`, `appendChild`, `classList`)
- Event handling (click, keypress, DOMContentLoaded)
- Input validation
- Working with dates in JavaScript
- Array operations (`push`, `filter`, `sort`)
- Persistent storage using `localStorage`

## Future Improvements (Optional)

- Filter tasks (Today / Upcoming / Completed)
- Monthly calendar grid view
- Export tasks to file
- Task priority levels

## Author

This project was developed as part of a **learning and internship-related task** to strengthen frontend development fundamentals.

## License

This project is for educational purposes.
