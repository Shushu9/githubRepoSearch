'use strict'


const inputField = document.querySelector('#input'),
    inputClose = document.querySelector('#close'),
    inputSearch = document.querySelector('#search');

let searchWord = "";

inputClose.addEventListener('click', () => {
    inputField.value = '';
})

function searchRepos() {
    let searchText = inputField.value,
        re = / /gi;
    searchText = searchText.replace(re, '_');

    if (inputField.value !== '') {
        getCards(searchText);
    } else {
        alert('Error: you need type something for search')
    }

}


inputSearch.addEventListener('click', searchRepos);


document.addEventListener('keydown', function (e) {
    if (e.code === "Enter") {
        searchRepos();
    }
});



async function getCards(word) {
    document.querySelector('.wrapper').innerHTML = '';
    await fetch(`https://api.github.com/search/repositories?q=${word} in:name`).then(res => {
        if (res.ok) {
            res.json().then(res => {

                if (res.items.length == 0) {
                    alert('Error: no any repositories with that name')
                } else {
                    renderCards(res.items)
                }

            })
        }
        else {
            alert('Error: no any repositories with that name')
        }
    })

}


function renderCards(item) {

    const cardsContainer = document.querySelector('.wrapper');
    let cardNumber = 0

    while (cardNumber < 10) {
        let elem = item[cardNumber];
        const card = document.createElement('a');
        card.classList.add('card');
        card.href = elem.svn_url;
        card.target = "_blank";

        card.innerHTML = `
            <div class="card__img">
                <img src="${elem.owner.avatar_url}" alt="owner avatar">
            </div>
            <div class="card__info">
                <div class="card__name">Owner/Repository: ${elem.full_name}</div>
                <div class="card__desc">Description: ${elem.description}
                </div>
                <div class="card__lang">Language: ${elem.language}</div>
            </div>
    `;
        cardsContainer.append(card);

        cardNumber++;
    }

}
