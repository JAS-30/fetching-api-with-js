import { descriptionContainer,container } from "./main.js";
let key = '';


//when a cell is clicked in "container", get description of the book
export function clickedCell(){
    descriptionContainer.innerHTML = '';
    key=''; 
    container.addEventListener("click", (event) => {
        if(event.target.className === 'cell') {
            key = event.target.id;
            getDescription();
        }
    });
}

 //get description of the selected book
async function getDescription(){           
    try{
        let response = await fetch (`https://openlibrary.org${key}.json`);
        const descr = await response.json();
        let text =  descr.description.value;
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