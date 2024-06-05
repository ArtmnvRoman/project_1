document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const modal = document.getElementById('cart-modal');
    const openCartButton = document.getElementById('open-cart');
    const closeButton = document.getElementsByClassName('close')[0];
    const clearCartButton = document.getElementById('clear-cart');
    const clearCartButtonSubmit = document.getElementById('sub');
    

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const tourElement = button.parentElement;
            const tourId = tourElement.getAttribute('data-id');
            const tourName = tourElement.getAttribute('data-name');
            const tourPrice = parseFloat(tourElement.getAttribute('data-price'));
            const tourImage = tourElement.querySelector('img').src;

            const existingItem = cart.find(item => item.id === tourId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                const tour = { id: tourId, name: tourName, price: tourPrice, image: tourImage, quantity: 1 };
                cart.push(tour);
            }
            updateCart();
        });
    });

    openCartButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    clearCartButton.addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    clearCartButtonSubmit.addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(tour => {
            total += tour.price * tour.quantity;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span class="tour_name_span">${tour.name}</span>
                <div class="cart-quantity">
                    <button class="decrease-quantity">-</button>
                    <input type="text" value="${tour.quantity}" readonly style="margin-top: 1px;">
                    <button class="increase-quantity">+</button>
                </div>
                <span>${(tour.price * tour.quantity).toFixed(2)} ₽</span>
                <button class="remove-item">&times;</button>`;
                
            cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector('.decrease-quantity').addEventListener('click', () => {
                if (tour.quantity > 1) {
                    tour.quantity--;
                    updateCart();
                }
            });

            cartItem.querySelector('.increase-quantity').addEventListener('click', () => {
                tour.quantity++;
                updateCart();
            });

            cartItem.querySelector('.remove-item').addEventListener('click', () => {
                const index = cart.indexOf(tour);
                cart.splice(index, 1);
                updateCart();
            });
        });
        cartTotalContainer.textContent = `Итого: ${total.toFixed(2)} ₽`;
        saveCart();
    }

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Вы выбрали путевки в ' + cart.length + ' разных города');
    });

    updateCart();

    document.getElementById('checkout-form').addEventListener('submit', function(event) {
        event.preventDefault();
        if (this.checkValidity()) {
            alert('Ваша заявка отправлена!');
            this.reset();
        }
    });
    
});



let slideIndex = 0;
function showSlides() {
    const slides = document.querySelectorAll('.slides img');
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? 'block' : 'none';
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.slides img');
    slideIndex = (slideIndex + 1) % slides.length;
    showSlides();
}

document.addEventListener('DOMContentLoaded', () => {
    showSlides();
    setInterval(nextSlide, 5000); 
});