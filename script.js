const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const storageKey = 'pilot-todos';

function saveTodos() {
    const todos = [...list.querySelectorAll('label')].map((label) => label.textContent.trim());
    localStorage.setItem(storageKey, JSON.stringify(todos));
}

function removeTodo(item) {
    item.classList.add('is-removing');
    item.addEventListener('animationend', () => {
        item.remove();
        saveTodos();
    }, { once: true });
}

function connectTodo(item) {
    const checkbox = item.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) removeTodo(item);
    });
}

function createTodo(text) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    label.append(checkbox, document.createTextNode(` ${text}`));
    item.append(label);
    list.append(item);
    connectTodo(item);
}

const savedTodos = JSON.parse(localStorage.getItem(storageKey) || 'null');

if (Array.isArray(savedTodos)) {
    list.replaceChildren();
    savedTodos.forEach(createTodo);
} else {
    document.querySelectorAll('#todo-list li').forEach(connectTodo);
    saveTodos();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) {
        input.focus();
        return;
    }

    createTodo(text);
    saveTodos();
    input.value = '';
    input.focus();
});
