var firstNameInput = document.getElementById("firstName");
var lastNameInput = document.getElementById("lastName");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("phone");
var locationInput = document.getElementById("location");
var hobbyInput = document.getElementById("hobby");

// checks update status
var update = 0;
// update input
var number ;

if(localStorage.getItem("theclients")==null){
    clientsList =[];
}
else{
    clientsList = JSON.parse(localStorage.getItem("theclients"));
    displayClient(clientsList);
}





function addClient(){
    if(update == 1){
        clientsList[number].fName = firstNameInput.value ;
        clientsList[number].lName = lastNameInput.value ;
        clientsList[number].email = emailInput.value ;
        clientsList[number].phone = phoneInput.value ;
        clientsList[number].location = locationInput.value ;
        clientsList[number].hobby = hobbyInput.value ;
        update = 0;
        localStorage.setItem("theclients",JSON.stringify(clientsList));
        displayClient(clientsList);
        clearForm();
    }
    else{
        var client = {
            fName : firstNameInput.value ,
            lName : lastNameInput.value ,
            email : emailInput.value ,
            phone : phoneInput.value ,
            location : locationInput.value ,
            hobby : hobbyInput.value 
        }
        clientsList.push(client);
        console.log(clientsList);
        localStorage.setItem("theclients",JSON.stringify(clientsList));
        displayClient(clientsList);
        clearForm();
    };

};

function displayClient(list){
    var concat = "";
    for (let index = 0; index < list.length; index++) {
       concat +=` <tr>
       <td>${index}</td>
       <td>${list[index].fName}</td>
       <td>${list[index].lName}</td>
       <td>${list[index].email}</td>
       <td>${list[index].phone}</td>
       <td>${list[index].location}</td>
       <td>${list[index].hobby}</td>
       <td> <button class="btn btn-warning" onclick="updateClient(${index})">Edit</button>
        <button class="btn btn-danger" onclick="deleteClient(${index})">Del</button></td>
    </tr>`
        
    } ;
    document.getElementById("bodycon").innerHTML = concat;

};
function clearForm(){
    firstNameInput.value="";
    lastNameInput.value ="";
    emailInput.value ="";
    phoneInput.value ="";
    locationInput.value ="";
    hobbyInput.value ="";
};
function deleteClient(i){
    clientsList.splice(i,1);
    localStorage.setItem("theclients",JSON.stringify(clientsList));
    displayClient(clientsList);
    console.log(clientsList);
};
function updateClient(j){
    console.log(clientsList[j].fName);
    firstNameInput.value=clientsList[j].fName;
    lastNameInput.value =clientsList[j].lName;
    emailInput.value =clientsList[j].email;
    phoneInput.value =clientsList[j].phone;
    locationInput.value =clientsList[j].location;
    hobbyInput.value =clientsList[j].hobby;
    update = 1;
    console.log();
    
    number = j;

};
function createCSV(array){
    var keys = Object.keys(array[0]); //Collects Table Headers
    
    var result = ''; //CSV Contents
    result += keys.join(','); //Comma Seperates Headers
    result += '\n'; //New Row
    
    array.forEach(function(item){ //Goes Through Each Array Object
      keys.forEach(function(key){//Goes Through Each Object value
        result += item[key] + ','; //Comma Seperates Each Key Value in a Row
      })
      result += '\n';//Creates New Row
    })
    
    return result;
  }
  
  
  function downloadCSV(array) {
    csv = 'data:text/csv;charset=utf-8,' + createCSV(array); //Creates CSV File Format
    excel = encodeURI(csv); //Links to CSV 
  
    link = document.createElement('a');
    link.setAttribute('href', excel); //Links to CSV File 
    link.setAttribute('download', 'clients List.csv'); //Filename that CSV is saved as
    link.click();
  }
