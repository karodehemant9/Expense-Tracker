// Load existing expenses from local storage
const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
let expenses = [...storedExpenses];

// Function to save expenses to local storage
function saveExpensesToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to add an expense to the list
function addExpense(amount, description, category) {
    expenses.push({ amount, description, category });
    saveExpensesToLocalStorage();
}

// Function to display the submitted details
function displayExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const expenseElement = document.createElement('div');
        expenseElement.className = 'alert alert-info';

        // Display expense details
        expenseElement.innerHTML = `
            <p><strong>Amount:</strong> ${expense.amount} Rs</p>
            <p><strong>Description:</strong> ${expense.description}</p>
            <p><strong>Category:</strong> ${expense.category}</p>
        `;

        // Create Delete and Edit buttons with margin
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger delete-edit-buttons';
        deleteButton.textContent = 'Delete Expense';
        deleteButton.addEventListener('click', () => {
            // Remove the expense from the array and re-display the list
            expenses.splice(index, 1);
            saveExpensesToLocalStorage();
            displayExpenses();
        });

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning delete-edit-buttons';
        editButton.textContent = 'Edit Expense';
        editButton.addEventListener('click', () => {
            // Edit the expense when the "Edit Expense" button is clicked
            editExpense(index);
        });

        expenseElement.appendChild(deleteButton);
        expenseElement.appendChild(editButton);

        expenseList.appendChild(expenseElement);
    });
}

// Function to edit an expense
function editExpense(index) {
    const editedExpense = expenses[index];
    const expenseForm = document.getElementById('expenseForm');

    // Populate the form with the selected expense's details
    document.getElementById('expenseAmount').value = editedExpense.amount;
    document.getElementById('expenseDescription').value = editedExpense.description;
    document.getElementById('expenseCategory').value = editedExpense.category;

    // Change the form submit button to "Save Changes"
    expenseForm.querySelector('button[type="submit"]').textContent = 'Save Changes';

    // When the form is submitted again, update the expense
    expenseForm.removeEventListener('submit', handleExpenseSubmission);
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const description = document.getElementById('expenseDescription').value;
        const category = document.getElementById('expenseCategory').value;

        if (!isNaN(amount) && description && category) {
            // Update the selected expense
            expenses[index] = { amount, description, category };
            saveExpensesToLocalStorage();
            // Reset the form and button text
            expenseForm.reset();
            expenseForm.querySelector('button[type="submit"]').textContent = 'Submit';
            // Re-display the list
            displayExpenses();
        } else {
            alert('Please fill in all fields with valid data.');
        }
    });
}

// Display existing expenses on page load
displayExpenses();

// Handle form submission
function handleExpenseSubmission(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const description = document.getElementById('expenseDescription').value;
    const category = document.getElementById('expenseCategory').value;

    if (!isNaN(amount) && description && category) {
        // Add the expense to the list
        addExpense(amount, description, category);
        // Display the updated list
        displayExpenses();
        // Reset the form
        e.target.reset();
    } else {
        alert('Please fill in all fields with valid data.');
    }
}

const expenseForm = document.getElementById('expenseForm');
expenseForm.addEventListener('submit', handleExpenseSubmission);
