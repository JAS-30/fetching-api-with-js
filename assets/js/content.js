
//search bar elements
let query = document.getElementById('query');
let btn = document.getElementById('btn');

//search and book variables
let subject = '';
let url ='';
let bookTitle = '';
let author = '';
let descriptionUrl = '';
let descriptionKey = '';
let text = '';

//creating containers where the data will be put for books and book description
let container = createContainer("div","container");
document.body.append(container);

let descriptionContainer = createContainer("div","description");
document.body.append(descriptionContainer);

//function to create containers
function createContainer(type, class_Name){
   let element = document.createElement(type);
   element.className = class_Name;
   return element;
}
//function to create book cell element
function createCell(type,id_name,class_Name,text){
   let cell = document.createElement(type);
   cell.id = id_name;
   cell.className = class_Name;
   cell.innerHTML = text;
   return cell;
}

//get title and authors of books with "subject" genre
async function getData(){                                           
   url = `https://openlibrary.org/subjects/${subject}.json`;
   try{
      let response = await fetch(url);
      const books = await response.json();
      for(let i = 0; i<Number(books.works.length); i++){
         bookTitle = books.works[i].title;
         author = String(books.works[i].authors[0].name);
         cell = createCell("div",`${books.works[i].key}`,"cell",`Title: ${bookTitle} ${"<br><br>"}Author: ${author}`);                      
         container.appendChild(cell);
      } 
   }catch (error){
      alert("Error");
      console.log("There was an error", error);
   } 
} 

 //get description of the selected book
async function getDescription(){           
   descriptionUrl = `https://openlibrary.org${descriptionKey}.json`;
   try{
      let response = await fetch (descriptionUrl);
      const descr = await response.json();
      text =  descr.description.value;
       //if description doesn't exist
      if(typeof text != 'string'){
         descriptionContainer.innerHTML = 'Description not found.';
      }
      else{
         descriptionContainer.innerHTML = text;
      }
   }catch (error){
      alert("Error");
      console.log("There was an error", error);
   } 
}


//when a cell is clicked in "container", get description of the book
function clickedCell(){
   descriptionContainer.innerHTML = '';
   descriptionKey=''; 
   container.addEventListener("click", (event) => {
      if(event.target.className === 'cell') {
         descriptionKey = event.target.id;
         getDescription();
      }
   });
}
   
function clickBtn (){                          //Main function logic: when the search button is clicked getData() is called 
   btn.addEventListener("click", ()=>{         //and if a cell is clicked clickedCell() will activate.                      
      subject = query.value;                    
      container.innerHTML = '';     
      descriptionContainer.innerHTML = '';    
      getData()
      .then(clickedCell);   
   })      
}

clickBtn(); 