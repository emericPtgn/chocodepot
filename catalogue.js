const catalogContainer = document.getElementById("catalog");

window.addEventListener("load", () => {

    let allProducts = [];


    fetch("products.json")

        .then(response => {
            if (!response.ok) {
                throw new Error("Not ok");
            }
            return response.json();
        })

        .then(products => {
            allProducts = products;
            displayProducts(allProducts);
            loadCartFromLocalStorage()
            updateTotal();
            setupResetCartButton()
        })

        .catch(error => {

            console.error("Fetch error:", error);

        });
    
    const categoryContainer = document.querySelectorAll("input[type='checkbox']");
    const categories = [...categoryContainer];
    const filters = [
        
        ...categories,
        document.getElementById("prix-min"),
        document.getElementById("prix-max"),
        document.getElementById("note-min"),
        document.getElementById("note-max")
    ];

    categories[0].checked = true;
    document.getElementById("prix-min").value = 1
    document.getElementById("prix-max").value = 20
    document.getElementById("note-min").value = 1
    document.getElementById("note-max").value = 5

    filters.forEach(filter =>
        filter.addEventListener("input", () => {
            updateCatalog();
        })
    );

    function updateCatalog() {
        
        state.selectedCategory = categories.filter(category => category.checked).map(category => category.value);
        state.minPrice = parseFloat(document.getElementById("prix-min").value) || 0;
        state.maxPrice = parseFloat(document.getElementById("prix-max").value) || Number.MAX_SAFE_INTEGER;
        state.minNote = parseInt(document.getElementById("note-min").value) || 1;
        state.maxNote = parseInt(document.getElementById("note-max").value) || 5;

        let filteredProduct;

        if (state.selectedCategory.includes("all")) {
            filteredProduct = allProducts.filter(product => {
                const filteredPrice = product.price >= state.minPrice && product.price <= state.maxPrice;
                const filteredNote = product.note >= state.minNote && product.note <= state.maxNote;
                return filteredPrice && filteredNote;
            });
        } else if (state.selectedCategory.length === 0) {
            filteredProduct = [];
        }
        else {
            filteredProduct = allProducts.filter(product => {
                const filteredCategory = state.selectedCategory.length === 0 || state.selectedCategory.some(category => product.category[category]);
                const filteredPrice = product.price >= state.minPrice && product.price <= state.maxPrice;
                const filteredNote = product.note >= state.minNote && product.note <= state.maxNote;
                return filteredCategory && filteredPrice && filteredNote;
            });
        }

        displayProducts(filteredProduct);
    }

    function displayProducts(allProducts) {
        catalogContainer.innerHTML = "";

        allProducts.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("card");

            const productPict = document.createElement("img");
            productPict.src = product.image;
            productPict.addEventListener("click", () => {
                window.location.href = `produit.html?id=${product.id}`;
            });
            productPict.alt = `chocolat chocopapa ${product.title}`

            const productTitle = document.createElement("p");
            productTitle.innerHTML = product.title;
            productTitle.addEventListener("click", ()=>{
                window.location.href = `produit.html?id=${product.id}`;
            })

            const productPrice = document.createElement("p");
            productPrice.classList.add("itemPrice");
            productPrice.innerHTML = product.price.toFixed(2) + "€";

            const productRate = document.createElement("p");
            productRate.innerHTML = `Note : ${product.note}/5`;

            const addCart = document.createElement("button");
            const addCartLink = document.createElement("a");
            const addCartText = document.createTextNode("AJOUTER AU PANIER")
            addCartLink.appendChild(addCartText)
            addCart.appendChild(addCartLink)
            addCart.classList.add("addCartBtn");
            addCart.addEventListener("click", () => {
                console.log("click !")
                updateLocalStorage(product);
            })
            
            productDiv.appendChild(productPict);
            productDiv.appendChild(productTitle);
            productDiv.appendChild(productPrice);
            productDiv.appendChild(productRate);
            productDiv.appendChild(addCart);

            catalogContainer.appendChild(productDiv);
        })};


    function storageAvailable(type) {
        try {
            var storage = window[type],
                x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
                e instanceof DOMException &&
                // everything except Firefox
                (e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === "QuotaExceededError" ||
                    // Firefox
                    e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0
            );
        }
    }

    if (storageAvailable("localStorage")) {
        console.log("Nous pouvons utiliser localStorage")
    } else {
        // Malheureusement, localStorage n'est pas disponible
    }
});
