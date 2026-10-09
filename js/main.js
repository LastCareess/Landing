// Массив обьектов с полученными даннымим
let cart = []

// Пул основного окна прайсов
const servicesPool = document.querySelector('.price')
// Общая цена в окне калькулятора
const totalPrice = document.getElementById('total-price')
// Пул калькулятора в котором будут появляться услуги
const calculatorPool = document.getElementById('calculator-pool')

function renderCart() {
    calculatorPool.innerHTML = ""

    cart.forEach(item => {
        const cardElement = document.createElement('div')
        cardElement.className = 'chosen-service'

        cardElement.innerHTML = `
            <p>Название услуги: ${item.name} </p>
            <p>Цена услуги: ${item.price}₽</p>
            <p>Количество услуг:</p>
            <span class="counter-btn" data-id="${item.id}" data-action="plus"><button>+</button></span>
            <span> ${item.quantity} </span>
            <span class="counter-btn" data-id="${item.id}" data-action="minus"><button>-</button></span>
        `

        calculatorPool.appendChild(cardElement)
    })
}







// Логика Калькулятора
// Обработка кликов по пулу калькулятора
calculatorPool.addEventListener('click', (event) => {
    const button = event.target.closest('.counter-btn')
    if (!button) return

    const id = button.getAttribute("data-id")
    const action = button.getAttribute("data-action")

    item = cart.find(item => item.id === id)
    if(item) {
        if (action==="plus"){
            item.quantity ++
        } else if (action==="minus") {
            item.quantity --
        }
    }

    const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    renderCart()
    
    totalPrice.textContent = totalSum  


})




// Старт перетаскивания услуги
servicesPool.addEventListener("dragstart", (event) => {
    const draggedItem = event.target.closest('p[data-price]')
    if (draggedItem) {
        event.dataTransfer.setData('text/plain', draggedItem.id)
    }

    draggedItem.classList.add('dragging');
})

// Разрешаем кидать услугу в корзину
calculatorPool.addEventListener('dragover', (event) => {
    event.preventDefault()
})

// Обработка прилетевших данных
calculatorPool.addEventListener("drop", (event) => {
    const id = event.dataTransfer.getData("text/plain")

    const item = document.getElementById(id)
    
    const price = parseInt(item.getAttribute('data-price'))
    const name = item.getAttribute('data-name')

    existingItem = cart.find(item => item.id === id)
    if (existingItem) {
        existingItem.quantity += 1

    } else {
        cart.push({
            id:id,
            name:name,
            price:price,
            quantity:1
        })
    }

    const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    renderCart()
    
    totalPrice.textContent = totalSum  


})





