function Book(title, author, pages, isCompleted,) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isCompleted = isCompleted;

    this.info = function() {
        let result = title + " by " + author + ", " + pages + ' pages, ';
        result += (this.isCompleted)? "read" : "not read yet"
        return  result;
    }
}

class App {
    constructor() {
        this.myLibrary = [];

        this.app = document.querySelector('#root');
        
        //create sidebar
        this.sideBar = document.createElement('div');
        this.sideBar.setAttribute('id', 'sidebar');

        this.btn_add = document.createElement('button');
        this.btn_add.setAttribute('id', 'callSubmissionForm');
        this.btn_add.textContent = "Add Book";
        
        this.btn_add.addEventListener('click', () => {
            this.callSubmissionForm();
        })

        this.sideBar.append(this.btn_add);
        this.app.append(this.sideBar);

        //create main
        this.mainContainer = document.createElement('div');
        this.mainContainer.setAttribute('id', 'mainContainer');
        this.cardContainer = document.createElement('div');
        this.cardContainer.setAttribute('id', 'cardContainer');
        this.mainContainer.append(this.cardContainer);

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
        this.in_title.setAttribute('name', 'title');

        this.lab_author = document.createElement('label');
        this.lab_author.setAttribute('for', 'in_author');
        this.lab_author.textContent = 'Author'
        this.in_author = document.createElement('input');
        this.in_author.setAttribute('id', 'in_author');
        this.in_author.setAttribute('type', 'text');
        this.in_author.setAttribute('name', 'author');

        this.lab_pages = document.createElement('label');
        this.lab_pages.setAttribute('for', 'in_pages');
        this.lab_pages.textContent = 'Pages'
        this.in_pages = document.createElement('input');
        this.in_pages.setAttribute('id', 'in_pages');
        this.in_pages.setAttribute('type', 'number');
        this.in_pages.setAttribute('min', '1');
        this.in_pages.setAttribute('max', '999999');
        this.in_pages.setAttribute('step', '1');
        this.in_pages.setAttribute('name', 'pages');

        this.lab_complete = document.createElement('label');
        this.lab_complete.setAttribute('for', 'in_conplete');
        this.lab_complete.textContent = 'Completed'
        this.in_complete = document.createElement('input');
        this.in_complete.setAttribute('id', 'in_complete');
        this.in_complete.setAttribute('type', 'checkbox');
        this.in_complete.setAttribute('name', 'complete');

        this.btn_submit = document.createElement('button');
        this.btn_submit.setAttribute('id', 'btn_submit');
        this.btn_submit.setAttribute('type', 'submit');
        this.btn_submit.textContent = 'Add';
        this.btn_submit.addEventListener('click', (e) => {
            this.processSubmission(e);
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


        //dummy books
        this.addBookToLibrary(new Book('Neuromancer', "William Gibson", 1298, false ));
        this.addBookToLibrary(new Book('The Kite Runner', "Khaled Hosseini", 456, false ));
        this.addBookToLibrary(new Book('Javascript for Impatient Programmers', "Dr Axel Rauschmayer", 265, true ));

    }

    callSubmissionForm() {
        this.submissionForm.style.top = '100px';        
    }

    processSubmission(event) {
        event.preventDefault();

        let fd = new FormData(this.submissionForm);
        const book = new Book(fd.get('title'), fd.get('author'), fd.get('pages'), (fd.get('complete')==='on')?true:false);
        this.addBookToLibrary(book);
    }

    cancelSubmission(event) {
        event.preventDefault();
        this.submissionForm.style.top = '100vh';

    }

    addBookToLibrary(book){
        this.createBookCard(book);
        this.myLibrary.push(book);
    }
    

    deleteBookFromLibrary(id) {
        //delete from model
        for(let i = 0; i < this.myLibrary.length; i++) {
            const compareId = this.generateId(this.myLibrary[i]);
            if (compareId === id) {
                delete this.myLibrary[i];
                break;
            }
        }
        //delete from view
        const c = document.querySelector('#' + id);
        this.cardContainer.removeChild(c);
    }

    toggleCompletion(id, book) {
        
        //toggle in model
        let index;
        for (let i = 0; i < this.myLibrary.length;i++) {
            if (this.myLibrary[i].title === book.title && this.myLibrary[i].author === book.author) {
                index = i;
                break;
            }
        }
        if (this.myLibrary[index].isCompleted)this.myLibrary[index].isCompleted = false;
        else this.myLibrary[index].isCompleted = true;
    
        //toggle in view
        const c = document.querySelector('#' + id);
        let p = c.querySelector('.completionStatus');
        p.textContent = 'Read: ' + this.myLibrary[index].isCompleted;
    }

    createBookCard(book) {
        
        const id = this.generateId(book);

        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id', id);
        let title = document.createElement('h2');
        title.textContent = book.title;
        
        let author = document.createElement('p');
        author.textContent = 'Author: ' + book.author;

        let pages = document.createElement('p');
        pages.textContent = 'Number of Pages: ' + book.pages.toString();

        let isCompleted = document.createElement('p');
        isCompleted.classList.add('completionStatus');
        isCompleted.textContent = 'Read: ' + book.isCompleted;

        let btn_read = document.createElement('button');
        btn_read.textContent = 'Read';
        btn_read.setAttribute('id', 'btn_read_' + id);
        btn_read.addEventListener('click', () => {
            this.toggleCompletion(id, book);
        })

        let btn_del = document.createElement('button');
        btn_del.textContent = 'X';
        btn_del.setAttribute('id', 'btn_del_' + id);

        btn_del.addEventListener('click', () => {
            this.deleteBookFromLibrary(id);
        });

        card.append(title, author, pages, isCompleted, btn_read, btn_del);
        this.cardContainer.append(card);
    }

    //generate id from title and author
    generateId(book) {
        return book.author.split(" ").join("") + '_' + book.title.split(" ").join("");
    }

}


const app = new App();