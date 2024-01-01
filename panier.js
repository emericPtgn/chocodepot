let panier = document.querySelector(".panier");

panier.addEventListener("click", () => {cartElement.classList.toggle("visible")});


let cartElement = document.getElementById("cart");
var displayCartNbItems = document.getElementById("cartNbItems")

var state = {
    cartNbItems : JSON.parse(localStorage.getItem("cartNbItems")),
    selectedCategory: ["all"],
    minPrice: 1,
    maxPrice: 20,
    minNote: 1,
    maxNote: 5,
    cartContent : []
};


function updateLocalStorage(product) {

    console.log("updateLocalStorage s'execute");
    let existingProducts = JSON.parse(localStorage.getItem("productToCart")) || [];
    let existingProductIndex = existingProducts.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {

        existingProducts[existingProductIndex].qte +=1

    } else {

        existingProducts.push({
            id: product.id,
            image: product.image,
            title: product.title,
            price: product.price,
            note: product.note,
            qte: 1

        });

        state.cartNbItems += 1
    }

    localStorage.setItem("productToCart", JSON.stringify(existingProducts));
    localStorage.setItem("cartNbItems", state.cartNbItems )
    loadCartFromLocalStorage()
}

function loadCartFromLocalStorage() {

    let cartNbItems = JSON.parse(localStorage.getItem("cartNbItems")) || [];
    
    console.log(cartNbItems)
    let test = document.getElementById("cartNbItems")
    test.innerHTML = cartNbItems

    let existingItems = document.querySelectorAll(".cartItem")
    if(existingItems){existingItems.forEach(item => {
        item.remove(item)
    })}

    let storedCart = JSON.parse(localStorage.getItem("productToCart")) || [];
    console.log(storedCart)
    storedCart.forEach(product => {
        displayCartFromLocalStorage(product);
        updateTotal()
    });

}
 loadCartFromLocalStorage()

function displayCartFromLocalStorage(product) {

    console.log(product)

    let cartContent = document.getElementById("cartBody");

    let itemImage = product.image;
    let itemTitle = product.title;
    let itemPrice = product.price;
    let itemId = product.id;
    let itemQte = product.qte;

    let itemContainer = document.createElement("div");
    let itemImageContainer = document.createElement("img");
    let itemInfo = document.createElement("div");
    let itemTitleContainer = document.createElement("p");
    let itemPriceContainer = document.createElement("span");
    let removeFromCart = document.createElement("span");
    removeFromCart.innerHTML = "&times;"

    itemContainer.classList.add("cartItem");
    itemImageContainer.classList.add("cartItemImage");
    itemInfo.classList.add("itemInfo");
    removeFromCart.classList.add("#closeButton")

    itemImageContainer.src = itemImage;
    itemTitleContainer.innerHTML = itemTitle;

    itemPriceContainer.dataset.price = itemPrice.toFixed(2);
    itemPriceContainer.textContent = ` ${itemPrice.toFixed(2)}€ `;

    itemInfo.appendChild(itemTitleContainer);
    itemInfo.appendChild(itemPriceContainer);
    itemContainer.appendChild(removeFromCart);
    itemContainer.appendChild(itemImageContainer);
    itemContainer.appendChild(itemInfo);
    itemContainer.dataset.id = itemId;


    let quantitySelector = createQuantitySelector();
    quantitySelector.addEventListener("change", (event) => {
        let selectorValue = event.target.value;
    
        let existingProducts = JSON.parse(localStorage.getItem("productToCart")) || [];
        let existingProductIndex = existingProducts.findIndex(p => p.id === product.id);
    
        if (existingProductIndex !== -1) {
            existingProducts[existingProductIndex].qte = parseInt(selectorValue);
        }
    
        localStorage.setItem("productToCart", JSON.stringify(existingProducts));
        updateTotal()

    });
    
    quantitySelector.value = itemQte; 
    console.log(itemQte)
    quantitySelector.dataset.qte = quantitySelector.value


    itemContainer.appendChild(quantitySelector);
    console.log(state.cartNbItems)
    cartContent.appendChild(itemContainer);

    removeFromCart.addEventListener("click", () => {
        console.log("supprimer cartItem");
        state.cartNbItems = state.cartNbItems - 1
        localStorage.setItem("cartNbItems", state.cartNbItems )
        displayCartNbItems.innerHTML = state.cartNbItems
        cartContent.removeChild(itemContainer);

        let existingProducts = JSON.parse(localStorage.getItem("productToCart")) || [];
        let existingProductIndex = existingProducts.findIndex(p => p.id === product.id);
        if(existingProductIndex !== 1){
            existingProducts.splice(existingProductIndex, 1)
        }
        localStorage.setItem("productToCart", JSON.stringify(existingProducts));
        
        loadCartFromLocalStorage();

        updateTotal();

    });

    localStorage.setItem("cartContent", JSON.stringify(product));
    state.cartContent = localStorage.getItem("cartContent");
    console.log(state.cartContent)
}


function createQuantitySelector() {
    let quantitySelector = document.createElement("select");
    quantitySelector.classList.add("quantitySelector");

    for (let i = 1; i <= 50; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i;
        quantitySelector.appendChild(option);

    }
    
    return quantitySelector;
}


function updateTotal() {
    let cartItems = document.querySelectorAll(".cartItem");
    let total = 0;

    cartItems.forEach(cartItem => {
        let itemPriceElement = cartItem.querySelector(".itemInfo span[data-price]");
        let quantityElement = cartItem.querySelector(".quantitySelector");
        console.log("quantityElement:", quantityElement);

        if (itemPriceElement && quantityElement) {
            let itemPrice = parseFloat(itemPriceElement.dataset.price);
            console.log("itemPrice:", itemPrice);


            let quantity = parseInt(quantityElement.value);


            if (!isNaN(itemPrice) && !isNaN(quantity)) {
                total += itemPrice * quantity;
            } else {
                console.error("Invalid itemPrice or quantity");
            }
        }
    });

    document.getElementById("cartTotal").innerText = `Total : ${total.toFixed(2)}€`;
    return total
}

function setupResetCartButton() {
    let resetCartButton = document.getElementById("resetCart");
    if (resetCartButton) {
        resetCartButton.addEventListener("click", () => {
            let displayCartNbItems = document.getElementById("cartNbItems")
            console.log(displayCartNbItems)
            state.cartNbItems = 0
            localStorage.setItem("cartNbItems", state.cartNbItems )
            displayCartNbItems.innerHTML = ''
            console.log("resetCart called");

            const cartContent = document.getElementById("cartBody");
            cartContent.innerHTML = "";

            localStorage.removeItem("productToCart");
            loadCartFromLocalStorage()

            updateTotal();
        }

        );
    }
}

const closeBtn = document.getElementById("closeButton");
closeBtn.addEventListener("click", ()=>{
    cartElement.classList.toggle("visible");
})
