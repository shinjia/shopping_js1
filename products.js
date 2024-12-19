<!-- products.js -->
const PRODUCTS_PER_PAGE = 4;
let currentPage = 1;

function renderProducts(page) {
    const start = (page - 1) * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const productsToShow = PRODUCTS.slice(start, end);

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    productsToShow.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            ${product.description}
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

function renderPagination() {
    const totalPages = Math.ceil(PRODUCTS.length / PRODUCTS_PER_PAGE);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? "active" : "";
        pageButton.onclick = () => {
            currentPage = i;
            renderProducts(currentPage);
            renderPagination();
        };
        pagination.appendChild(pageButton);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderProducts(currentPage);
    renderPagination();
});
