let activeTabId = 'cart';
let goodsInCart = [];
let totalPrice = 0; // : добавляем переменную суммарной стоимости

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

// ---

function addInCartHandler(product) { return () => { let hasProduct = false; let index = null; let count = 1;

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
	// : подсчет общей стоимости товаров в корзине
	totalPrice += product.price;

	let fullSize = 0;

	for (let i = 0; i < goodsInCart.length; i++) {
		const productInCart = goodsInCart[i];
		fullSize += productInCart.count;
	}

	tabWithCounter.dataset.goodsCount = fullSize;

	// : добавляем обновление общей стоимости на странице
	const totalPriceElem = document.querySelector('.total-price');
	totalPriceElem.textContent = `Сумма: ₽ ${totalPrice}`;
};
}

// ---

function removeInCartHandler(productId) { return () => { const newGoodsInCart = [];

	for (let i = 0; i < goodsInCart.length; i++) {
		const product = goodsInCart[i];

		if (productId === product.id) {
			// : вычитаем стоимость удаленного товара из общей суммы
			totalPrice -= product.price;

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

	// : добавляем обновление общей стоимости на странице
	const totalPriceElem = document.querySelector('.total-price');
	totalPriceElem.textContent = `Сумма: ₽ ${totalPrice}`;
};
}

// ---

function addClickListeners(elements, callback) {
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];

		element.addEventListener('click', callback);
	}
}

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

function renderTabContentById(tabId) {
	const tabsContainer = document.querySelector('.tabs');
	let html = null;

	if (tabId === 'goods') {
		html = renderGoods();
	}
	else if (tabId === 'goods_2') { //добавляем id кнопки
		html = renderGoods_2(); //указываем метод рендера
	}
	else if (tabId === 'goods_3') { //добавляем id кнопки
		html = renderGoods_3(); //указываем метод рендера
	}
	else {
		html = renderCart();
	}

	if (html !== null) {
		tabsContainer.after(html);
	}
}

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
// прописываем рендер (копируем предыдущий меняя название переменных в трех местах)
function renderGoods_2() { // тут меняем (метод рендера)
	const div = document.createElement('div');
	div.dataset.activeTabContent = 'true';
	div.className = 'product-items';

	for (let i = 0; i < GOODS_2.length; i++) { // и тут меняем (название массива)
		const product = createProduct(GOODS_2[i]); // и еще тут меняем (название массива)

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
// прописываем рендер (копируем предыдущий меняя название переменных в трех местах)
function renderGoods_3() { // тут меняем (метод рендера)
	const div = document.createElement('div');
	div.dataset.activeTabContent = 'true';
	div.className = 'product-items';

	for (let i = 0; i < GOODS_3.length; i++) { // и тут меняем (название массива)
		const product = createProduct(GOODS_3[i]); // и еще тут меняем (название массива)

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

// ---

function renderCart() { const container = document.createElement('div'); 
container.dataset.activeTabContent = 'true'; container.className = 'cart-items';

for (let i = 0; i < goodsInCart.length; i++) {
	const product = goodsInCart[i];

	const cartItem = document.createElement('div');
	cartItem.dataset.elementId = product.id;
	cartItem.className = 'cart-item';

	// : добавляем кнопки "-" и "+"
	const minusButton = document.createElement('button');
	minusButton.className = 'cart-item-change cart-item-minus';
	minusButton.innerHTML = '-';
	minusButton.addEventListener('click', decrementCountHandler(product.id));

	const plusButton = document.createElement('button');
	plusButton.className = 'cart-item-change cart-item-plus';
	plusButton.innerHTML = '+';
	plusButton.addEventListener('click', incrementCountHandler(product.id));

	const countSpan = document.createElement('span');
	countSpan.className = 'cart-item-count';
	countSpan.textContent = product.count;

	const countContainer = document.createElement('div');
	countContainer.className = 'cart-item-count-container';
	countContainer.append(minusButton, countSpan, plusButton);

	cartItem.innerHTML = `
<div class="cart-item-img"><img src="${product.imgSrc}"></div>
<div class="cart-item-title">${product.name}</div>
<div class="cart-item-price">₽ ${product.price}</div>
`;

	cartItem.append(countContainer);

	const clickHander = removeInCartHandler(product.id);

	const button = document.createElement('button');
	button.className = 'cart-item-delete';
	//button.textContent = 'x';
	button.addEventListener('click', clickHander);

	cartItem.append(button);

	container.append(cartItem);
}

// : добавляем отображение общей стоимости на странице
const totalPriceElem = document.createElement('div');
totalPriceElem.className = 'total-price';
totalPriceElem.textContent = `Сумма: ₽ ${totalPrice}`;

container.append(totalPriceElem);

return container;
}

// ---

function decrementCountHandler(productId) { return () => { const newGoodsInCart = [];

	for (let i = 0; i < goodsInCart.length; i++) {
		const product = goodsInCart[i];

		if (productId === product.id) {
			// : вычитаем стоимость удаленного товара из общей суммы
			totalPrice -= product.price;

			if (product.count > 1) {
				newGoodsInCart.push({
					id: product.id,
					name: product.name,
					price: product.price,
					imgSrc: product.imgSrc,
					count: product.count - 1,
				});

				updateCartItem(product.id, product.count - 1);
			} else {
				updateCartItem(product.id, 0);
			}
		}
		else {
			newGoodsInCart.push(product);
		}
	}

	goodsInCart = newGoodsInCart;

	let fullSize = 0;

	for (let i = 0; i < goodsInCart.length; i++) {
		const productInCart = goodsInCart[i];
		fullSize += productInCart.count;
	}

	tabWithCounter.dataset.goodsCount = fullSize;
};
}

function incrementCountHandler(productId) { return () => { const newGoodsInCart = [];

	for (let i = 0; i < goodsInCart.length; i++) {
		const product = goodsInCart[i];

		if (productId === product.id) {
			newGoodsInCart.push({
				id: product.id,
				name: product.name,
				price: product.price,
				imgSrc: product.imgSrc,
				count: product.count + 1,
			});

			updateCartItem(product.id, product.count + 1);

			// : добавляем стоимость добавленного товара в общую сумму
			totalPrice += product.price;
		}
		else {
			newGoodsInCart.push(product);
		}
	}

	goodsInCart = newGoodsInCart;

	let fullSize = 0;

	for (let i = 0; i < goodsInCart.length; i++) {
		const productInCart = goodsInCart[i];
		fullSize += productInCart.count;
	}

	tabWithCounter.dataset.goodsCount = fullSize;

	// : добавляем обновление общей стоимости на странице
	const totalPriceElem = document.querySelector('.total-price');
	totalPriceElem.textContent = `Сумма: ₽ ${totalPrice}`;
};
}

// ---

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


// ПЕЧЕНЬКИ
// Функция для получения содержимого корзины из куки
function getGoodsInCartFromCookie() {
	// Получаем сериализованные данные из куки по ключу 'cartGoods'
	const serializedData = getCookie('cartGoods');
	if (!serializedData) {
		// Если данных в куки нет, возвращаем пустой массив
		return [];
	}
	try {
		// Парсим сериализованные данные и возвращаем их в виде массива объектов
		return JSON.parse(serializedData);
	} catch {
		// Если произошла ошибка при парсинге, очищаем куки и возвращаем пустой массив
		setCookie('cartGoods', '');
		return [];
	}
}

// Функция для сохранения содержимого корзины в куки
function updateGoodsInCartCookie() {
	// Сохраняем сериализованные данные корзины в куки по ключу 'cartGoods'
	setCookie('cartGoods', goodsInCart);
}

// Функция для установки значения куки
function setCookie(name, value, options={}) {
	// Устанавливаем опции по умолчанию и объединяем их с переданными опциями
	options = {
		path: '/',
		...options
	};

	// Сохраняем опцию 'expires' в отдельной переменной для удобства
	let expires = options.expires;

	// Если опция 'expires' передана в виде числа, преобразуем ее в объект Date
	if (expires && typeof expires === 'number') {
		const date = new Date();
		date.setTime(date.getTime() + expires * 1000);
		expires = options.expires = date;
	}

	// Если опция 'expires' передана в виде объекта Date, преобразуем ее в строку формата UTC
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	// Сериализуем значение куки и добавляем его в строку куки
	value = encodeURIComponent(JSON.stringify(value));

	let updatedCookie = `${name}=${value}`;

	for (let optionKey in options) {
		updatedCookie += `; ${optionKey}`;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += `=${optionValue}`;
		}
	}

	// Устанавливаем новое значение куки
	document.cookie = updatedCookie;
}

// Функция для получения значения куки по ключу
function getCookie(name) {
	// Ищем по регулярному выражению значение куки с указанным ключом и декодируем его
	const matches = document.cookie.match(new RegExp(
		`(?:^|; )${name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')}=([^;]*)`
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Обработчик события добавления товара в корзину
function addToCartHandler(productId) {
	return () => {
		const product = getProductById(productId);

		// Создаем копию массива корзины
		const newGoodsInCart = [...goodsInCart];

		let isInCart = false;

		for (let i = 0; i < newGoodsInCart.length; i++) {
			const productInCart = newGoodsInCart[i];

			// Если товар уже есть в корзине, увеличиваем количество
			if (productId === productInCart.id) {
				isInCart = true;

				newGoodsInCart[i] = {
					id: productInCart.id,
					name: productInCart.name,
					price: productInCart.price,
					imgSrc: productInCart.imgSrc,
					count: productInCart.count + 1,
				};

				// Обновляем количество товара в соответствующей строке таблицы
				updateCartItem(productId);
				break;
			}
		}

		// Если товара еще нет в корзине, добавляем его
		if (!isInCart) {
			newGoodsInCart.push({
				id: product.id,
				name: product.name,
				price: product.price,
				imgSrc: product.imgSrc,
				count: 1,
			});

			// Создаем новую строку таблицы с информацией о товаре
			createCartItem(product.id);
		}

		// Обновляем данные корзины
		goodsInCart = newGoodsInCart;

		let fullSize = 0;

		for (let i = 0; i < newGoodsInCart.length; i++) {
			const productInCart = newGoodsInCart[i];
			fullSize += productInCart.count;
		}

		tabWithCounter.dataset.goodsCount = fullSize;

		// Сохраняем содержимое корзины в куки
		updateGoodsInCartCookie();
	};
}

// Обработчик события удаления товара из корзины
function removeInCartHandler(productId) {
	return () => {
		const newGoodsInCart = [];

		for (let i = 0; i < goodsInCart.length; i++) {
			const product = goodsInCart[i];

			if (productId === product.id) {
				// Вычитаем стоимость удаленного товара из общей суммы
				totalPrice -= product.price * product.count;

				// Обновляем количество товара в соответствующей строке таблицы на 0
				updateCartItem(product.id, 0);
			}
			else {
				newGoodsInCart.push(product);
			}
		}

		// Обновляем данные корзины
		goodsInCart = newGoodsInCart;

		let fullSize = 0;

		for (let i = 0; i < goodsInCart.length; i++) {
			const productInCart = goodsInCart[i];
			fullSize += productInCart.count;
		}

		tabWithCounter.dataset.goodsCount = fullSize;

		// Сохраняем содержимое корзины в куки
		updateGoodsInCartCookie();

		// Обновляем общую стоимость на странице
		const totalPriceElem = document.querySelector('.total-price');
		totalPriceElem.textContent = `Сумма: ₽ ${totalPrice}`;
	};
}
