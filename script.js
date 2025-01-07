const myLibrary = [];

function Books(title, author, pageNumber, id) {
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.id = id;
}

function makeCounter() {
    let i = 0;
    return function() {
        return i++;
    }
}

let id = makeCounter();

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const container = document.querySelector('.container');

function createContainer(title, author, pageNumber, id){
    
    const box = document.createElement('div');
    box.setAttribute('class', `box ${id}`)
    box.setAttribute('id', `${id}`)
    
    const boxTitle = document.createElement('h3');
    boxTitle.setAttribute('class', 'title');
    boxTitle.textContent = `${title}`;
    
    const boxAuthor = document.createElement('h4');
    boxAuthor.setAttribute('class', 'author');
    boxAuthor.textContent = `${author}`;
    
    const boxPageNumber = document.createElement('h4');
    boxPageNumber.setAttribute('class', 'pageNumber');
    boxPageNumber.textContent = `${pageNumber}`;

    const button = document.createElement('button');
    button.setAttribute('class', 'delete');
    button.setAttribute('id', `${id}`);
    button.textContent = 'Delete';
    button.addEventListener('click', () => {
        let buttonId = (button.getAttribute('id'))
        const deleteBox = document.getElementById(`${buttonId}`)
            deleteBox.remove();
            for( let i = 0; i < myLibrary.length; i++){
            if(myLibrary[i].id == buttonId)
                myLibrary.splice(i, 1);
        }
        })
    
    box.append(boxTitle);
    box.append(boxAuthor);
    box.append(boxPageNumber);
    box.append(button);
    container.appendChild(box);
}

const add = document.querySelector('.add');
add.addEventListener('click', () => {
    const newBook = new Books('Ala', 'Bala', 'Portocala', id())
    addBookToLibrary(newBook);
    createContainer(newBook.title, newBook.author, newBook.pageNumber, newBook.id)
});