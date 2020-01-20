import {getBooksFromLocalStorage,saveBooks,deleteBook,findBookById} from "./common";

let formElem = document.querySelector('form');
let books = getBooksFromLocalStorage();
let bookId;
const isIdExist = location.search.split('?id=');

/**
 *
 * @param data - book to add
 */
const addBook = (data) => {
    if (data && !data.id) {
        data.id = `Id${Math.floor(Math.random() * (1000000))}`;
    }
    books.push(data);
    saveBooks(books);
}

/**
 *
 * @param form - data collection form
 * @returns [] - form data collection
 */
const serializeForm = (form) => {
    let obj = {};
    obj.photos = [];
    for (let i = form.elements.length - 1; i >= 0; i--) {

        if (form.elements[i].type === 'text') {
            if (form.elements[i].getAttribute('name') == 'photo') {
                obj.photos.push(form.elements[i].value);
            } else obj[form.elements[i].name] = form.elements[i].value;
        }
    }
    return obj;
}

/**
 * render new input for add photo
 */
const renderInputForAddPhoto = () => {
    let elem = document.createElement('input');
    elem.type = 'text';
    elem.placeholder = 'добавить фото';
    elem.setAttribute('name', 'photo');
    let photosElem = document.querySelector('.photos');
    photosElem.appendChild(elem)
}

/**
 *
 * @param form
 * @param obj
 */
const initForm =(form, obj) => {
    let numberPhoto = 0;
    if (obj.id) {
        form.dataset.bookId = obj.id;
    }
    document.querySelector('.photos').innerHTML = '';
    for (let i = 0; i < obj.photos.length; i++) {
        renderInputForAddPhoto();
        console.log(obj.photos)
    }
    for (let i = form.elements.length - 1; i >= 0; i--) {
        if (form.elements[i].type === 'text') {
            if (form.elements[i].getAttribute('name') == 'photo') {
                form.elements[i].value = obj.photos[numberPhoto];
                numberPhoto++;
            } else form.elements[i].value = obj[form.elements[i].name];
        }
    }
}

const onSubmitForm =(form) => {
    let obj = serializeForm(form);

    if (Object.values(obj).some(value => {
        if (Array.isArray(value)) {
            return value.some( elem => !elem)
        } else {
            return !value;
        }
    })) {
        alert('Заполнены не все поля!');
        return;
    }
    if ('bookId' in form.dataset) {
        let id = formElem.dataset.bookId;
        obj.id = id;
        deleteBook(id,books);
        addBook(obj)
    } else addBook(obj);
    location.href = '/';
}

if (isIdExist && isIdExist.length) {
    bookId = isIdExist[1];
}

if (bookId) {
    initForm(formElem, findBookById(bookId, books));
    formElem.querySelector('input[type="submit"]').value = 'Изменить'
}


formElem.addEventListener('submit', function (e) {
    e.preventDefault();
    onSubmitForm(this);
});

document.querySelector('.add_photo').addEventListener('click', function (e) {
    e.preventDefault();
    renderInputForAddPhoto()
});