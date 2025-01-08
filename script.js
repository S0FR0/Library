const myLibrary = [];

function Books(title, author, pageNumber, status, id) {
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.status = status;
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

function createContainer(title, author, pageNumber, status, id){
    
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

    const statusbtn = document.createElement('button');
    statusbtn.textContent = `${status}`;

    if(status === 'read'){
        statusbtn.style.cssText = 'background-color: red';
    }

    else{
        statusbtn.style.cssText = 'background-color: green';
    }

    statusbtn.addEventListener('click', () =>{
        if(statusbtn.textContent === 'read'){
            statusbtn.textContent = 'not red'
            statusbtn.style.cssText = 'background-color: green';
        }
        else{
            statusbtn.textContent = 'read'
            statusbtn.style.cssText = 'background-color: red';
        }
    })

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
    box.appendChild(statusbtn);
    box.append(button);
    container.appendChild(box);
}

const dialog = document.querySelector('dialog');
const add = document.querySelector('.add');
add.addEventListener('click', () => {
    dialog.showModal();
})

const submit = document.querySelector('#submit');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const formTitle = document.querySelector('#title').value;
    const formAuthor = document.querySelector('#author').value;
    const formPages = document.querySelector('#nrPages').value;
    const formStatus = document.querySelector('#status').value;

    const newBook = new Books(formTitle, formAuthor, formPages, formStatus, id())
    addBookToLibrary(newBook);
    createContainer(newBook.title, newBook.author, newBook.pageNumber, newBook.status, newBook.id);
    dialog.close();
});