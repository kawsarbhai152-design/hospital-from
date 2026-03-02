const taskForm = document.getElementById('taskForm');
const taskContainer = document.getElementById('taskContainer');

// ১. পেজ লোড হলে আগের ডাটা দেখাবে
document.addEventListener('DOMContentLoaded', displayTasks);

// ২. ফর্ম সাবমিট করার লজিক
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // ইনপুট থেকে ডাটা নেওয়া
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const phone = document.getElementById('userPhone').value;
    const detail = document.getElementById('taskDetail').value;

    const newTask = {
        id: Date.now(),
        name,
        email,
        phone,
        detail
    };

    saveTask(newTask);
    taskForm.reset(); // ফর্ম ক্লিয়ার করা
    displayTasks();
});

// ৩. LocalStorage এ ডাটা সেভ করা
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    tasks.push(task);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// ৪. স্ক্রিনে টাস্কগুলো দেখানো
function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-card';
        div.innerHTML = `
            <h3>${task.name}</h3>
            <p><strong>ইমেইল:</strong> ${task.email}</p>
            <p><strong>ফোন:</strong> ${task.phone}</p>
            <p><strong>বিবরণ:</strong> ${task.detail}</p>
            <button class="delete-btn" onclick="removeTask(${task.id})">মুছে ফেলুন</button>
        `;
        taskContainer.appendChild(div);
    });
}

// ৫. টাস্ক মুছে ফেলার লজিক
function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    displayTasks();
}