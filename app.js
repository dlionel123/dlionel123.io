//variables
const cartBtn = document.queryCommandValue('.cart-btn');
const closeCartBtn = document.queryCommandValue('.close-cart');
const ClearCartBtn = document.queryCommandValue('.clear-cart');
const cartDOM = document.queryCommandValue('.cart');
const cartOverlay = document.queryCommandValue('.cart-overlay');
const cartItems = document.queryCommandValue('.cart-items');
const cartTotal = document.queryCommandValue('.cart-total');
const cartContent = document.queryCommandValue('.cart-content');
const productsDOM = document.querySelector(".products-center");
const btns = document.querySelectorAll('.bag-btn');
//cart 
let cart = [];

//getting products
class Products{
async getProducts(){
    try{
        let result = await fetch('products.json');
        let data = await result.json();
        
        let products = data.items;
        products = products.map(item => {
            const { title, price } = item.fields;
            const { id } = item.sys;
            const image = item.fields.image.fields.file.url;
            return { title, price, id, image }
        })
        console.log(products);
        return products;
    }
    catch (error){
        console.log(error);
    }
    
}
}
//Display Products
class UI {
    displayProducts(products){
    let result = "";
    products.forEach(products => {
        result += `
        <!-- single product -->
            <article class="product">
            <div class="img-container">
                <img
                src=${products.image}
                alt="product"
                class="product-img"
                />
                <button class="bag-btn" data-id=${products.id}>
                <i class="fas fa-shopping-cart"></i>
                add to bag
                </button>
            </div>
            <h3>${products.title}</h3>
            <h4>$${products.price}</h4>
            </article>
            <!-- end of single product -->
        `;
    })
    productsDOM.innerHTML = result;
    }
    getBagButtons(){
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if(inCart){
                button.innerText = "In Cart";
                button.disabled = true;
            }
                button.addEventListener('click', (event)=>{
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                    //get product from products
                    //add products to the cart
                    //save cart in local storage
                    //set cart values
                    //display cart item
                    //show the cart
                })
        })
    }
}
//local storage
class Storage{
    static saveProducts(products){
        localStorage.setItem("products", JSON.stringify(products));
    }
}
document.addEventListener("DOMContentLoaded", () => {
const ui = new UI();
const products = new Products();

//get all products
products.getProducts().then(products => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
}).then(() => {
    ui.getBagButtons();
});
});
