document.addEventListener("DOMContentLoaded", () => {
    
    // --- NÚMERO DE WHATSAPP ---
    // !!! MUITO IMPORTANTE: Substitua 'SEUNUMERO' pelo seu número com código do país (ex: 55119... ) !!!
    const seuNumeroWhatsApp = "SEUNUMERO";

    // --- VARIÁVEL GLOBAL DO CARRINHO ---
    // (Para um site real, isso usaria localStorage, mas para este exemplo,
    // o carrinho reseta ao atualizar a página)
    let cart = [];

    // --- ELEMENTOS GLOBAIS ---
    const modalBackdrop = document.getElementById("modal-backdrop");
    const cartCounter = document.getElementById("cart-counter");

    // --- ELEMENTOS MODAL DE PRODUTO ---
    const productModal = document.getElementById("product-modal");
    const productModalCloseBtn = document.getElementById("modal-close-btn");
    const productModalContent = document.getElementById("modal-content");
    
    // --- ELEMENTOS MODAL DE CARRINHO ---
    const cartModal = document.getElementById("cart-modal");
    const cartModalCloseBtn = document.getElementById("cart-close-btn");
    const openCartBtn = document.getElementById("open-cart-btn");
    const cartItemsList = document.getElementById("cart-items-list");
    const cartTotalItems = document.getElementById("cart-total-items");
    const checkoutBtn = document.getElementById("whatsapp-checkout-btn");

    // --- FUNÇÃO PARA FORMATAR PREÇO ---
    const formatPrice = (price) => {
        return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // --- FUNÇÃO PARA CRIAR O CARD DE PRODUTO (NO GRID) ---
    function createProductCard(product) {
        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.id = product.id;
        card.dataset.tags = product.tags.join(','); 

        // Lógica de Preço
        let priceHTML = '';
        if (product.oldPrice && product.oldPrice > product.price) {
            priceHTML = `
                <span class="old-price">${formatPrice(product.oldPrice)}</span>
                <span class="price">${formatPrice(product.price)}</span>
            `;
        } else {
            priceHTML = `<span class="price">${formatPrice(product.price)}</span>`;
        }

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-card-info">
                <h3>${product.name}</h3>
                <div class="price-container">
                    ${priceHTML}
                </div>
            </div>
        `;

        card.addEventListener("click", () => openProductModal(product));
        return card;
    }

    // --- LÓGICA DO MODAL DE PRODUTO (POPUP) ---
    function openProductModal(product) {
        // Lógica de Preço (para o modal)
        let priceHTML = '';
        if (product.oldPrice && product.oldPrice > product.price) {
            priceHTML = `
                <span class="old-price">${formatPrice(product.oldPrice)}</span>
                <span class="price">${formatPrice(product.price)}</span>
            `;
        } else {
            priceHTML = `<span class="price">${formatPrice(product.price)}</span>`;
        }

        // Lógica de Tamanhos
        let sizesHTML = product.sizes.map(size => `
            <div class="size-option">
                <input type="radio" name="size-selector" id="size-${size}" value="${size}">
                <label for="size-${size}">${size}</label>
            </div>
        `).join('');

        // Monta o HTML do modal
        productModalContent.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="modal-info">
                <h2>${product.name}</h2>
                <div class="price-container">
                    ${priceHTML}
                </div>
                <p>${product.description}</p>
                <div class="size-selector">
                    <h4>Tamanho:</h4>
                    <div class="size-options">
                        ${sizesHTML}
                    </div>
                </div>
                <button class="btn-primary" id="add-to-cart-btn" data-id="${product.id}">Adicionar ao Carrinho</button>
                <small id="modal-error" style="color:red; display:none; margin-top:10px;">Por favor, selecione um tamanho.</small>
            </div>
        `;
        
        // Abre o modal
        modalBackdrop.style.display = "block";
        productModal.classList.add("active");

        // Adiciona evento ao botão "Adicionar ao Carrinho" DENTRO do modal
        document.getElementById("add-to-cart-btn").addEventListener("click", () => {
            const selectedSize = document.querySelector('input[name="size-selector"]:checked');
            if (selectedSize) {
                addToCart(product, selectedSize.value);
                closeProductModal();
            } else {
                // Mostra erro se nenhum tamanho for selecionado
                document.getElementById("modal-error").style.display = "block";
            }
        });
    }

    function closeProductModal() {
        modalBackdrop.style.display = "none";
        productModal.classList.remove("active");
    }
    if (productModalCloseBtn) productModalCloseBtn.addEventListener("click", closeProductModal);


    // --- LÓGICA DO CARRINHO ---
    
    function addToCart(product, size) {
        // Gera um ID único para o item no carrinho (produto + tamanho)
        const cartItemId = `id${product.id}-size${size}`;
        
        // Verifica se o item (com esse tamanho) já está no carrinho
        const existingItem = cart.find(item => item.cartId === cartItemId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                cartId: cartItemId,
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: size,
                quantity: 1
            });
        }
        
        updateCart();
    }
    
    function removeFromCart(cartId) {
        cart = cart.filter(item => item.cartId !== cartId);
        updateCart();
    }
    
    function updateCart() {
        // Atualiza o contador do ícone
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalItems;
        
        // Atualiza a lista no modal do carrinho
        renderCartItems();
    }
    
    function renderCartItems() {
        cartItemsList.innerHTML = ""; // Limpa a lista
        
        if (cart.length === 0) {
            // Mensagem de carrinho vazio (tratada pelo CSS :empty)
            return;
        }

        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.className = "cart-item";
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Tamanho: ${item.size} | Qtd: ${item.quantity}</p>
                    <p class="price">${formatPrice(item.price * item.quantity)}</p>
                </div>
                <button class="cart-item-remove" data-cartid="${item.cartId}">&times;</button>
            `;
            cartItemsList.appendChild(itemElement);
        });

        // Adiciona evento aos botões de remover
        document.querySelectorAll(".cart-item-remove").forEach(button => {
            button.addEventListener("click", (e) => {
                removeFromCart(e.target.dataset.cartid);
            });
        });
        
        // Atualiza o total no modal
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotalItems.textContent = totalItems;
    }
    
    function openCartModal() {
        renderCartItems();
        modalBackdrop.style.display = "block";
        cartModal.classList.add("active");
    }
    
    function closeCartModal() {
        modalBackdrop.style.display = "none";
        cartModal.classList.remove("active");
    }
    
    if (openCartBtn) openCartBtn.addEventListener("click", openCartModal);
    if (cartModalCloseBtn) cartModalCloseBtn.addEventListener("click", closeCartModal);

    // Fecha modais ao clicar no fundo
    if (modalBackdrop) modalBackdrop.addEventListener("click", () => {
        closeProductModal();
        closeCartModal();
    });

    // --- LÓGICA DO CHECKOUT WHATSAPP ---
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Seu carrinho está vazio!");
                return;
            }

            let message = "Olá, Tutu Store! 🛍️\nGostaria de finalizar meu pedido:\n\n";
            let totalPedido = 0;

            cart.forEach(item => {
                message += `*Produto:* ${item.name}\n`;
                message += `*Tamanho:* ${item.size}\n`;
                message += `*Qtd:* ${item.quantity}\n`;
                message += `*Preço:* ${formatPrice(item.price * item.quantity)}\n`;
                message += "---------------------\n";
                totalPedido += item.price * item.quantity;
            });

            message += `\n*Total do Pedido:* ${formatPrice(totalPedido)}`;
            
            const whatsappLink = `https://wa.me/${seuNumeroWhatsApp}?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        });
    }

    // --- LÓGICA DE CARREGAMENTO DAS PÁGINAS ---

    // Página Inicial
    if (document.body.contains(document.getElementById("featured-feminino"))) {
        loadFeaturedProducts("feminino", "#featured-feminino", 4);
        loadFeaturedProducts("masculino", "#featured-masculino", 4);
        loadFeaturedProducts("plus-size", "#featured-plus-size", 4);
    }

    function loadFeaturedProducts(category, containerId, limit) {
        const container = document.querySelector(containerId);
        if(!container) return;
        const categoryProducts = products.filter(p => p.category === category).slice(0, limit);
        
        categoryProducts.forEach(product => {
            container.appendChild(createProductCard(product));
        });
    }

    // Páginas de Categoria
    const productListContainer = document.getElementById("product-list");
    if (productListContainer) {
        const pageTitle = document.title.toLowerCase();
        let currentCategory = "";

        if (pageTitle.includes("feminina")) currentCategory = "feminino";
        else if (pageTitle.includes("masculina")) currentCategory = "masculino";
        else if (pageTitle.includes("plus size")) currentCategory = "plus-size";
        
        loadCategoryProducts(currentCategory);
        
        // Filtros
        const filterCheckboxes = document.querySelectorAll(".filter-check");
        filterCheckboxes.forEach(check => {
            check.addEventListener("change", applyFilters);
        });
    }

    function loadCategoryProducts(category) {
        const container = document.getElementById("product-list");
        container.innerHTML = "";
        const categoryProducts = products.filter(p => p.category === category);
        
        if(categoryProducts.length === 0) {
            container.innerHTML = "<p>Nenhum produto encontrado nesta categoria.</p>";
            return;
        }
        categoryProducts.forEach(product => {
            container.appendChild(createProductCard(product));
        });
    }

    function applyFilters() {
        // (Lógica de filtro igual à versão anterior)
        const productCards = document.querySelectorAll("#product-list .product-card");
        const checkedFilters = Array.from(document.querySelectorAll(".filter-check:checked")).map(cb => cb.value);

        productCards.forEach(card => {
            if (checkedFilters.length === 0) {
                card.style.display = "block";
                return;
            }
            const productTags = card.dataset.tags.split(',');
            const hasMatchingTag = checkedFilters.some(filterTag => productTags.includes(filterTag));

            if (hasMatchingTag) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // --- LÓGICA DO CARROSSEL ---
    // (Igual à versão anterior)
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.querySelector(".carousel-control.prev");
    const nextBtn = document.querySelector(".carousel-control.next");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) slide.classList.add("active");
        });
    }
    function nextSlide() { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); }
    function prevSlide() { currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide); }

    if (slides.length > 0) {
        if(prevBtn) prevBtn.addEventListener("click", prevSlide);
        if(nextBtn) nextBtn.addEventListener("click", nextSlide);
        setInterval(nextSlide, 7000);
    }
    
    // Ativa os ícones do Feather
    feather.replace();

});