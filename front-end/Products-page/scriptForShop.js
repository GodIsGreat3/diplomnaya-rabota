document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let currentPage = 1;
    const productsPerPage = 6;
    let filteredProducts = [...products];
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Initialize page
    renderProductsFromCurrentPage();
    updateCartCount();
    setTimeout(setupEventListeners, 100); // Даем 100 мс на обновление DOM
 // Навешиваем обработчики после обновления


    
    // Set up all event listeners
    function setupEventListeners() {
        // Filters
        document.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
        
        document.getElementById('priceRange').addEventListener('input', function() {
            document.getElementById('priceValue').textContent = this.value + ' $';
            applyFilters();
        });
        
        document.querySelectorAll('.color-circle').forEach(circle => {
            circle.addEventListener('click', function() {
                this.classList.toggle('selected');
                applyFilters();
            });
        });
        
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('selected');
                applyFilters();
            });
        });
        
    //document.querySelector('.clear-filters-btn').addEventListener('click', clearFilters);
        
        // Sorting
        document.getElementById('sort').addEventListener('change', applyFilters);
        
        // Pagination
        document.querySelector('.prev-btn').addEventListener('click', goToPrevPage);
        document.querySelector('.next-btn').addEventListener('click', goToNextPage);
        
        // Mobile menu
        document.querySelector('.mobile-menu-toggle').addEventListener('click', toggleMobileMenu);
        
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', performSearch);
        }
        
        
        // Close modal
        document.querySelector('.close-modal').addEventListener('click', closeQuickViewModal);
        window.addEventListener('click', function(event) {
            if (event.target === document.getElementById('quickViewModal')) {
                closeQuickViewModal();
            }
        });
    }
    
    // Apply filters to product list
    function applyFilters() {
        const selectedCategories = getSelectedCheckboxValues('category');
        const priceRange = document.getElementById('priceRange').value;
        const selectedColors = getSelectedColors();
        const selectedSizes = getSelectedSizes();
        const sortOption = document.getElementById('sort').value;
        
        // Filter products
        filteredProducts = products.filter(product => {
            // Filter by category
            if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
                return false;
            }
            
            // Filter by price
            if (product.price > priceRange) {
                return false;
            }
            
            // Filter by color
            if (selectedColors.length > 0 && !product.colors.some(color => selectedColors.includes(color))) {
                return false;
            }
            
            // Filter by size
            if (selectedSizes.length > 0 && !product.sizes.some(size => selectedSizes.includes(size))) {
                return false;
            }
            
            return true;
        });
        
        // Sort products
        sortProducts(sortOption);
        
        // Reset to first page and display products
        currentPage = 1;
        renderProductsFromCurrentPage();
        updatePagination();
    }
    
    // Perform search
    function performSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        
        if (searchTerm === '') {
            filteredProducts = [...products];
        } else {
            filteredProducts = products.filter(product => {
                return (
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm)
                );
            });
        }
        
        currentPage = 1;
        renderProductsFromCurrentPage();
        updatePagination();
    }
    
    // Get selected checkbox values
    function getSelectedCheckboxValues(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
            .map(checkbox => checkbox.value);
    }
    
    // Get selected colors
    function getSelectedColors() {
        return Array.from(document.querySelectorAll('.color-circle.selected'))
            .map(circle => circle.getAttribute('data-color'));
    }
    
    // Get selected sizes
    function getSelectedSizes() {
        return Array.from(document.querySelectorAll('.size-btn.selected'))
            .map(btn => btn.getAttribute('data-size'));
    }
    
    // Sort products
    function sortProducts(sortOption) {
        switch (sortOption) {
            case 'popular':
                filteredProducts.sort((a, b) => b.reviews - a.reviews);
                break;
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
        }
    }
    
    // Clear all filters
    function clearFilters() {
        document.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        document.getElementById('priceRange').value = 500;
        document.getElementById('priceValue').textContent = '500 $';
        
        document.querySelectorAll('.color-circle.selected').forEach(circle => {
            circle.classList.remove('selected');
        });
        
        document.querySelectorAll('.size-btn.selected').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        document.getElementById('sort').value = 'popular';
        
        filteredProducts = [...products];
        currentPage = 1;
        renderProductsFromCurrentPage();
        updatePagination();
    }
    
    // Display products from current page
    function renderProductsFromCurrentPage() {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = filteredProducts.slice(startIndex, endIndex);
        
        renderProducts(productsToShow);
        updatePagination();
    }
    
    // Display product list
    function renderProducts(productsToShow) {
        const productsContainer = document.getElementById('productsContainer');
        
        if (!productsContainer) return;
        
        if (productsToShow.length === 0) {
            productsContainer.innerHTML = '<div class="no-products">Нет товаров, соответствующих выбранным фильтрам.</div>';
            return;
        }
        
        productsContainer.innerHTML = '';
        
        productsToShow.forEach(product => {
            const isInWishlist = wishlistItems.includes(product.id);
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            let priceHTML = '';
            if (product.originalPrice) {
                priceHTML = `
                    <div class="product-price">
                        <span class="current-price">${product.price} $</span>
                        <span class="original-price">${product.originalPrice} $</span>
                        <span class="discount">-${product.discount}%</span>
                    </div>
                `;
            } else {
                priceHTML = `
                    <div class="product-price">
                        <span class="current-price">${product.price} $</span>
                    </div>
                `;
            }
            
            const starsHTML = generateStarRating(product.rating);
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.name}">
                    <div class="product-wishlist ${isInWishlist ? 'active' : ''}" data-id="${product.id}">
                        <i class="far fa-heart${isInWishlist ? ' fas' : ''}"></i>
                    </div>
                </div>
                <div class="product-details">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    ${priceHTML}
                    <div class="star-rating">
                        ${starsHTML}
                        <span class="rating-text">${product.rating.toFixed(1)}/5 (${product.reviews})</span>
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
                        <button class="quick-view" data-id="${product.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        // Add event listeners for product cards
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCartFromCatalog);
        });
        
        document.querySelectorAll('.quick-view').forEach(button => {
            button.addEventListener('click', openQuickView);
        });
        
        document.querySelectorAll('.product-wishlist').forEach(wishlistBtn => {
            wishlistBtn.addEventListener('click', toggleWishlist);
        });
    }
    
    // Generate HTML code for star rating
    function generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHTML = '';
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHTML += '<span class="star filled">★</span>';
            } else if (i === fullStars && hasHalfStar) {
                starsHTML += '<span class="star filled">★</span>';
            } else {
                starsHTML += '<span class="star">★</span>';
            }
        }
        
        return starsHTML;
    }
    
    // Go to previous page
    function goToPrevPage() {
        if (currentPage > 1) {
            currentPage--;
            renderProductsFromCurrentPage();
            updatePagination();
            window.scrollTo(0, 0);
        }
    }
    
    // Go to next page
    function goToNextPage() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProductsFromCurrentPage();
            updatePagination();
            window.scrollTo(0, 0);
        }
    }
    
    // Update pagination buttons
    function updatePagination() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const pageNumbers = document.querySelector('.page-numbers');
        
        if (!prevBtn || !nextBtn || !pageNumbers) return;
        
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        // Update page numbers
        pageNumbers.innerHTML = '';
        
        // Determine range of displayed pages
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + 2);
        
        // Adjustment if there are few pages
        if (endPage - startPage < 2) {
            startPage = Math.max(1, endPage - 2);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${currentPage === i ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', function() {
                currentPage = i;
                renderProductsFromCurrentPage();
                window.scrollTo(0, 0);
            });
            pageNumbers.appendChild(pageBtn);
        }
    }
    
    // Add product to cart from catalog
    function addToCartFromCatalog(event) {
        const productId = parseInt(event.currentTarget.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        if (product) {
            // Check if product is already in cart
            const existingItem = cartItems.find(item => 
                item.productId === productId && 
                item.color === product.colors[0] && 
                item.size === product.sizes[0]
            );
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({
                    productId,
                    quantity: 1,
                    color: product.colors[0],
                    size: product.sizes[0]
                });
            }
            
            saveCart();
            updateCartCount();
            
            // Add animation or notification for successful add
            const button = event.currentTarget;
            const originalText = button.textContent;
            button.textContent = 'В корзине!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 1500);
        }
    }
    
    // Open quick view of product
    function openQuickView(event) {
        const productId = parseInt(event.currentTarget.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        if (product) {
            const isInWishlist = wishlistItems.includes(product.id);
            const quickViewContent = document.getElementById('quickViewContent');
            
            let priceHTML = '';
            if (product.originalPrice) {
                priceHTML = `
                    <div class="quick-view-price">
                        <span class="current-price">${product.price} $</span>
                        <span class="original-price">${product.originalPrice} $</span>
                        <span class="discount">-${product.discount}%</span>
                    </div>
                `;
            } else {
                priceHTML = `
                    <div class="quick-view-price">
                        <span class="current-price">${product.price} $</span>
                    </div>
                `;
            }
            
            const starsHTML = generateStarRating(product.rating);
            
            // Generate HTML for colors
            const colorsHTML = product.colors.map(color => {
                return `<div class="color-circle quick-view-color" style="background-color: ${colorMap[color]}" data-color="${color}"></div>`;
            }).join('');
            
            // Generate HTML for sizes
            const sizesHTML = product.sizes.map(size => {
                return `<button class="size-btn quick-view-size" data-size="${size}">${size}</button>`;
            }).join('');
            
            quickViewContent.innerHTML = `
                <div class="quick-view-image">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="quick-view-details">
                    <h2>${product.name}</h2>
                    <div class="quick-view-category">${product.category}</div>
                    ${priceHTML}
                    <div class="star-rating">
                        ${starsHTML}
                        <span class="rating-text">${product.rating.toFixed(1)}/5 (${product.reviews})</span>
                    </div>
                    <div class="quick-view-colors">
                        <h4>Цвет:</h4>
                        <div class="quick-view-color-options">
                            ${colorsHTML}
                        </div>
                    </div>
                    <div class="quick-view-sizes">
                        <h4>Размер:</h4>
                        <div class="quick-view-size-options">
                            ${sizesHTML}
                        </div>
                    </div>
                    <div class="quick-view-description">
                        <p>${product.description}</p>
                    </div>
                    <div class="quick-view-actions">
                        <button class="quick-add-to-cart" data-id="${product.id}">Добавить в корзину</button>
                        <button class="quick-view-wishlist ${isInWishlist ? 'active' : ''}" data-id="${product.id}">
                            <i class="far fa-heart${isInWishlist ? ' fas' : ''}"></i> В избранное
                        </button>
                    </div>
                </div>
            `;
            
            // Open modal
            document.getElementById('quickViewModal').style.display = 'flex';
            
            // Add event listeners
            document.querySelectorAll('.quick-view-color').forEach(colorBtn => {
                colorBtn.addEventListener('click', function() {
                    document.querySelectorAll('.quick-view-color').forEach(btn => btn.classList.remove('selected'));
                    this.classList.add('selected');
                });
            });
            
            document.querySelectorAll('.quick-view-size').forEach(sizeBtn => {
                sizeBtn.addEventListener('click', function() {
                    document.querySelectorAll('.quick-view-size').forEach(btn => btn.classList.remove('selected'));
                    this.classList.add('selected');
                });
            });
            
            document.querySelector('.quick-add-to-cart').addEventListener('click', function() {
                const selectedColor = document.querySelector('.quick-view-color.selected') ? 
                    document.querySelector('.quick-view-color.selected').getAttribute('data-color') : 
                    product.colors[0];
                
                const selectedSize = document.querySelector('.quick-view-size.selected') ? 
                    document.querySelector('.quick-view-size.selected').getAttribute('data-size') : 
                    product.sizes[0];
                
                addToCart(productId, selectedColor, selectedSize);
                closeQuickViewModal();
            });
            
            document.querySelector('.quick-view-wishlist').addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                toggleWishlistById(productId);
                this.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    this.querySelector('i').classList.remove('far');
                    this.querySelector('i').classList.add('fas');
                } else {
                    this.querySelector('i').classList.remove('fas');
                    this.querySelector('i').classList.add('far');
                }
            });
            
            // Select first color and size by default
            const firstColor = document.querySelector('.quick-view-color');
            const firstSize = document.querySelector('.quick-view-size');
            
            if (firstColor && firstSize) {
                firstColor.classList.add('selected');
                firstSize.classList.add('selected');
            }
        }
    }
    
    // Close quick view modal
    function closeQuickViewModal() {
        document.getElementById('quickViewModal').style.display = 'none';
    }
    
    // Add product to cart with selected parameters
    function addToCart(productId, color, size) {
        const product = products.find(p => p.id === productId);
        
        if (product) {
            // Check if product is already in cart with same parameters
            const existingItem = cartItems.find(item => 
                item.productId === productId && 
                item.color === color && 
                item.size === size
            );
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({
                    productId,
                    quantity: 1,
                    color,
                    size
                });
            }
            
            saveCart();
            updateCartCount();
            
            // Show notification
            alert('Товар добавлен в корзину!');
        }
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    
    // Update cart count
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (!cartCount) return;
        
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        
        cartCount.textContent = totalQuantity;
        
        if (totalQuantity > 0) {
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
    
    // Add/remove product from wishlist
    function toggleWishlist(event) {
        event.stopPropagation();
        const productId = parseInt(event.currentTarget.getAttribute('data-id'));
        toggleWishlistById(productId);
        
        // Update icon
        const heartIcon = event.currentTarget.querySelector('i');
        if (wishlistItems.includes(productId)) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            event.currentTarget.classList.add('active');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            event.currentTarget.classList.remove('active');
        }
    }
    
    // Add/remove product from wishlist by ID
    function toggleWishlistById(productId) {
        const index = wishlistItems.indexOf(productId);
        
        if (index === -1) {
            wishlistItems.push(productId);
        } else {
            wishlistItems.splice(index, 1);
        }
        
        saveWishlist();
        
        // Update all wishlist icons for this product
        document.querySelectorAll(`.product-wishlist[data-id="${productId}"]`).forEach(btn => {
            const heartIcon = btn.querySelector('i');
            if (wishlistItems.includes(productId)) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                btn.classList.add('active');
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                btn.classList.remove('active');
            }
        });
    }
    
    // Save wishlist to localStorage
    function saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        const navigation = document.querySelector('.navigation');
        navigation.classList.toggle('active');
    }
    
    // Check if we are on cart page
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
    
    // Check if we are on wishlist page
    if (window.location.pathname.includes('wishlist.html')) {
        renderWishlist();
    }
    
    // Display cart
    function renderCart() {
        const cartContainer = document.querySelector('.cart-items');
        
        if (!cartContainer) return;
        
        if (cartItems.length === 0) {
            document.querySelector('.cart-container').innerHTML = `
                <h1>Корзина</h1>
                <div class="cart-empty">
                    <p>Ваша корзина пуста.</p>
                    <a href="index.html" class="continue-shopping-btn">Продолжить покупки</a>
                </div>
            `;
            return;
        }
        
        cartContainer.innerHTML = '';
        
        let subtotal = 0;
        
        cartItems.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            
            if (product) {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                
                subtotal += product.price * item.quantity;
                
                cartItemElement.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${product.images[0]}" alt="${product.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${product.name}</h3>
                        <div class="cart-item-category">${product.category}</div>
                        <div class="cart-item-variants">
                            <span>
                                <span class="cart-item-color" style="background-color: ${colorMap[item.color]}"></span>
                                ${item.color}
                            </span>
                            <span>Размер: ${item.size}</span>
                        </div>
                        <div class="cart-item-price">${product.price} $</div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="item-quantity">
                            <button class="quantity-btn decrease" data-id="${item.productId}" data-color="${item.color}" data-size="${item.size}">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.productId}" data-color="${item.color}" data-size="${item.size}">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.productId}" data-color="${item.color}" data-size="${item.size}">Удалить</button>
                    </div>
                `;
                
                cartContainer.appendChild(cartItemElement);
            }
        });
        
        // Update totals
        updateCartSummary(subtotal);
        
        // Add event listeners
        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeFromCart);
        });
    }
    
    // Update cart summary
    function updateCartSummary(subtotal) {
        const summaryTotal = document.querySelector('.summary-total .value');
        const subtotalElement = document.querySelector('.summary-item:first-child .value');
        
        if (subtotalElement) subtotalElement.textContent = subtotal + ' $';
        if (summaryTotal) summaryTotal.textContent = subtotal + ' $';
    }
    
    // Increase product quantity
    function increaseQuantity(event) {
        const productId = parseInt(event.currentTarget.getAttribute('data-id'));
        const color = event.currentTarget.getAttribute('data-color');
        const size = event.currentTarget.getAttribute('data-size');
        
        const item = cartItems.find(item => 
            item.productId === productId && 
            item.color === color && 
            item.size === size
        );
        
        if (item) {
            item.quantity += 1;
            saveCart();
            renderCart();
            updateCartCount();
        }
    }
    
    // Decrease product quantity
    function decreaseQuantity(event) {
        const productId = parseInt(event.currentTarget.getAttribute('data-id'));
        const color = event.currentTarget.getAttribute('data-color');
        const size = event.currentTarget.getAttribute('data-size');
        
        const item = cartItems.find(item => 
            item.productId === productId && 
            item.color === color && 
            item.size === size
        );
        
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                removeItemFromCart(productId, color, size);
            }
            
            saveCart();
            renderCart();
            updateCartCount();
        }
    }
    
    // Remove product from cart
    function removeFromCart(event) {
        const productId = parseInt(event.currentTarget.getAttribute('data-id'));
        const color = event.currentTarget.getAttribute('data-color');
        const size = event.currentTarget.getAttribute('data-size');
        
        removeItemFromCart(productId, color, size);
        saveCart();
        renderCart();
        updateCartCount();
    }
    
    // Remove product from cart array
    function removeItemFromCart(productId, color, size) {
        const index = cartItems.findIndex(item => 
            item.productId === productId && 
            item.color === color && 
            item.size === size
        );
        
        if (index !== -1) {
            cartItems.splice(index, 1);
        }
    }
    
    function renderWishlist() {
        const wishlistContainer = document.querySelector('.wishlist-items');
        
        if (!wishlistContainer) return;
        
        if (wishlistItems.length === 0) {
            document.querySelector('.wishlist-container').innerHTML = `
                <h1>Избранное</h1>
                <div class="wishlist-empty">
                    <p>У вас пока нет товаров в избранном.</p>
                    <a href="index.html" class="continue-shopping-btn">Перейти к покупкам</a>
                </div>
            `;
            return;
        }
        
        wishlistContainer.innerHTML = '';
        
        wishlistItems.forEach(productId => {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                const wishlistItem = document.createElement('div');
                wishlistItem.className = 'product-card';
                
                let priceHTML = '';
                if (product.originalPrice) {
                    priceHTML = `
                        <div class="product-price">
                            <span class="current-price">${product.price} $</span>
                            <span class="original-price">${product.originalPrice} $</span>
                            <span class="discount">-${product.discount}%</span>
                        </div>
                    `;
                } else {
                    priceHTML = `
                        <div class="product-price">
                            <span class="current-price">${product.price} $</span>
                        </div>
                    `;
                }
                
                const starsHTML = generateStarRating(product.rating);
                
                wishlistItem.innerHTML = `
                    <div class="product-image">
                        <img src="${product.images[0]}" alt="${product.name}">
                        <div class="product-wishlist active" data-id="${product.id}">
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
                    <div class="product-details">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-name">${product.name}</h3>
                        ${priceHTML}
                        <div class="star-rating">
                            ${starsHTML}
                            <span class="rating-text">${product.rating.toFixed(1)}/5 (${product.reviews})</span>
                        </div>
                        <div class="product-actions">
                            <button class="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
                            <button class="quick-view" data-id="${product.id}">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                `;
                
                wishlistContainer.appendChild(wishlistItem);
            }
        });
        
        // Add event listeners
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCartFromCatalog);
        });
        
        document.querySelectorAll('.quick-view').forEach(button => {
            button.addEventListener('click', openQuickView);
        });
        
        document.querySelectorAll('.product-wishlist').forEach(wishlistBtn => {
            wishlistBtn.addEventListener('click', function(event) {
                const productId = parseInt(this.getAttribute('data-id'));
                toggleWishlistById(productId);
                renderWishlist(); // Redraw whole list
            });
        });
    }
});

