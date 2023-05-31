if (window.location.search) {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    fetch("https://striveschool-api.herokuapp.com/books/" + id)
        .then(response => response.json())
        .then(book => {
            details(book);

        })
}

function details(book) {
    let detaille = document.querySelector("#detaille");
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("col-3");
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = book.img;
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let title = document.createElement("h5");
    title.classList.add("card-title");
    title.innerText = book.title;
    let price = document.createElement("p");
    price.classList.add("card-text");
    price.innerText = book.price;


    cardBody.appendChild(title);
    cardBody.appendChild(price);
    card.appendChild(img);
    card.appendChild(cardBody);
    detaille.appendChild(card);

}

