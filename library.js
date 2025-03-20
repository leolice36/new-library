const myLibrary = [
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      pages: 310,
      isRead: true,
      notes: "A great adventure novel. A great adventure novel. A great adventure novel. A great adventure novel. A great adventure novel.",
      idCode: 'af96afe0-d598-4e1f-b4cc-1c7489adf49b'
    },
    {
      title: "1984",
      author: "George Orwell",
      pages: 328,
      isRead: false,
      notes: "Dystopian classic with deep political themes.",
      idCode: '3e728f46-afe8-4b64-8214-bd960e90f832'
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      pages: 281,
      isRead: true,
      notes: "A powerful story about racial injustice.",
      idCode: '0b062694-2e29-4253-a150-233d68e262ec'
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      pages: 277,
      isRead: false,
      notes: "A controversial coming-of-age novel.",
      idCode: '70f6ca80-2bcc-49cc-918c-89b84ba3c25c'
    },
    {
      title: "Brave New World",
      author: "Aldous Huxley",
      pages: 268,
      isRead: true,
      notes: "Explores a futuristic dystopia with a focus on technology and control.",
      idCode: '52c541a3-ba8f-4a27-91f1-4ea987dfc7c4'
    }
  ];
  
  function Book(title, author, pages, isRead, notes = "") {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.isRead = Boolean(isRead);
    this.notes = notes;
    this.idCode = crypto.randomUUID();
    this.info = function () {
      let status = isRead ? "" : "not";
      return `${title} by ${author}, ${pages} pages, ${status} read yet. Notes: ${notes}`;
    };
  }
  
  function submitBook() {
      document.getElementById("modal-form").addEventListener("submit", function(event) {event.preventDefault()});
      const title = document.getElementById("title-input").value.trim();
      const author = document.getElementById("author-input").value.trim();
      const pages = document.getElementById("pages-input").value.trim();
      const isRead = document.getElementById("is-read").value.trim();
      const note = document.getElementById("note-input").value.trim();
      const idCode = addBookToLibrary(title, author, pages, isRead, note);
      const libraryContainer = document.querySelector('.library-container');
  
      function createCard() {
        const card = document.createElement("div");
        card.setAttribute('id-code', idCode);
        card.innerHTML = `
            <div class="card">
                  <div class="title">${title}</div>
                  <div class="author">${author}</div>
                  <div class="pages">${pages}</div>
                  <div class="id-code">${idCode}</div>
                  <div class="notes">
                      <span>Note:</span>
                      <div class="content-notes">${note}</div>
                  </div>
            </div>
        `
        card.addEventListener("click", () => editCard(card))
        card.addEventListener("click", () => openModal())
        return card
      }
  
        libraryContainer.appendChild(createCard());
        closeModal()
        
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const libraryContainer = document.querySelector(".library-container");
  
    function createBookCard(book) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute('id-code', book.idCode);
      card.innerHTML = `
        <div class="title">${book.title}</div>
        <div class="author">${book.author}</div>
        <div class="pages">${book.pages}</div>
        <div class="id-code">${book.idCode}</div>
        <div class="notes">
          <span>Notes:</span>
          <div class="content-notes">${book.notes}</div>
        </div>
      `;

      if (book.isRead){
        card.classList.add('read');
      }
      card.addEventListener("click", () => editCard(card))
      card.addEventListener("click", () => openModal())
      return card;
    }
  
    function displayLibrary() {
      myLibrary.forEach(book => {
        const bookCard = createBookCard(book);
        libraryContainer.appendChild(bookCard);
      });
    }
  
    displayLibrary();
  });
  
  function editCard(card){
    const obj = getObjectfromCard(card);
    const titleInput = document.getElementById("title-input");
    const authorInput = document.getElementById("author-input");
    const pagesInput = document.getElementById("pages-input");
    const isReadInput = document.getElementById("is-read");
    const noteInput = document.getElementById("note-input");
    const idCode = document.getElementById("id-modal");
    const submitBtn = document.querySelector('#submit')
    const deleteBtn = document.querySelector('#delete')
    submitBtn.classList.add('edit');
    deleteBtn.classList.add('edit');
    console.log(obj)
    console.log(titleInput)
    titleInput.value = obj.title || '';
    authorInput.value = obj.author ?? '';
    pagesInput.value = obj.pages ?? '';
    isReadInput.checked = obj.isRead ?? '';
    noteInput.value = obj.notes ?? '';
    idCode.innerHTML = obj.idCode ?? '';
  }
  
  function commitEdit() {
    document.getElementById("modal-form").addEventListener("submit", function(event) {event.preventDefault()});
    console.log('edit bay')
    const title = document.getElementById("title-input").value.trim();
    const author = document.getElementById("author-input").value.trim();
    const pages = document.getElementById("pages-input").value.trim();
    const isRead = document.getElementById("is-read").checked;
    const note = document.getElementById("note-input").value.trim();
    const idCode = document.getElementById("id-modal").textContent;
    const submitBtn = document.querySelector('#submit')
    const getObjectById = (idCode) => myLibrary.find(obj => obj.idCode === idCode) || null;
    const entry = getObjectById(idCode);
  
    entry.title = title;
    entry.author = author;
    entry.pages = pages;
    entry.isRead = isRead;
    entry.notes = note;
  
    console.log(entry)
  
    document.getElementById('modal-form').reset();
    document.getElementById("id-modal").textContent = '';
    submitBtn.classList.remove('edit');
    deleteBtn.classList.remove('edit');

    const card = document.querySelector(`div[id-code='${idCode}']`)
    card.innerHTML = `
        <div class="title">${title}</div>
        <div class="author">${author}</div>
        <div class="pages">${pages}</div>
        <div class="id-code">${idCode}</div>
        <div class="notes">
          <span>Notes:</span>
          <div class="content-notes">${note}</div>
        </div>
      `;
      if (isRead && !card.classList.contains('read')){
        card.classList.add('read');
      } else if (!isRead && card.classList.contains('read')){
        card.classList.remove('read')
      }
    closeModal()
  }
  
  function getObjectfromCard(card) {
    const id = card.getAttribute('id-code');
    return myLibrary.find(obj => obj.idCode === id) || null;
  }
  
  function addBookToLibrary(title, author, pages, isRead, notes = "") {
    const newBook = new Book(title, author, pages, isRead, notes);
    myLibrary.push(newBook);
    return newBook.idCode
  }
  
  function removeBookFromLibrary() {
    const idCode = document.getElementById("id-modal").textContent;
    console.log(idCode)
    const removeObjectById = (idToRemove) => {
      return myLibrary.filter(obj => obj.idCode !== idToRemove);
    };
    const updatedObjects = removeObjectById(idCode);
    console.log(updatedObjects);
  }
  
  function deleteBook() {
    const idCode = document.getElementById("id-modal").textContent;
    const submitBtn = document.querySelector('#submit');
    console.log('ala na')
    removeBookFromLibrary()
    const card = document.querySelector(`div[id-code='${idCode}']`)
    card.remove();
    document.getElementById('modal-form').reset();
    document.getElementById("id-modal").textContent = '';
    deleteBtn.classList.remove('edit')
    submitBtn.classList.remove('edit');
    closeModal();
  }
  
  const deleteBtn = document.getElementById("delete");
  const observer = new MutationObserver(() => {
    deleteBtn.disabled = !deleteBtn.classList.contains("edit");
  });
  document.getElementById("delete").addEventListener("click", function(event) {event.preventDefault()});
  // Observe class attribute changes
  observer.observe(deleteBtn, { attributes: true, attributeFilter: ["class"] });


  function openModal() {
    document.querySelector('.modal').style.display = 'block';
  }
  
  function closeModal() {
    document.querySelector('.modal').style.display = 'none';
    document.getElementById('modal-form').reset();
    document.getElementById("id-modal").textContent = '';
  }