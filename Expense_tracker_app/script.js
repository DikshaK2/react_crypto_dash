const balance = Document.getElementById('balance');
const money_plus = Document.getElementById('money_plus');
const money_minus = Document.getElementById('money_minus');
const list = Document.getElementById('list');
const form = Document.getElementById('form');
const text = Document.getElementById('text');
const amount = Document.getElementById('amount');
const incomeText = Document.getElementById('incomeTest');
const expenseText = Document.getElementById('expenseText');

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

let transactions = localStorage.getItem('transactions') !== null?localStorageTransactions: 
function addTransaction(e){
    e.preventDeafult();

    if (incomeText.value.trim() !==" "){

        const incomeTrasaction={
            id:generateId(),
            text:'income',
            amount:+incomeText.value
        };

        transactions.push(incomeTransaction);
        addTransactionDOM(incomeTrasaction);
    }

    if(expenseText.value.trim() !==" "){
        const expenseTransaction = {
            id:generateId(),
            text:'Expense',
            amount:-ExpenseText.value
        };
        transactions.push(expenseTransaction);
        addTransactionDOM(expenseTransaction);
    }

    updateValues();
    updateLocalStorage();

    incomeText.value= "";
    expenseText.value= "";
    document.getElementById('text').value = '';
}

function generateId(){
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction){
    const sign = transaction.amount<0 ? '-':'+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount<0? 'minus':'plus');

    item.innerHTML= `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class = 'delete-btn" onclick= "removeTransaction(${transaction.id})">x</button>
    `;
    
    list.appendChild(item);
}

function updateValues(){
    const amounts = transactions.map(transaction=>transaction.amount);

    const total = amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);

    const income = amounts 
    .filter(item=>item>0)
    .reduce((acc,item)=>(acc+=item),0)
    .toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}

function removeTransaction(id){
    transactions= transactions.filter(transaction=>transaction.id!==id);

    updateLocalStorage();
    init();
}

function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

function init(){
    list.innerHTML='';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

document.addEventListener('DOMContentLoaded',function(){
    form.addEventListener('submit',function(e){
        e.preventDeafult();

        addTransaction();

        incomeText.value= '';
        expenseText.value='';
    });
});

form.addEventListener('submit',addTransaction);