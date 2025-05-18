const cartLi = document.querySelector('.cart-li');
const cartModal = document.querySelector('.cart-modal');
const cartClose = document.querySelector('#cart-close');
const itemCount = document.querySelector('.item-count');
itemCount.innerText = 0;
const btnBuy = document.querySelector('.btn-buy');

const addCartBtns = document.querySelectorAll('.add-cart');
const cartBox = document.querySelector('.cart-box');
var cartBoxItems = [];

var total = document.querySelector('.total-price');
total.innerText = '$0.00';

cartLi.addEventListener('click', () => {
	cartModal.classList.add('show');
});

cartClose.addEventListener('click', () => {
	cartModal.classList.remove('show');
});

addCartBtns.forEach((btn) => {
	btn.addEventListener('click', () => {
		const item = btn.closest('.card');
		if (!checkExistingCart(item)) {
			addItemInCart(item);
			alert('Item successfully added to cart.');
		}
	});
});
function checkExistingCart(item) {
	for (i = 0; i < cartBoxItems.length; i++) {
		if (item.querySelector('h3').innerText === cartBoxItems[i]) {
			alert('Item already exists in cart. Please update quantity in cart.');
			return true;
		}
	}
	return false;
}
function addItemInCart(item) {
	const itemImg = item.querySelector('img').src;
	const itemName = item.querySelector('h3').innerText;
	const itemPrice = item
		.closest('.card')
		.querySelector('.product-price').innerText;

	const addItem = document.createElement('div');
	addItem.classList.add('cart-item');

	const addImg = document.createElement('img');
	addImg.src = itemImg;
	addImg.alt = itemImg.alt;
	addImg.classList.add('cart-img');
	addItem.appendChild(addImg);

	const itemDetail = document.createElement('div');
	itemDetail.classList.add('cart-detail');

	const itemTitle = document.createElement('h3');
	itemTitle.classList.add('cart-product-title');
	itemTitle.innerText = itemName;
	itemDetail.appendChild(itemTitle);
	addItem.appendChild(itemDetail);

	const cartItemPrice = document.createElement('span');
	cartItemPrice.classList.add('cart-price');
	cartItemPrice.innerText = `\$${itemPrice}`;
	itemDetail.appendChild(cartItemPrice);

	const itemQty = document.createElement('div');
	itemQty.classList.add('cart-quantity');

	const decrementBtn = document.createElement('button');
	decrementBtn.classList.add('qty-btn');
	decrementBtn.innerText = '-';
	itemQty.appendChild(decrementBtn);

	const qty = document.createElement('span');
	qty.classList.add('number');
	qty.innerText = 1;
	itemQty.appendChild(qty);

	const incrementBtn = document.createElement('button');
	incrementBtn.classList.add('qty-btn');
	incrementBtn.innerText = '+';
	itemQty.appendChild(incrementBtn);

	itemDetail.appendChild(itemQty);
	addItem.appendChild(itemDetail);

	const removeItemIcon = document.createElement('i');
	removeItemIcon.classList.add('fa-solid');
	removeItemIcon.classList.add('fa-trash');
	removeItemIcon.classList.add('cart-remove');

	addItem.appendChild(removeItemIcon);

	cartBox.appendChild(addItem);

	updateTotal();
	updateCartCount();
	removeItemIcon.addEventListener('click', () => {
		removeItemIcon.closest('.cart-item').remove();
		updateTotal();
		updateCartCount();
		updateCartItems();
	});

	incrementBtn.addEventListener('click', () => {
		var newQty = incrementBtn.previousElementSibling.innerText;
		newQty++;

		qty.innerText = newQty;
		updateTotal();
		updateCartCount();
	});

	decrementBtn.addEventListener('click', () => {
		var newQty = incrementBtn.previousElementSibling.innerText;
		if (newQty == 1) {
			decrementBtn.closest('.cart-item').remove();
			updateCartItems();
		} else if (newQty > 1) {
			newQty--;
			qty.innerText = newQty;
		}
		updateTotal();
		updateCartCount();
	});
	updateCartItems();
}

function updateCartItems() {
	const cartList = cartBox.querySelectorAll('.cart-item');
	cartBoxItems = [];
	cartList.forEach((product) => {
		cartBoxItems.push(product.querySelector('.cart-product-title').innerText);
	});
}

function updateTotal() {
	var updatedTotal = 0;
	const cartItems = document.querySelectorAll('.cart-item');

	cartItems.forEach((item) => {
		const text = item.querySelector('.cart-price').innerText.replace('$', '');
		const price = parseFloat(text);

		const quant = parseFloat(item.querySelector('.number').innerText);
		var itemTotal = price * quant;
		updatedTotal += itemTotal;
	});

	total.innerText = `\$${updatedTotal.toFixed(2)}`;
}

function updateCartCount() {
	var itemQuant = 0;
	const cartItems = document.querySelectorAll('.cart-item');
	cartItems.forEach((item) => {
		const quant = parseFloat(item.querySelector('.number').innerText);
		itemQuant += quant;
	});
	itemCount.innerText = itemQuant;

	itemCount.innerText == 0
		? (itemCount.style.display = 'none')
		: (itemCount.style.display = 'block');
}

btnBuy.addEventListener('click', () => {
	if (cartBoxItems.length == 0) {
		alert('Your cart is empty. Please add items to cart in order to purchase.');
	} else {
		cartBox.innerHTML = '';
		updateCartItems();
		updateCartCount();
		total.innerText = '$0.00';

		alert('Thank you for your purchase.');
	}
});
