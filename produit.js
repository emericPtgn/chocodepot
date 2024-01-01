
window.addEventListener("load", () => {
    let allProducts = [];
    let selectedProduct;



    fetch("products.json")

        .then(response => {
            if (!response.ok) {
                throw new Error("Not ok");
            }
            return response.json();
        })

        .then(products => {
            allProducts = products;
            displayProductPage(allProducts);
            loadCartFromLocalStorage()
            updateTotal();
            setupResetCartButton();
        })

        .catch(error => {
            console.error("Fetch error:", error);
        });

        
        function displayProductPage(allProducts) {

            const params = new URLSearchParams(window.location.search);
            const productId = params.get("id");

            if (!productId || isNaN(productId) || productId < 0 || productId > allProducts.length) {
                console.error("Invalid product ID");
                return;
            } let existingItem = null;
            
            allProducts.forEach(product => {

                if (product.id === productId) {
                    existingItem = product;
                }

            });

            selectedProduct = existingItem;

        
            const imageContainer = document.getElementById("productImage")
            if(imageContainer.firstElementChild){
                imageContainer.removeChild(imageContainer.firstElementChild)};
                
            const productImage = document.createElement("img");
            productImage.src = selectedProduct.image
            imageContainer.appendChild(productImage)
            

            const productTitle = document.createTextNode(`${selectedProduct.title}`)
            const titleContainer = document.getElementById("titleContainer")
            if(titleContainer.firstChild){
                titleContainer.removeChild(titleContainer.firstChild)
            }
            const productTitleContainer = document.createElement("h3");
            productTitleContainer.appendChild(productTitle);
            titleContainer.appendChild(productTitleContainer)
        

            const priceContainer = document.getElementById("productPrice");
            if(priceContainer.firstChild){
                priceContainer.removeChild(priceContainer.firstChild);
            }
            const productPrice = document.createTextNode(`${selectedProduct.price}€`);
            const productPriceContainer = document.createElement("p");
            productPriceContainer.appendChild(productPrice);
            priceContainer.appendChild(productPriceContainer)

            
            const descriptionContainer = document.getElementById("productDescription");
            if(descriptionContainer.firstChild){
                descriptionContainer.removeChild(descriptionContainer.firstChild)
            };
            const descriptionProduit = document.createTextNode(`${selectedProduct.description}`);
            const descriptionProduitContainer = document.createElement("p");
            descriptionProduitContainer.appendChild(descriptionProduit);
            descriptionContainer.appendChild(descriptionProduitContainer)

            const ingredientsContainer = document.getElementById("productIngredients");
            if(ingredientsContainer.firstChild){
                ingredientsContainer.removeChild(ingredientsContainer.firstChild)
            };
            const ingredientsProduits = document.createTextNode(`${selectedProduct.ingredients}`)
            const ingredientsProduitsContainer = document.createElement("p");
            ingredientsProduitsContainer.appendChild(ingredientsProduits);
            ingredientsContainer.appendChild(ingredientsProduitsContainer)

        }



        const addCartBtn = document.getElementById("productCTA");

        addCartBtn.addEventListener("click", () => {

            let qteSelector = document.getElementById("qte")
            let qteSelectorValue = qteSelector.value;

            let existingProducts =  JSON.parse(localStorage.getItem("productToCart")) || [];
            let existingProductIndex = existingProducts.findIndex(p => p.id === selectedProduct.id)

            if (existingProductIndex !== -1){

                let currentValue = existingProducts[existingProductIndex].qte 
                let valueToAdd = qteSelectorValue

                let newValue = parseInt(currentValue) + parseInt(valueToAdd)

                existingProducts[existingProductIndex].qte = newValue

            } else {

                existingProducts.push({

                id: selectedProduct.id,
                image: selectedProduct.image,
                title: selectedProduct.title,
                price: selectedProduct.price,
                note: selectedProduct.note,
                qte: qteSelectorValue

                })

                state.cartNbItems += 1;
            }
            
            localStorage.setItem("cartNbItems", JSON.stringify(state.cartNbItems));
            localStorage.setItem("productToCart", JSON.stringify(existingProducts));
            loadCartFromLocalStorage()
            
        })})
        
        