// Decalre inputs
var bookmarkName = document.querySelector("#validationSiteName");
var bookmarkURL = document.querySelector("#validationSiteURL");

//Declare buttons
var submitBtn = document.querySelector("#submitBtn");
var visiitBtn = document.querySelector("#visitBtn");
var deleteBtn = document.querySelector("#deleteBtn");

//Declare HTML id for table's row
var bookmarkRow = document.querySelector("#bookmarkRow");

//Declare alert message when the input is invalid
var siteNameFeedback = document.querySelector("#siteNameValidFeedback");

//Declare regulare expression
var regex = {
    validationSiteName : { 
        value   :   /^[A-Z][a-z0-9]{4,19}$/,
        isvalid :   false
    },
    validationSiteURL  : {  
        value   :   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
        isvalid :   false
    }
}

//Retreive registered localStorage array if exist, else Declare an empty array
if (localStorage.getItem("bookmarkList") !== null ) {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
    displayBookmarks(bookmarkList);

}else {
    var bookmarkList = [];
}

//Declare current index
var ci;

//Declare add bookmark function
function addBookmark() {
    var bookmark = {
        Name: bookmarkName.value,
        URL: bookmarkURL.value,
    }
    
    bookmarkList.push(bookmark);
    
    displayBookmarks(bookmarkList);
    updInputData();
    updLocalStorage ();
}

//Event listener for submit bookmark button
submitBtn.addEventListener("click",addBookmark);

//Declare Display bookmark function
function displayBookmarks (list) {
    var cartona = ``

    for (var i = 0; i < list.length; i++) {
        
        cartona +=`

            <tr>
            <th scope="row" class="align-content-center">${i + 1}</th>
            <td class="align-content-center">${list[i].Name}</td>
            <td>
              <button id="visitBtn" onclick="window.open('${list[i].URL}','_blank')" class="btn btn-Visit px-3" type="button">
                <i class="fa-solid fa-eye px-0"></i>
                Visit
              </button>
            </td>
            <td>
              <button id="deleteBtn" onclick="deleteBookmark(${i})" class="btn btn-danger px-3" type="button">
                <i class="fa-solid fa-trash-can px-0"></i>
                Delete
              </button>
            </td>
          </tr>
          
        `
    }
    bookmarkRow.innerHTML = cartona;
}

//Declare update/Input data function
function updInputData(config) {
    bookmarkName.value   = config ? config.Name : null;
    bookmarkURL.value  = config ? config.URL : null;
}

//Declare validation function for site inout information
function validateSiteInfo(info) {

    if (regex[info.id].value.test(info.value) == true) {
        
        info.classList.add("is-valid");
        info.classList.remove("is-invalid");
        regex[info.id].isvalid = true;
    
    }else{

        info.classList.add("is-invalid");
        info.classList.remove("is-valid");
        regex[info.id].isvalid = false;

    }

    //Activate | De-activate for submit add bookmark button
    if (regex.validationSiteName.isvalid && regex.validationSiteURL.isvalid){

        submitBtn.classList.remove("disabled");

    }else{

        submitBtn.classList.add("disabled");
    
    }
}


//Declare delete funcrion
function deleteBookmark(x) {
    bookmarkList.splice(x,1);    
    displayBookmarks(bookmarkList);
    updLocalStorage ();
}

//Declare update local storage function
function updLocalStorage () {
    localStorage.setItem("bookmarkList",JSON.stringify(bookmarkList));

}