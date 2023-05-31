let responseApi;
let shopping_list = [];
let elementToRemove;
let shopIcon = document.querySelector("#shopping");
let modaleRow = document.querySelector("#modale-row");
let bookmarks = document.querySelector("#livres");
async function livre() {

    let request = await fetch("https://striveschool-api.herokuapp.com/books")
    let response = await request.json()
    responseApi = response;
    return responseApi;
}
// Viene utilizzato il metodo .then() per gestire la risposta ottenuta dalla funzione livre(). All'interno della funzione di callback,
livre().then((response) => {
    console.log(response)
    livres(responseApi)
})
// Viene aggiunto un listener per l'evento di click al pulsante shopIcon. Quando il pulsante viene cliccato, 
// viene aggiunta o rimossa la classe CSS "d-none" per mostrare o nascondere la modale.
shopIcon.addEventListener("click", function () {
    modale.classList.toggle("d-none");

})
// La funzione livres viene definita per visualizzare i libri nella pagina.

function livres(liste) {

    bookmarks.innerHTML = "";
    for (const bookmark of liste) {

        let card = document.createElement("div");
        card.classList.add("card");
        card.classList.add("col-3");
        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = bookmark.img;
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerText = bookmark.title;
        let price = document.createElement("p");
        price.classList.add("card-text");
        price.innerText = bookmark.price;
        let btn = document.createElement("button");
        let button = document.createElement("button");
        let details = document.createElement("a");

        btn.classList.add("btn", "addCartBtn");
        btn.classList.add("btn-primary");
        btn.innerText = "Add to cart";
        button.classList.add("btn", "saltaBtn");
        button.classList.add("btn", "btn-success");
        button.innerText = "salta";
        details.classList.add("btn", "detailsBtn", "ms-2");

        details.classList.add("btn", "btn-warning");
        details.innerText = "details";
        details.href="/dettagli.html" + "?id=" + bookmark.asin;
        details.target = "_blank";


        
        

        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(btn);
        cardBody.appendChild(button);
        cardBody.appendChild(details);

        card.appendChild(img);
        card.appendChild(cardBody);
        bookmarks.appendChild(card);


    }

    // Viene aggiunto un listener per l'evento keyup, il quale viene attivato quando viene rilasciato un tasto dopo aver inserito del testo nell'input.
    // All'interno della funzione di callback per l'evento keyup, viene ottenuto il valore dell'input di ricerca utilizzando inputSearch.value.trim(). 
    // Viene quindi controllato se la lunghezza del valore è maggiore o uguale a 3 caratteri.
    let inputSearch = document.querySelector("#inputSearch");
    inputSearch.addEventListener("keyup", function () {
        let inputValue = inputSearch.value.trim();
        if (inputValue.length >= 3) {
            let filteredBooks = responseApi.filter(item => item.title.toUpperCase().includes(inputValue.toUpperCase()))  //filtering the array of objects);
            console.log(responseApi);

            console.log(filteredBooks);

            livres(filteredBooks);
        } else {
            livres(responseApi);
        }

    });
    let buttonSearch = document.querySelector("#searchButton");
    buttonSearch.addEventListener("click", function () {
        console.log(inputSearch.value);
        let filteredBooks = responseApi.filter(item => item.title.toUpperCase().includes(inputSearch.value.toUpperCase()))  //filtering the array of objects);
        console.log(responseApi);

        console.log(filteredBooks);

        livres(filteredBooks);
    });
    shopping();
     saltaBtn();
}
// La funzione shopping viene chiamata per gestire la logica del carrello
function shopping() {
    let cards_ = document.getElementsByClassName("card");
    let addBtn = document.getElementsByClassName("addCartBtn");

    // Viene eseguito un ciclo for per iterare su tutti i pulsanti "Add to cart". All'interno del ciclo, viene aggiunto un listener per l'evento 
    // di click a ciascun pulsante. Quando viene cliccato un pulsante, viene eseguita la funzione di callback.
    for (let i = 0; i < addBtn.length; i++) {
        let z = i;
        addBtn[i].addEventListener("click", function () {
            cards_[z].classList.toggle("show");
            shopping_list.push(cards_[z]);
            console.log(shopping_list);

            // Viene creato un pulsante "Remove" per rimuovere l'elemento dal carrello. Viene aggiunto un listener
            // per l'evento di click al pulsante "Remove" per rimuovere l'elemento corrispondente dal carrello e dalla modale. 
            // L'elemento card viene quindi aggiunto al contenitore della modale (modaleRow). Infine, viene chiamata la funzione livres per aggiornare la visualizzazione dei libri.
            // Viene restituito l'array `
            let removeBtn = document.createElement("button");
            removeBtn.addEventListener("click", (event) => {

                let card = event.target.closest(".card");
                modaleRow.removeChild(card);
            });

            removeBtn.innerText = "remove";
            removeBtn.classList.add("btn", "btn-danger", "ms-1", "p-1");
            cards_[z].appendChild(removeBtn);

            modaleRow.appendChild(cards_[z]);
            livres(responseApi);
        })

    }
    return shopping_list;

}
function saltaBtn() {
    let saltaCard = document.getElementsByClassName("saltaBtn");
    let card_2 = document.getElementsByClassName("card");
    
    for (let i = 0; i < saltaCard.length; i++) {
        // let z = i;
        saltaCard[i].addEventListener("click", function () {


            card_2[i].classList.toggle("d-none");
 })

    }
    console.log(saltaCard);
}
console.log(shopping_list);

function appendBooks(bookList) {
    // Rimuovi tutti i libri precedenti dal modale
    modaleRow.innerHTML = "";

    // Aggiungi i libri aggiornati al modale
    for (const book of bookList) {
        modaleRow.appendChild(book);
    }
}




