/* Variabel Declare */
const bookSelf = document.getElementById('bookSelf');
const showText = document.getElementById('showtext');
const taggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
  }
  const containerLibrary = displayStyle => {
    document.getElementById('containerLibrary').style.display = displayStyle;
  }
  
const searchbtn =  () => {
    const searchFiled = document.getElementById('search-field');
    const searchText = searchFiled.value;
  searchFiled.value = '';
  /* No value Catch  */
  if (searchText === "") {
    showText.innerHTML = `<h3 class="fw-bolder text-white text-center mb-3 mt-3">Please Search a Valid Book Name</h3>`;
    return;
  }
  searchItem(searchText);

}
const searchItem=(searchText)=>{
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  taggleSpinner('block');
  containerLibrary('none');
  showText.innerHTML = '';
  bookSelf.textContent = '';
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
        
      displayBook(data.docs)
      totalResult(data)
    });
}

/* show Total result */
const totalResult = (data) => {
  if (data.numFound === 0) {
    showText.innerHTML = `<h3 class="fw-bolder text-white text-center mb-3 mt-3">No Resutls Found! Please Search Again</h3>`;
    return;
  } else {
    showText.innerText = "";
  }  
  showText.innerHTML=`<h3 class="fw-bolder text-white text-center mb-3 mt-3">Total Books Found: ${data.numFound}</h3>`
}

/* Book and information */
const displayBook = books => {
  
    taggleSpinner('none');
    containerLibrary('block');
    
    
    bookSelf.textContent = '';
  books.forEach(book => {
    

    const div = document.createElement('div');

    div.classList.add("col");
    div.innerHTML = `
    <div class="card mb-3 border border-dark">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            class="card-img-top w-100 h-100"
            src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg"
            class="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h1 class="card-title fw-bold text-success">${book.title.slice(0, 15)}</h1>
            <hr />
            <h3 class="lead">
              <span class="fw-bold">Author Name: </span> ${book.author_name}
            </h3>
            <p class="lead">
              <span class="fw-bold">Publisher Name: </span> ${book.publisher}
            </p>

            <p class="card-text">
              <small class="text-muted"
                >First Published : ${book.first_publish_year}</small
              >
            </p>
          </div>
        </div>
      </div>
          `;
      bookSelf.appendChild(div);
  });
};

