

function Book(title) {
    this.title = title;
    this.author = author;
    this.totalPages = -1;
    this.completedPages = 0;
}

function addBookToLibrary() {

}

class App {
    constructor() {
        this.app = document.querySelector('#root');
        this.myLibrary = [];

        this.btn_add = document.createElement('button');
        this.btn_add.setAttribute('id', 'addBook');
        this.btn_add.textContent = "Add Book";
        
        this.btn_add.addEventListener('click', () => {
            this.addBook();
        })


        //create submission form
        this.submissionForm = document.createElement('form');
        this.submissionForm.setAttribute('id', 'submission')
        this.submissionForm.setAttribute('action', '');
        this.submissionForm.setAttribute('method', 'post');
        this.in_title = document.createElement('input');
        this.in_title.setAttribute('type', 'text');

        this.submissionForm.append(this.in_title);

        app.append(this.submissionForm);

    }

    addBook() {

    }

    deleteBook() {

    }
}


const app = new App();