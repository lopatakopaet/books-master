import Slider from "./Slider";
import {getBooksFromLocalStorage, saveBooks, deleteBook, findBookById} from "./common";

let books = [];

/**
 *
 * @returns {Promise<{publishing_house: (*|string), address: string, data: *, phone: (Document.phone|string|string|*),
 * author: string, theme: string | string[] | string, id: *, photos: *, name_book: *}[] | never>}
 */
function getBooksFromServer() {
    return fetch('https://www.googleapis.com/books/v1/volumes?q=Незнайка')
        .then(res => res.json())
        // .then(res=> console.log(res))
        .then(res => res.items.map(elem => {
            return {
                id: elem.id,
                theme: elem.volumeInfo.categories || 'не указана',
                phone: elem.volumeInfo.phone || 'не указан',
                address: 'не указан',
                publishing_house: elem.volumeInfo.publisher || 'не указано',
                data: elem.volumeInfo.publishedDate,
                author: elem.volumeInfo.authors ? elem.volumeInfo.authors.join(', ') : 'не указан',
                photos: elem.volumeInfo.imageLinks ? [`${elem.volumeInfo.imageLinks.thumbnail}`] : ['https://avatars.mds.yandex.net/get-pdb/1880804/af15630e-6989-45a4-8b37-d031bb7d8139/s375'],
                name_book: elem.volumeInfo.title,
            }
        }))
}

/**
 *
 * @param {{photos: string[]}} book
 * @returns {array} - of photos
 */
function getPhotos(book) {
    return book.photos.slice();
}

/**
 *
 * @param {array} books - an array of  books
 */
function renderBooksList(books) {
    let booksListElem = document.querySelector('.books_list');
    booksListElem.innerHTML = '';
    books.forEach(elem => renderBook(booksListElem, elem))
}

/**
 *
 * @param parentElem - place to render book
 * @param book - book for render
 */
function renderBook(parentElem, book) {
    let node = document.createElement('div');
    node.classList.add('book_block');
    node.innerHTML = `
            <div class="book_left-section">
                <div class="book_photo_wrap">
                    <img class="book_img" src="${getPhotos(book)[0]}" alt="photo" data-id ='${book.id}'> 
                </div>
                <input class="change_book_btn" type="button" value="Редактировать" data-id ='${book.id}'>
                <input class="delete_book_btn" type="button" value="Удалить" data-id ='${book.id}'>
            </div>
            <div class="book_info"  >
                <p><span class="bold">Название книги:</span> <span class="cursive grey">"${book.name_book}"</span></p>
                <p><span class="bold">Рубрика:</span> ${book.theme}</p>
                <p><span class="cursive">Автор(ы): ${book.author}</span></p>
                <p><span class="bold">Издательство:</span> ${book.publishing_house}</p>
                <p><span class="bold">Адрес издательства:</span> ${book.address}</p>
                <p><span class="bold">Телефон издательства:</span> ${book.phone}</p>
                <p><span class="bold">Дата издательства:</span> ${book.data}</p>
            </div>
        `;
    parentElem.appendChild(node);
}

/**
 *
 * @param name - book name
 * @returns {*[]} - found books
 */
function findBooksByName(name) {
    return books.filter(book => book.name_book.toLowerCase().indexOf(name.toLowerCase()) !== -1);
}

if (localStorage.getItem('books') == null) {
    return getBooksFromServer()
        .then(res => {
            renderBooksList(res);
            saveBooks(res);
            books = res;
        });
} else {
    books = getBooksFromLocalStorage();
    renderBooksList(books);
}


/**
 * books search event
 */
document.querySelector('.search_input').addEventListener('input', function (e) {
    let books = findBooksByName(this.value);
    renderBooksList(books);
});


document.querySelector('.books_list').addEventListener('click', function (e) {
    let id = e.target.getAttribute('data-id');

    /////delete book/////
    if (e.target.matches('.delete_book_btn')) {
        deleteBook(id, books);
        renderBooksList(books);
    }
    /////edit book/////
    if (e.target.matches('.change_book_btn')) {
        location.href = `/form.html?id=${id}`;
    }
    /////view photo////
    if (e.target.matches('.book_img')) {
        console.log(id);
        let book = findBookById(id, books);
        new Slider(getPhotos(book));
        e.stopPropagation()
    }
});
document.querySelector('.add_book').addEventListener('click', function () {
    location.href = `/form.html`;
});

