//function to create containers
export function createContainer(type, class_Name){
    let element = document.createElement(type);
    element.className = class_Name;
    return element;
}
 //function to create book cell element
export function createCell(type,id_name,class_Name,text){
    let cell = document.createElement(type);
    cell.id = id_name;
    cell.className = class_Name;
    cell.innerHTML = text;
    return cell;
}