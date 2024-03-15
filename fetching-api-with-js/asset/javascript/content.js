
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
let container = document.createElement("div"); 
        container.className = "container";
      document.body.append(container);
      
      let descriptionContainer = document.createElement("div");
      descriptionContainer.className = "description";
      document.body.append(descriptionContainer);




async function getData(){                                           //get title and authors of books of "subject" genre
     url = `https://openlibrary.org/subjects/${subject}.json`;
   
    try{
     let response = await fetch(url);
     const books = await response.json();
    
     for(let i = 0; i<Number(books.works.length); i++){
         bookTitle = books.works[i].title;
        author = String(books.works[i].authors[0].name);
         cell = document.createElement("div");                             //creating cells that will contain the book's info
        cell.id = `${books.works[i].key}`;                                 //assigning the book's key to the cell's id
        cell.className = 'cell';
        cell.innerHTML = `Title: ${bookTitle} ${"<br><br>"}
                          Author: ${author}`;
         
        container.appendChild(cell);
     } 
 
    } catch (error){
  alert("Error");
     console.log("There was an error", error);
    } 
 } 


 async function getDescription(){            //get description of the selected book
   descriptionUrl = `https://openlibrary.org${descriptionKey}.json`;
   try{
let response = await fetch (descriptionUrl);
const descr = await response.json();
text =  descr.description.value;
if(typeof text != 'string'){                   //if description doesn't exist
   descriptionContainer.innerHTML = 'Description not found; may not exist yet';
}
else{descriptionContainer.innerHTML = text;}

   }catch (error){
  alert("Error");
     console.log("There was an error", error);
    } 
 }



//add an event listener to each cell; when a cell is clicked get description data.
 function clickedCell(){
   descriptionContainer.innerHTML = '';
      descriptionKey=''; 
   cellList = document.querySelectorAll(".cell");
  for(let i=0; i<cellList.length;i++){
   cellList[i].addEventListener("click",()=>{
      descriptionContainer.innerHTML = '';
      descriptionKey=''; 
      descriptionKey = cellList[i].id;
      console.log(descriptionKey);
      getDescription();
   })
  }

   
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
 
       