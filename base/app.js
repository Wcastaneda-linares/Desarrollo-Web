const container = document.querySelector("#contenedor");
const modalBody = document.querySelector(".modal .modal-body");
const containerShoppingCart = document.querySelector("#carritoContenedor");
const removeAllProductsCart = document.querySelector("#vaciarCarrito");
const keepBuy = document.querySelector("#procesarCompra");
const totalPrice = document.querySelector("#precioTotal");
const activeFunction = document.querySelector("#activarFuncion");
const fakeStoreApi = "https://fakestoreapi.com/products";
let shoppingCart = [];
let productList = [];
let counter = 0;
let quantity = [];

const fetchProducts = async () => {
  try {
    const response = await fetch(fakeStoreApi);
    if (!response.ok) {
      throw new Error("No se pudo conectar");
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
};

const addProductsContainer = (product) => {
  const { id, title, image, price, description } = product;
  container.innerHTML += `
  <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text" style="font-weight: bold">$ ${price}</p>
      <p class="card-text">• ${description}</p>
      <button class="btn btn-primary" onclick="addProduct(${id})">Comprar producto</button>
    </div>
  </div>
  `;
};

const getProducts = async () => {
  const products = await fetchProducts();
  productList = products;
  filterByCategory("all");
};

const addProduct = (id) => {
  const testProductId = shoppingCart.some((item) => item.id === id);
  if (testProductId) {
    Swal.fire({
      title: "Este producto ya fue seleccionado",
      text: "Por favor seleccione otro producto",
      icon: "success",
    });
    return;
  }
  shoppingCart.push({
    ...productList.find((item) => item.id === id),
    quantity: 1,
  });
  showShoppingCart();
};

const showShoppingCart = () => {
  modalBody.innerHTML = "";
  shoppingCart.forEach((product) => {
    const { title, image, price, id } = product;
    modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
          <img class="img-fluid img-carrito" src="${image}"/>
        </div>
        <div>
          <p style="font-weight: bold">${title}</p>
          <p style="font-weight: bold">Precio: R$ ${price}</p>
          <div>
            <button onclick="removeProducts(${id})" class="btn btn-danger">Eliminar producto</button>
          </div>
        </div>
      </div>
    `;
  });
  totalPriceInCart(totalPrice);
  messageEmptyShoppingCart();
  containerShoppingCart.textContent = shoppingCart.length;
  setItemInLocalStorage();
};

const removeProducts = (id) => {
  const index = shoppingCart.findIndex((item) => item.id === id);
  if (index !== -1) {
    shoppingCart.splice(index, 1);
    showShoppingCart();
  }
};

removeAllProductsCart.addEventListener("click", () => {
  shoppingCart.length = [];
  showShoppingCart();
});

const messageEmptyShoppingCart = () => {
  if (shoppingCart.length === 0) {
    modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">No hay nada en el carrito!</p>
    `;
  }
};

keepBuy.addEventListener("click", () => {
  if (shoppingCart.length === 0) {
    Swal.fire({
      title: "Su carrito está vacío",
      text: "Agregue algo al carrito para continuar",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    location.href = "index.html";
    finalOrder();
  }
});

const totalPriceInCart = (totalPriceCart) => {
  totalPriceCart.innerText = shoppingCart.reduce((acc, prod) => {
    return acc + prod.price;
  }, 0);
};

const setItemInLocalStorage = () => {
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
};

const categoryFilter = document.querySelector("#categoryFilter");
categoryFilter.addEventListener("change", function () {
  const selectedCategory = this.value;
  filterByCategory(selectedCategory);
});

function filterByCategory(category) {
  if (category === "all") {
    productList.forEach(addProductsContainer);
  } else {
    const filteredProducts = productList.filter(
      (product) => product.category === category
    );
    container.innerHTML = "";
    filteredProducts.forEach(addProductsContainer);
  }
}

const addItemInLocalStorage = () => {
  shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  setItemInLocalStorage();
  showShoppingCart();
};

document.addEventListener("DOMContentLoaded", addItemInLocalStorage);
getProducts();

// Actualizar producto por ID
const actualizarProducto = () => {
  const productIdToUpdate = parseInt(document.querySelector("#productIdToUpdate").value);
  const productNameToUpdate = document.querySelector("#productNameToUpdate").value;
  const productDescriptionToUpdate = document.querySelector("#productDescriptionToUpdate").value;
  const productPriceToUpdate = parseFloat(document.querySelector("#productPriceToUpdate").value);

  const productIndex = productList.findIndex((product) => product.id === productIdToUpdate);

  if (productIndex !== -1 && productNameToUpdate && !isNaN(productPriceToUpdate)) {
    productList[productIndex].title = productNameToUpdate;
    productList[productIndex].description = productDescriptionToUpdate;
    productList[productIndex].price = productPriceToUpdate;
    container.innerHTML = "";
    productList.forEach(addProductsContainer);
    Swal.fire({
      title: "Producto actualizado",
      text: "El producto se ha actualizado correctamente.",
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Error",
      text: "No se pudo actualizar el producto. Verifique los datos ingresados.",
      icon: "error",
    });
  }
};

document.querySelector("#actualizarProducto").addEventListener("click", actualizarProducto);

// Eliminar producto por ID
const eliminarProducto = () => {
  const productIdToDelete = parseInt(document.querySelector("#productIdToDelete").value);
  const productIndex = productList.findIndex((product) => product.id === productIdToDelete);

  if (productIndex !== -1) {
    productList.splice(productIndex, 1);
    container.innerHTML = "";
    productList.forEach(addProductsContainer);
    Swal.fire({
      title: "Producto eliminado",
      text: "El producto se ha eliminado correctamente.",
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Error",
      text: "No se encontró el producto con el ID proporcionado.",
      icon: "error",
    });
  }
};

document.querySelector("#eliminarProducto").addEventListener("click", eliminarProducto);

// Agregar nuevo producto
const agregarProducto = () => {
  const productName = document.querySelector("#productName").value;
  const productDescription = document.querySelector("#productDescription").value;
  const productPrice = parseFloat(document.querySelector("#productPrice").value);

  if (productName && !isNaN(productPrice)) {
    const newProduct = {
      id: productList.length + 1,
      title: productName,
      description: productDescription,
      price: productPrice,
      image: "https://via.placeholder.com/150", // Debes proporcionar una URL de imagen válida.
    };

    productList.push(newProduct);
    container.innerHTML = "";
    productList.forEach(addProductsContainer);
    Swal.fire({
      title: "Producto agregado",
      text: "El nuevo producto se ha agregado correctamente.",
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Error",
      text: "No se pudo agregar el producto. Verifique los datos ingresados.",
      icon: "error",
    });
  }
};

document.querySelector("#agregarProducto").addEventListener("click", agregarProducto);

// Ordenar productos por nombre
const ordenarProductosButton = document.getElementById("ordenarProductosButton");

ordenarProductosButton.addEventListener("click", () => {
  ordenarProductosPorNombre();
});

const ordenarProductosPorNombre = () => {
  const productosOrdenados = [...productList];

  productosOrdenados.sort((a, b) => {
    const tituloA = a.title.toUpperCase();
    const tituloB = b.title.toUpperCase();
    if (tituloA < tituloB) {
      return -1;
    }
    if (tituloA > tituloB) {
      return 1;
    }
    return 0;
  });

  container.innerHTML = "";
  productosOrdenados.forEach(addProductsContainer);
};
