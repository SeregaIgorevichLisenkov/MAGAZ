let activeTabId = 'cart';
let goodsInCart = [];

const initialTab = getActiveTab();

initialTab.classList.add('active');

renderTabContentById(activeTabId);


// ---

const tabWithCounter = document.querySelector(
	'button[data-goods-count]'
);

const tabs = document.querySelectorAll('button.tab');
addClickListeners(tabs, clickHandler);

// ---

function clickHandler(event) {
	const activeTab = getActiveTab();	

	activeTab.classList.remove('active');
	event.target.classList.add('active');

	activeTabId = event.target.dataset.tabId;

	removeActiveTabContent();
	renderTabContentById(activeTabId);
}

function addInCartHandler(product) {
	return () => {
		let hasProduct = false;
		let index = null;
		let count = 1;

		for (let i = 0; i < goodsInCart.length; i++) {
			const productInCart = goodsInCart[i];

			if (product.id === productInCart.id) {
				hasProduct = true;
				index = i;
				count = productInCart.count;
			}
		}

		if (hasProduct) {
			goodsInCart[index].count = count + 1;
		}
		else {
			const productWithCount = product;
			productWithCount.count = count;

			goodsInCart.push(productWithCount);
		}

		// ---

		let fullSize = 0;

		for (let i = 0; i < goodsInCart.length; i++) {
			const productInCart = goodsInCart[i];
			fullSize += productInCart.count;
		}

		tabWithCounter.dataset.goodsCount = fullSize;
	};
}

function removeInCartHandler(productId) {
	return () => {
		const newGoodsInCart = [];

		for (let i = 0; i < goodsInCart.length; i++) {
			const product = goodsInCart[i];

			if (productId === product.id) {
				if (product.count > 1) {
					newGoodsInCart.push({
						id: product.id,
						name: product.name,
						price: product.price,
						imgSrc: product.imgSrc,
						count: product.count - 1,
					});
				}

				updateCartItem(product.id, product.count);
			}
			else {
				newGoodsInCart.push(product);
			}
		}

		goodsInCart = newGoodsInCart;

		// ---

		let fullSize = 0;

		for (let i = 0; i < goodsInCart.length; i++) {
			const productInCart = goodsInCart[i];
			fullSize += productInCart.count;
		}

		tabWithCounter.dataset.goodsCount = fullSize;
	};
}

function addClickListeners(elements, callback) {
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];

		element.addEventListener('click', callback);
	}
}
/*СОЗДАНИЕ ТОВАРА ИЗ МАССИВА goods*/
function createProduct(product) {
	return {
		id: product.id,
		name: product.name ? product.name : 'Имя неизвестно',
		price: product.price ? product.price : null,
		imgSrc: product.imgSrc ? product.imgSrc : 'goods/default.png',
	};
}

function getActiveTab() {
	return document.querySelector(
		`button[data-tab-id="${activeTabId}"]`
	);
}

function removeActiveTabContent() {
	const activeContent = document.querySelector(
		`[data-active-tab-content="true"]`
	);

	activeContent.remove();
}
/*ПЕРЕКЛЮЧАМБА*/
function renderTabContentById(tabId) {
	const tabsContainer = document.querySelector('.tabs');
	let html = null;

	if (tabId === 'goods') {
		html = renderGoods();
	}
	else {
		html = renderCart();
	}

	if (html !== null) {
		tabsContainer.after(html);
	}
}
/*ФУНКЦИЯ ОТОБРАЖЕНИЯ ТОВАРОВ*/
function renderGoods() {
	const div = document.createElement('div');
	div.dataset.activeTabContent = 'true';
	div.className = 'product-items';

	for (let i = 0; i < GOODS.length; i++) {
		const product = createProduct(GOODS[i]);

		const price = product.price === null
			? '<p>Товар закончился</p>'
			: `<p class="price">₽ ${product.price}</p>`;

		const productBlock = document.createElement('div');
		productBlock.className = 'product-item';
		productBlock.innerHTML = `
			<img src="${product.imgSrc}">
			<div class="product-list">
		    	<h3>${product.name}</h3>
		    	${price}
			</div>
		`;

		if (product.price !== null) {
			const clickHander = addInCartHandler(product);

			const button = document.createElement('button');
			button.className = 'button';
			button.textContent = 'В КОРЗИНОЧКУ';
			button.addEventListener('click', clickHander);

			productBlock.querySelector('.product-list').append(button);
		}

		
		div.append(productBlock);
	}

	return div;
}
/*ФУНКЦИЯ ОТОБРАЖЕНИЯ КОРЗИНЫ*/
function renderCart() {
	const container = document.createElement('div');
	container.dataset.activeTabContent = 'true';
	container.className = 'cart-items';

	for (let i = 0; i < goodsInCart.length; i++) {
		const product = goodsInCart[i];

		const cartItem = document.createElement('div');
		cartItem.dataset.elementId = product.id;
		cartItem.className = 'cart-item';
		cartItem.innerHTML = `
	<div class="cart-item-title">${product.name}</div>
  	<div class="cart-item-count">${product.count} шт.</div>
  	<div class="cart-item-price">₽ ${product.price}</div>
			`;

		const clickHander = removeInCartHandler(product.id);

		const button = document.createElement('button');
		button.className = 'cart-item-delete';
		button.textContent = 'x';
		button.addEventListener('click', clickHander);

		cartItem.append(button);

		container.append(cartItem);
	}
	return container;
}

function updateCartItem(id, count) {
	const cartItem = document.querySelector(`[data-element-id="${id}"]`);

	if (count > 1) {
		const countElement = cartItem.querySelector('.cart-item-count');
		countElement.textContent = `${count - 1} шт.`;
	}
	else {
		cartItem.remove();
	}
}

// ТЁМНАЯ ТЕМА
// выбираем кнопку
const btn = document.querySelector(".btn-toggle");
// отслеживаем щелчок по кнопке
btn.addEventListener("click", function () {
  // затем переключаем (добавляем/удаляем) класс .dark-theme для body
	document.body.classList.toggle("dark-theme");
});
/*
//СУММА
//function getTotalSum(){
    let totalSum = 0;
    let $session = $jsapi.context().session;

    for(let i = 0; i < $session.cart.length; i++){
        let current_position = $session.cart[i];
        for(let id = 1; id < Object.keys(pizza).length + 1; id++){
            if (current_position.name === pizza[id].value.title){
                let variation = _.find(pizza[id].value.variations, function(variation){
                    return variation.id === current_position.id;
                });
                totalSum += variation.price * current_position.quantity;
            }
        }
    }
    log("!!!!!!!!!!!! totalSum = " + totalSum);
    return totalSum;
} */

/*
//СУММА
// Корзина товаров на сайте
const cart = goods.js[
    {name:'Milk', price: 25},
    {name:'Bread', price: 12},
    {name:'Eggs', price: 17},
];

// Как просто посчитать сумму всей корзины? Применим reduce():
const cartTotal = cart.reduce((totalSumm, item) => {
    totalSumm += item.price;
// мы всегда должны возвращать аккумулятор как результат работы над каждым элементом.
    return totalSumm;
// 0 - здесь, это начальное значение totalSumm.
}, 0);
console.log(cartTotal);
// -> 54
*/
/*
Sum += parseInt(this.childNodes[2].textContent.toString());
document.getElementById('sum').innerHTML = Sum;*/

/*
let item_name_objects = document.querySelectorAll('.merch-item-name')
let item_names = ['Тарелка', 'Кружка', 'Ракета', 'Марсоход']
for (let i = 0; i < item_name_objects.length; i += 1) {
   item_name_objects[i].innerHTML = item_names[i]
}

let item_descriptions = ['Тарелка с принтом Марса. Доступна в красном и белом цветах', 'Кружка с принтом Марса. Доступа в красном и белом цветах', 'Масштабная модель одной из ракет Galaxy', 'Масштабная модель масохода (мы покупаем их у NASA)']
let item_prices = [1000, 1000, 2500, 5000]
let item_description_objects = document.querySelectorAll('.merch-item-descr')
let item_price_objects = document.querySelectorAll('.merch-item-price')
for (let i = 0; i < item_description_objects.length; i += 1) {
    item_description_objects[i].innerHTML = item_descriptions[i]
    item_price_objects[i].innerHTML = item_prices[i]
}
 

let total_price = 0
let cart_items_count = document.querySelector('.cart-amount')
let add_to_cart_buttons = document.querySelectorAll('.add-to-cart-btn')

let cart_button = document.querySelectorAll('.nav-item')[4]
let cart_button_text = cart_button.querySelector('.cart-text')

for (let i = 0; i < add_to_cart_buttons.length; i += 1) {
    add_to_cart_buttons[i].addEventListener('click', function() {
        cart_items_count.innerHTML = +cart_items_count.innerHTML + 1
        total_price += item_prices[i]
        if (cart_button_text.innerHTML != 'Корзина') {
            cart_button_text.innerHTML = total_price
        }
    })
}
cart_button.addEventListener('click', function() {
    if (cart_button_text.innerHTML == 'Корзина') {
        cart_button_text.innerHTML = total_price
    } else {
        cart_button_text.innerHTML = 'Корзина'
    }
})
*/








