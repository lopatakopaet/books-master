import Slider from './Slider';

const isLocalSource = true;
let booksArr = [
    {
        id: 1,
        theme: 'фэнтези',
        phone: '1122334455',
        address: 'Польша, Варшава',
        publishing_house: 'superNOWA',
        data: '1996',
        author: 'Анджей Сапковский',
        photos: [
            'https://images.ua.prom.st/1118160546_w640_h640_vedmak-krov.jpg',
            'https://www.onthebus.com.ua/wa-data/public/shop/products/28/13/1328/images/3790/3790.0x970.jpg',
            'https://games-reviews.net/_pu/11/65989418.jpg'],
        name_book: 'Кровь эльфов'
    },
    {
        id: 2,
        theme: 'Сказка, Юмор, Детская литература, Фэнтези',
        phone: '22222222222',
        address: 'США',
        publishing_house: 'Alfred A. Knopf, Inc (США)',
        data: '17 января 1964',
        author: 'Роальд Даль',
        photos: ['https://img.yakaboo.ua/media/catalog/product/cache/1/image/398x565/234c7c011ba026e66d29567e1be1d1f7/i/m/img358_1_37.jpg',
                'https://i2.rozetka.ua/goods/11644551/14680424_images_11644551513.jpg'],
        name_book: 'Чарли и шоколадная фабрика'
    },
    {
        id: 3,
        theme: 'Научная фантастика',
        phone: '1111111111111',
        address: 'Соединенные Штаты Америки',
        publishing_house: 'Doubleday',
        data: '1956 г.',
        author: 'Роберт Энсон Хайнлайн',
        photos: ['https://s3-goods.ozstatic.by/2000/455/606/10/10606455_0.jpg'],
        name_book: 'Дверь в лето'
    },
    {
        id: 4,
        theme: 'Научная фантастика, Фэнтези',
        phone: '3333333333333333',
        address: 'Москва, Звездный бульв., д.21',
        publishing_house: 'АСТб Астрель',
        data: '2002 г.',
        author: ' Борис Натанович Стругацкий, Аркадий Натанович Стругацкий',
        photos: ['http://www.rulit.me/data/programs/images/trudno-byt-bogom-sbornik_423803.jpg'],
        name_book: 'Трудно быть богом'
    }
];
if(localStorage.getItem('books') == null){
    setBooks(booksArr);
}
function setBooks(books) {
    setBooksToLocalStorage(books);
}

function setBooksToLocalStorage(books) {
    books = JSON.stringify(books);
    localStorage.setItem('books', books);
}

function getBooks() {
    if (isLocalSource) {
        return getBooksFromLocalStorage();
    } else {
        return getBooksFromServer();
    }
}

function getBooksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('books'));
}

function getBooksFromServer() {
    return fetch('/books')
        .then(res => res.json());
}

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

function renderBooksList(books) {
    let booksListElem = document.querySelector('.books_list');
    booksListElem.innerHTML = '';
    books.forEach(elem => renderBook(booksListElem, elem))
}

function deleteBookFromLocalStorage(id) {
    let allBooks = getBooks();
    let index = allBooks.findIndex(elem => elem.id === +id);
    if (index !== -1) {
        allBooks.splice(index, 1);
        setBooks(allBooks);
    }
}

function deleteBook(id) {
    deleteBookFromLocalStorage(id);
}

function findBookById(id) {
    return getBooks().find(elem => elem.id === +id);
}

function findBooksByName(name) {
    return getBooks().filter(book => book.name_book.toLowerCase().indexOf(name.toLowerCase()) !== -1);
}
function getPhotos(book) {
    return book.photos.slice();
}

document.querySelector('.books_list').addEventListener('click', function (e) {
    let id = e.target.getAttribute('data-id');

    ///////Удаление книги/////
    if (e.target.matches('.delete_book_btn')) {
        deleteBook(id);
        renderBooksList(getBooks());
    }
    /////Редактирование книги////
    if (e.target.matches('.change_book_btn')) {
        location.href = `/form.html?id=${id}`;
    }
    ////Просмотр фото////
    if (e.target.matches('.book_img')) {
        let book = findBookById(id);
        new Slider(getPhotos(book));
        e.stopPropagation()
    }
});
///Переход на страницу добавления книги///
document.querySelector('.add_book').addEventListener('click', function () {
    location.href = `/form.html`;
});

document.querySelector('.search_input').addEventListener('input', function (e) {
    let books = findBooksByName(this.value);
    renderBooksList(books);
});



renderBooksList(getBooks());
