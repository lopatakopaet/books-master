/**
 *
 * @param data - an array of books to save in LocalStorage
 */
export function saveBooks(data) {
    localStorage.setItem('books', JSON.stringify(data));
}

/**
 *
 * @returns {any} - books array
 */
export function getBooksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('books'));
}

/**
 *
 * @param id - id books to delete
 * @param books - books array
 */
export function deleteBook(id, books) {
    let index = books.findIndex(elem => elem.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        saveBooks(books);
    }
}

/**
 *
 * @param id - search book id
 * @param data - books array
 * @returns {*} - found book || undefined
 */
export function findBookById(id, data) {
    return data.find(elem => elem.id === id);
}