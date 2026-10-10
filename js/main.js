// Массив обьектов с полученными даннымим
let cart = []

// Пул основного окна прайсов
const servicesPool = document.querySelector('.price')
// Общая цена в окне калькулятора
const totalPrice = document.getElementById('total-price')
// Пул калькулятора в котором будут появляться услуги
const calculatorPool = document.getElementById('calculator-pool')

// Информативная лента
const sliderTape = document.getElementById('slider-tape')
const sliderBtn = document.getElementById('slider-btn')

let sliderIndex = 0

// Переключение информативного слайда по кнопке

sliderBtn.addEventListener('click', () => {
    sliderIndex ++

    if (sliderIndex >= 3) {
        sliderIndex = 0
    }

    const shiftPercentage = sliderIndex * 33.333

    sliderTape.style.transform = `translateX(-${shiftPercentage}%)`
})






// Ререндер корзины
function renderCart() {
    calculatorPool.innerHTML = "<p class='calculator-cart-placeholder'>Выбранные услуги (можно перетащить еще):</p>"

    cart.forEach(item => {
        const cardElement = document.createElement('div')
        cardElement.className = 'chosen-service'

        cardElement.innerHTML = `
            <p>Название услуги: ${item.name} </p>
            <p>Цена услуг: ${item.price*item.quantity}₽</p>
            <span>Количество услуг:</span>
            <button class="counter-btn" data-id="${item.id}" data-action="plus">+</button>
            <span> ${item.quantity} </span>
            <button class="counter-btn" data-id="${item.id}" data-action="minus">-</button>
        `
        calculatorPool.appendChild(cardElement)
    })
}

// Перерасчет суммы и рендер корзины
function updateCartUi(){
    const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    renderCart()
    
    totalPrice.textContent = totalSum  
}
    


// Логика Калькулятора
// Нажатие по кнопке "В КОРЗИНУ"
servicesPool.addEventListener('click', (event) => {
    const button = event.target.closest('.add-to-cart-btn')
    if(!button) return

    const item = button.closest('.service-card')
    

    const id = item.id
    const name = item.getAttribute('data-name')
    const price = parseInt(item.getAttribute('data-price'))

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
    
    updateCartUi()
})



// Обработка кликов по пулу калькулятора
calculatorPool.addEventListener('click', (event) => {
    const button = event.target.closest('.counter-btn')
    if (!button) return

    const id = button.getAttribute("data-id")
    const action = button.getAttribute("data-action")

    let item = cart.find(item => item.id === id)
    if(item) {
        if (action==="plus"){
            item.quantity ++
        } else if (action==="minus") {
            item.quantity --
            if (item.quantity <= 0){
                cart = cart.filter(cartItem => cartItem.id !== id)
            }
        }
    }

    updateCartUi()
})


// Старт перетаскивания услуги
servicesPool.addEventListener("dragstart", (event) => {
    const draggedItem = event.target.closest('div[data-price]')
    if (draggedItem) {
        event.dataTransfer.setData('text/plain', draggedItem.id)
    }

    draggedItem.classList.add('dragging');
})

// Разрешаем кидать услугу в корзину
calculatorPool.addEventListener('dragover', (event) => {
    event.preventDefault()
})

// Снимаем класс когда закончился перенос карточки
servicesPool.addEventListener('dragend', (event) => {
    const draggedItem = event.target.closest('div[data-price]')
    if (draggedItem) {
        draggedItem.classList.remove('dragging')
    }
})

// Обработка прилетевших данных
calculatorPool.addEventListener("drop", (event) => {
    event.preventDefault()

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

    updateCartUi()
})





