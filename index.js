const loadAllProducts = async () => {
    const url = 'https://fakestoreapi.com/products';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const setAllMenu = async () => {
    // console.log(loadAllProducts())
    // loadAllProducts()
    //     .then(data => console.log(data))
    const data = await loadAllProducts();
    // console.log(data)
    const menu = document.getElementById('all-menu');
    const uniqueArray = [];
    for (const product of data) {
        // console.log(product.category)

        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category)
            const li = document.createElement('li');
            li.innerHTML = `
            <a>${product.category}</a>
            `
            menu.appendChild(li)
        }

    }

}

setAllMenu()
// loadAllProducts();


const searchFiled = document.getElementById('search-filed');
searchFiled.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        // console.log(searchFiled.value)
        const searchValue = searchFiled.value;
        searchFiled.value = ''// to remove the text of search filed
        const allProducts = await loadAllProducts();
        // console.log(allProducts)
        const foundProducts = allProducts.filter(product => product.category.includes(searchValue))
        // console.log(foundProducts)

        const productsContainer = document.getElementById('products-container');
        productsContainer.textContent = ``;
        const notFound = document.getElementById('not-found');
        notFound.textContent = '';
        // if no product found
        if (foundProducts.length === 0) {
            notFound.innerHTML = `<h2 class = "text-lg text-warning"> No Result Found </h2>`
            return;
        }

        foundProducts.forEach(product => {
            // console.log(product)
            const { category, price, title, image, description } = product
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card card-compact w-full  bg-base-100 shadow-xl">
    <figure><img  class= "h-60 w-full" src="${image}" alt="" /></figure>
    <div class="card-body">
        <h2 class="card-title">${category}</h2>
        <p>${title.length > 20 ? title.slice(0, 30) + '...' : title}</p>
            <div class="card-actions justify-end">
            <label onclick="showModal('${description}', '${image}')" for="my-modal-3" class="btn modal-button btn-primary">Show Details</label>
    
        </div>
    </div>
    </div>
                `
            productsContainer.appendChild(div);
        })

    }
})

const showModal = (description, image) => {
    console.log(description, image)
    const modalContainer = document.getElementById('modal-body');
    modalContainer.innerHTML = `
    <p class="py-4"> ${description} </p>
    <img  class= "h-60 w-full" src="${image}" alt="" />
`
}