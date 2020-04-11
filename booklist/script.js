//controctur
function Book(title,author,isbn) {
   this.title= title,
    this.author= author,
    this.isbn= isbn
}

//UI constructor
function UI(){}

UI.prototype.addListToBook = function(book){
   const list = document.querySelector('.book-list');
   //create element
   const row = document.createElement('tr');
   //inseret in to table
   row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td> <a href="#" class='delete'>&times;</a> </td>
   `;
   //appending element to parent
    list.appendChild(row)
}
//clearn field
UI.prototype.clearField =function(){
    document.querySelector('#form-Title').value = '';
    document.querySelector('#form-Author').value = '';
    document.querySelector('#form-ISBN').value = '';
}

//show alert
UI.prototype.showAlert = function(massage, className){
// create div
const div = document.createElement('div');
 div.className = `error ${className}`;
 div.setAttribute('role','alert')

 div.appendChild(document.createTextNode(massage));

 const container = document.querySelector('.container');
 const form = document.querySelector('.form-block')

 container.insertBefore(div,form)

 // timer for alerts massage
 setTimeout(()=>{
    document.querySelector('.error').remove();
 }, 3000)
}

// delete book
UI.prototype.deleteBook = function(target){
  if( target.className === 'delete'){
      target.parentNode.parentNode.remove();
  }
}

//Event Listners to add book
document.getElementById('book-form').addEventListener('submit',
  function(e){
      const title = document.querySelector('#form-Title').value,
            author = document.querySelector('#form-Author').value,
            isbn = document.querySelector('#form-ISBN').value
     
   // instance of book
     const book = new Book(title,author,isbn);

     //instance of ui
      let ui = new UI();
      
   //validate   
   if (title === '' || author === '' || isbn === '') {
     // show alert
     ui.showAlert('Please fill in all fields', 'warning')
   } else {

    ui.showAlert('Book added!', 'success')
     // adding book
     ui.addListToBook(book);

     // clear input field   
     ui.clearField();
   }

      e.preventDefault();
    }
)

// event listener to remove book

document.querySelector('.book-list').addEventListener('click',
  function(e){
     
    let ui = new UI();

    //delete book 
     ui.deleteBook(e.target)
    
     // show alert
     ui.showAlert('book deleted successfully!', 'success')

    e.preventDefault();
  }
  )