

function Book(title) {
    this.title = title;
    this.author = author;
    this.totalPages = -1;
    this.isCompleted = false;
}

function addBookToLibrary() {

}

class App {
    constructor() {
        this.myLibrary = [];

        this.app = document.querySelector('#root');
        
        //create sidebar
        this.sideBar = document.createElement('div');
        this.sideBar.setAttribute('id', 'sidebar');

        this.btn_add = document.createElement('button');
        this.btn_add.setAttribute('id', 'addBook');
        this.btn_add.textContent = "Add Book";
        
        this.btn_add.addEventListener('click', () => {
            this.addBook();
        })

        this.sideBar.append(this.btn_add);
        this.app.append(this.sideBar);

        //create main
        this.mainContainer = document.createElement('div');
        this.mainContainer.setAttribute('id', 'mainContainer');

        this.app.append(this.mainContainer);


        //create submission form
        this.submissionForm = document.createElement('form');
        this.submissionForm.setAttribute('id', 'submission')
        this.submissionForm.setAttribute('action', '');
        this.submissionForm.setAttribute('method', 'post');
        this.submissionForm.setAttribute('name', 'submissionForm');

        this.submitSet = document.createElement('fieldSet');
        this.submitLegend = document.createElement('legend');
        this.submitLegend.textContent = 'New Book';

        this.lab_title = document.createElement('label');
        this.lab_title.setAttribute('for', 'in_title');
        this.lab_title.textContent = 'Title'
        this.in_title = document.createElement('input');
        this.in_title.setAttribute('id', 'in_title');
        this.in_title.setAttribute('type', 'text');
        this.in_title.setAttribute('name', 'in_title');

        this.lab_author = document.createElement('label');
        this.lab_author.setAttribute('for', 'in_author');
        this.lab_author.textContent = 'Author'
        this.in_author = document.createElement('input');
        this.in_author.setAttribute('id', 'in_author');
        this.in_author.setAttribute('type', 'text');
        this.in_author.setAttribute('name', 'in_author');

        this.lab_pages = document.createElement('label');
        this.lab_pages.setAttribute('for', 'in_pages');
        this.lab_pages.textContent = 'Pages'
        this.in_pages = document.createElement('input');
        this.in_pages.setAttribute('id', 'in_pages');
        this.in_pages.setAttribute('type', 'text');
        this.in_pages.setAttribute('name', 'in_pages');

        this.lab_complete = document.createElement('label');
        this.lab_complete.setAttribute('for', 'in_conplete');
        this.lab_complete.textContent = 'Completed'
        this.in_complete = document.createElement('input');
        this.in_complete.setAttribute('id', 'in_complete');
        this.in_complete.setAttribute('type', 'checkbox');
        this.in_complete.setAttribute('name', 'in_complete');

        this.btn_submit = document.createElement('button');
        this.btn_submit.setAttribute('id', 'btn_submit');
        this.btn_submit.setAttribute('type', 'submit');
        this.btn_submit.textContent = 'Add';
        this.btn_submit.addEventListener('click', (e) => {
            this.submitBook(e);
        });

        this.btn_cancel = document.createElement('button');
        this.btn_cancel.setAttribute('id', 'btn_cancel');
        this.btn_cancel.textContent = "Cancel";
        this.btn_cancel.addEventListener('click', (e)=> {
            this.cancelSubmission(e);
        })

        this.submitSet.append(
            this.submitLegend,
            this.lab_title, this.in_title, 
            this.lab_author, this.in_author, 
            this.lab_pages, this.in_pages, 
            this.lab_complete, this.in_complete,
            this.btn_submit, this.btn_cancel);

        this.submissionForm.appendChild(this.submitSet);
        //this.mainContainer.append(this.submissionForm);
        this.app.append(this.submissionForm);

    }

    addBook() {
        //this.submissionForm.classList.add('show');
        this.submissionForm.style.top = '100px';

    }

    deleteBook() {

    }

    submitBook(event) {
        console.log("book submitted.");
        event.preventDefault();
    }
    cancelSubmission(event) {
        event.preventDefault();
        this.submissionForm.style.top = '100vh';

    }
}


const app = new App();