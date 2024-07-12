import { createContainer,createCell } from "./create.js";
import { clickedCell } from "./description.js";

//search bar elements
let query = document.getElementById('query');
let btn = document.getElementById('btn');
//creating containers where the data will be put for books and book description
export let container = createContainer("div","container");
document.body.append(container);

export let descriptionContainer = createContainer("div","description");
document.body.append(descriptionContainer);

let subject = '';

async function getData(){                                           
    try{
        let response = await fetch("https://openlibrary.org/subjects/"+subject+".json");
        const books = await response.json();
        for(let i = 0; i<Number(books.works.length); i++){
            let bookTitle = books.works[i].title;
            let author = String(books.works[i].authors[0].name);
            let cell = createCell("div",`${books.works[i].key}`,"cell",`Title: ${bookTitle} ${"<br><br>"}Author: ${author}`);                      
            container.appendChild(cell);
        } 
    }catch (error){
        alert("Error");
        console.log("There was an error", error);
    } 
} 

function clickBtn (){                          //Main function logic: when the search button is clicked getData() is called 
    btn.addEventListener("click", ()=>{  
        subject = query.value;
        console.log(subject);                                      //and if a cell is clicked clickedCell() will activate.                                         
        container.innerHTML = '';     
        descriptionContainer.innerHTML = '';    
        getData()
        .then(clickedCell);  
    })      
}
clickBtn(); 