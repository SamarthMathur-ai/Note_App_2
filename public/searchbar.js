const searchBar = document.querySelector("#searchbar");
let string = "";
searchBar.addEventListener('input', async (e)=>{
    const searchText = e.target.value;
    console.log(searchText);

    const response = await fetch(`/?q=${searchText}`);

    const result = await response.json();



    const notesContainer = document.querySelector('#savedContChild');
    // ? clearing the inner HTML code
    notesContainer.innerHTML = '';

    // ? iterating through response
    result.forEach(note=>{
        // ? Rebuilding the HTML Structure for each card
        const noteCard = `
        <div class="actualSavedCont" data-id="${note.id}">
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <div>
                <button class="open-btn" onclick="window.onButton('${note.id}')">open</button>
            </div>
        </div>
        `;

        notesContainer.insertAdjacentHTML('beforeend', noteCard);
    })
})