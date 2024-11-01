
let Title =document.querySelector ("#Title");
let price =document.querySelector ("#price");
let taxes =document.querySelector ("#taxes");
let ads =document.querySelector ("#ads");
let discount =document.querySelector ("#discount");
let total =document.querySelector ("#total");
let Count =document.querySelector ("#Count");
let Category =document.querySelector ("#Category");
let submite =document.querySelector ("#submite");

let moodUpdate ="create";
let global;

// mood
function moodDark(){
}
  
 // -----------------------CREAT---------------------
//(01)ــget price-Total 
function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "green"
    }
    else{
        total.innerHTML = "";
    total.style.background = "red"
    }

}
 // ـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
//(02)ــCreat-Products:-

let datapro;
if(localStorage.product !=null){
datapro = JSON.parse(localStorage.product )

}else{
    datapro = [];

}

// ــــــــــــــــــــــــــــــــCReat:ــــــــــــــــــــــــــــ-

submite.onclick = function(){     
    let newPro = {
        Title:Title.value .toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total: total.innerHTML,
        Count:Count.value,
        Category:Category.value.toLowerCase(),
    }
    
    if (Title.value != "" 
        && price.value != "" 
        && Category.value != "" 
    ){

 if(moodUpdate === "create"){


    if(newPro.Count > 1 ){
        for(let i = 0; i < newPro.Count; i++ ){
            datapro.push(newPro)
        }
    }else{
        datapro.push(newPro)
    }

}else{
    datapro[ global ] = newPro;
    moodUpdate ="create"
    submite.innerHTML = "create"
    Count.style.display ="block"
    submite.style .background ="rgb(75, 23, 103)";
}

    clearData()
    }

 //ـSave-LocalStorage:- 
 localStorage.setItem( "product",   JSON.stringify(datapro) );

showData()
 
}

// ـــــــــــــــــــــــــــــــــــــــــClear Dataــــــــــــــــــــــــــــــــــــــــ
//(04)Clear Data From Inputs:-
function clearData(){
    Title.value= " " ;
    price.value = " " ;
    taxes.value = " " ;
    ads.value = " " ;
    discount.value = " " ;
    total.innerHTML = " " ;
    Count.value = " " ;
    Category.value = " " ;  
}

// ــــــــــــــــــــــshowDataــــــــــــــــــــــ
//(1)ــRead data in Table:-

function showData()
{
 getTotal()
 let table = "";
 
 for (let i = 0; i < datapro.length; i++ ){
    table +=`
       <tr>
                <td>${i+1}</td>
                <td>${datapro[i].Title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}%</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].Category}</td>
                <td><button onclick="updateData(${i})" id="Update" ><i class="fa-solid fa-pen-to-square fa-lg ro" style="color: #2fac5d;"></i></button></td>
                <td><button onclick="deleteData(${i})" id="Delete"><i class="fa-solid fa-delete-left fa-lg" style="color: #a61c1c;"></i></button></td>  
        </tr>
    `
 }

 document.querySelector ("#tbody").innerHTML= table;
 let btnDelet = document.querySelector("#deletAll")
 if(datapro.length > 0 ){
    
    btnDelet.innerHTML =
    `
 <button onclick = "deletAll()">  <i class="fa-solid fa-list-ol fa-fade" style="color: #a133a3;"></i> Delete All (${datapro.length}) <i class="fa-solid fa-trash-can-arrow-up fa-fade" style="color: #ae0f0f;"></i></button> 
     
    `
 }else{
    btnDelet.innerHTML = "" ;
 }

}
showData()

// ــــــــــــــــــــ
//(2)ــDelet:-

function deleteData(i)
{
    if(confirm(`Are You Sure Deleted...?`) == true){
        datapro.splice(i,1)
        localStorage.product= JSON.stringify(datapro);
        showData()
    }
}

//(2)ــDeletALL:-

function deletAll (){
    if(confirm(`Are You Sure Delete All...?`) == true){
        localStorage.clear()
        datapro.splice(0)
        showData()
    }
}

// ــــــــــــــــــــ
//(3)//ــUpdate :-

function updateData(i){

    Title.value = datapro[i].Title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    Count.style.display= "none";
    Category.value = datapro[i].Category;

    submite.innerHTML="UpDate"
    submite.style .background ="rgba(135, 111, 50, 0.812)"

    moodUpdate ="update";
    global = i;

    scroll({
        top:0 ,
        behavior:"smooth"
    })
}

// ــــــــــــــــــــ
//ــSearch
// (1)
let searchMood = "title";

function getSearchMood(id)

{
    let search = document.querySelector ("#search");

    if (id == "searchTitle" ){
        searchMood = "title";
    }else{

        searchMood = "category";
    }

    
    search.placeholder = "Search By" + searchMood ;
    search.focus()
    // search.value =" "
    showData()

}

//----------
// (2)

function searchData (value)

{
    let table =" ";
    
    for( let i = 0; i < datapro.length; i++){

     if (searchMood == "title"){
        // Search by title
            if (datapro[i].Title.includes(value .toLowerCase())) 
            {
                table +=`
                 <tr>
                         <td>${i}</td>
                         <td>${datapro[i].Title}</td>
                         <td>${datapro[i].price}</td>
                         <td>${datapro[i].taxes}</td>
                         <td>${datapro[i].ads}</td>
                         <td>${datapro[i].discount}%</td>
                         <td>${datapro[i].total}</td>
                         <td>${datapro[i].Category}</td>
                         <td><button onclick="updateData(${i})" id="Update" ><i class="fa-solid fa-pen-to-square fa-lg ro" style="color: #2fac5d;"></i></button></td>
                         <td><button onclick="deleteData(${i})" id="Delete"><i class="fa-solid fa-delete-left fa-lg" style="color: #a61c1c;"></i></button></td>  
                 </tr>
                `
            }
        
     }else{
        // Search by category
            if (datapro[i].Category.includes(value.toLowerCase())) 
            {
                table +=`
                 <tr>
                         <td>${i}</td>
                         <td>${datapro[i].Title}</td>
                         <td>${datapro[i].price}</td>
                         <td>${datapro[i].taxes}</td>
                         <td>${datapro[i].ads}</td>
                         <td>${datapro[i].discount}%</td>
                         <td>${datapro[i].total}</td>
                         <td>${datapro[i].Category}</td>
                         <td><button onclick="updateData(${i})" id="Update" ><i class="fa-solid fa-pen-to-square fa-lg ro" style="color: #2fac5d;"></i></button></td>
                         <td><button onclick="deleteData(${i})" id="Delete"><i class="fa-solid fa-delete-left fa-lg" style="color: #a61c1c;"></i></button></td>  
                 </tr>
                `
            }
        
    }

    }
    document.querySelector ("#tbody").innerHTML= table

}
showData()


