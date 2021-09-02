// secect html by id
const searchNumber = document.getElementById('searchNumber');
const errorMessage = document.getElementById('error');
const bookContainer = document.getElementById('bookContainer');


// search section
const loadBooks = () => {
    // getting input 
    const inputField = document.getElementById('inputField');
    const inputText = inputField.value;
    // clear search field
    inputField.value = "";
    // error message
    if (inputText === '') {
        errorMessage.innerText = 'input field can not be empty';
        searchNumber.style.display = 'none';
        bookContainer.textContent = '';
        return;
    }
    // clear 
    errorMessage.textContent = '';
    searchNumber.textContent = '';
    bookContainer.textContent = '';


    //    fetch
    const url = `https://openlibrary.org/search.json?q=${inputText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data));
    searchNumber.style.display = 'block';

}

// displey section
const displayBooks = Books => {
    const booklist = Books.docs;
    //   error message
    if (booklist.length === 0) {
        errorMessage.innerText = "no result found!";
        searchNumber.style.display = 'none';
        searchNumber.textContent = '';

    } else {
        errorMessage.innerText = '';
        errorMessage.textContent = '';
    };
    // getting parent div
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.textContent = '';

    // show number
    searchNumber.innerText = `Total Number is: ${booklist.length} of ${Books.numFound}`

    // loop 
    booklist.forEach(book => {
        const div = document.createElement('div');
        div.className = "col";
        div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"> Book Name:  ${book.title}</h5>
          <h5 class="card-title">Author Name:  ${book.author_name[0]}</h5>
          <h5 class="card-title">Publisher:  ${book.publisher[0]}</h5>
          <h5 class="card-title">First Publish year: ${book.first_publish_year}</h5>
          
        </div>
      </div>
        
        `
            // append 
        bookContainer.appendChild(div);

    });

}