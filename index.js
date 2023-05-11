class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        if (readStatus) this.readStatus = 'Read';
        else this.readStatus = 'Unread';
    }
}

const Library = [new Book('Book1', 'Anon', 34, true), new Book('Book2', 'Anon', 12, false)];


class UIHandler {
    static drawLibrary() {
        document.querySelector(".main").innerHTML = "";

        Library.forEach((current, i) => {
            const book = document.createElement('div');
            book.classList.add('Book')
            const title = document.createElement('div');
            title.classList.add('title');
            title.innerHTML = current.title;
            const author = document.createElement('div');
            author.classList.add('author');
            author.innerHTML = `Author: ${current.author}`;
            const pages = document.createElement('div');
            pages.classList.add('pages');
            pages.innerHTML = `Pages: ${current.pages}`;

            const tool = document.createElement('div');
            tool.classList.add('toolbar');
            const readBtn = document.createElement('button');
            readBtn.classList.add('readBtn')
            if (current.readStatus == 'Read') readBtn.classList.add(current.readStatus.toLowerCase());
            readBtn.innerHTML = current.readStatus;
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = "Delete";
            deleteBtn.classList.add('deleteBtn');
            tool.appendChild(readBtn);
            tool.appendChild(deleteBtn);

            book.appendChild(title);
            book.appendChild(author);
            book.appendChild(pages);
            book.appendChild(tool);
            book.setAttribute('data-index', i); // Assign data attribute to facilitate deletion.

            document.querySelector('.main').appendChild(book);
        });


        //Need to assign EventListeners each time Library is redrawn to account for newer/deleted books.
        const readBtns = document.querySelectorAll(".readBtn");
        readBtns.forEach(btn => {
            btn.onclick = libraryHandler.changeRead;
        })
        const deleteBtns = document.querySelectorAll(".deleteBtn");
        deleteBtns.forEach(btn => {
            btn.onclick = libraryHandler.deleteBook;
        })
    }

    static openForm() {
        document.querySelector(".addForm").style.display = "block";
        document.querySelector(".overlay").style.display = "block";
    }
    static closeForm() {
        document.querySelector(".addForm").style.display = "none";
        document.querySelector("form").reset();
        document.querySelector(".overlay").style.display = "none";
    }

}

class libraryHandler {
    static addBook(title, author, pages, readStatus) {
        Library.push(new Book(title, author, pages, readStatus));
        UIHandler.drawLibrary();
    }


    static changeRead(e) {
        e.target.classList.toggle("read");
        e.target.innerHTML == 'Read' ? e.target.innerHTML = 'Unread' : e.target.innerHTML = 'Read';
    }

    static deleteBook(e) {
        const current = e.target.parentElement.parentElement;
        const currentIndex = current.getAttribute('data-index');
        Library.splice(currentIndex, 1);
        UIHandler.drawLibrary();
    }
}

UIHandler.drawLibrary();


document.querySelector('.add').onclick = UIHandler.openForm;

document.getElementById('submit').onclick = (event) => {

    let title = document.getElementById('title-input').value;
    if(title == '') title='Title';
    let author = document.getElementById('author-input').value;
    let pages = document.getElementById('page-input').value;
    let readStatus = document.getElementById('read-input').checked;
    libraryHandler.addBook(title, author, pages, readStatus);
    UIHandler.closeForm();
};

document.querySelector(".overlay").onclick = UIHandler.closeForm;

