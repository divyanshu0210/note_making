let cid=0;
console.log("Welcome to notes app. This is app.js");
showNotes(un);

//show a prompt as soon as the body starts to load
var un = prompt("To make your time on this website better, please enter your name.");
showNotes(un);

//decides the heading
function askName(un) {
  if (un != null && un != "") {
    // un="Stranger";
    document.getElementById("heading").innerText = `Welcome to ${un}'s Diary`;
  } else {
    document.getElementById("heading").innerText = "Welcome, Stranger!";
  }
}

document.getElementsByTagName("body")[0].addEventListener("onload", askName(un));

//will pick up all the local Storage elemnts and create their array objects so that they can be accessed
function getAll(){
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let titles = localStorage.getItem("titles");
  if (titles == null) {
    titlesObj = [];
  } else {
    titlesObj = JSON.parse(titles);
  }
  let checks = localStorage.getItem("checks");
  if (checks == null) {
    checksObj = [];
  } else {
    checksObj = JSON.parse(checks);
  }

  let t = localStorage.getItem("t");
  if (t == null) {
    tObj = [];
  } else {
    tObj = JSON.parse(t);
  }

  let uname = localStorage.getItem("uname");
  if (uname == null) {
    unameObj = [];
  } else {
    unameObj = JSON.parse(uname);
  }

  let id = localStorage.getItem("id");
  if (id == null) {
    idsObj = [];
    cid=0;
  } else {
    idsObj = JSON.parse(id);
    cid=Math.max(...idsObj);
    cid++;
  }

}
getAll();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let checkV = document.getElementById("checkV");
  console.log(checkV.value);
  
  getAll();

  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";   //will empty the input fields once the add btn has been pressed. 

  titlesObj.push(addTitle.value);
  localStorage.setItem("titles", JSON.stringify(titlesObj));
  addTitle.value = "";

  checksObj.push(checkV.checked);
  localStorage.setItem("checks", JSON.stringify(checksObj));
  checkV.checked=false;
 
  idsObj.push(cid);
  localStorage.setItem("id", JSON.stringify(idsObj));
  cid++;

  var today = new Date();
  var time =
    today.getDate() +
    "/" +
    (today.getMonth() + 1) +
    "/" +
    today.getFullYear() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes();
  tObj.push(time);
  localStorage.setItem("t", JSON.stringify(tObj));

  unameObj.push(un);
  localStorage.setItem("uname", JSON.stringify(unameObj));

  //   console.log(notesObj);
  // console.log(notes);
  // console.log(titles);
  // console.log(checks);
  showNotes(un);
  addToList();
});

// Function to show elements from localStorage
function showNotes(uid) {
  addToList();
  askName(uid);
  un=uid;
  getAll();
  
  let html = "";
  notesObj.forEach(function (element, index) {
    if (unameObj[index] == uid)
    if (checksObj[index]) {
        console.log("y");
        text = "(imp)";
        html += `
            <div onclick="update()" class="noteCard my-2 mx-2 card highlight" style="width: 18rem;order:0;">
                    <div class="card-body ">
                    <p class=""> ${unameObj[index]}</p>
                    <h5 class="card-title"> ${titlesObj[index]}</h5>
                    <p style="display:none;" class="noteId"> ${idsObj[index]}</p>
                    <p class="card-text"> ${element}</p>                
                    <button id="${index}"onclick="deleteNote(this.id)" class="d-block btn btn-primary">Delete Note</button>
                    <img src="clock.png" alt="time:">
                    <span style="font-size:13px;" class="card-text"> ${tObj[index]}</span>
                    <img style="height:50px;width:50px;" src="pin.png" alt="time:">

                    </div>
                </div>`;
      } else {
        console.log("y");
        text = "";
        html += `
              <div onclick="update()" class="noteCard my-2 mx-2 card" style="width: 18rem;order:${
                index + 1
              };">
                      <div class="card-body">
                      <p class=""> ${unameObj[index]}</p>
                      <h5 class="card-title"> ${titlesObj[index]}${text}</h5>
                      <p style="display:none;" class="noteId"> ${idsObj[index]}</p>
                      <p class="card-text"> ${element}</p>                   
                      <button id="${index}"onclick="deleteNote(this.id)" class="d-block btn btn-primary">Delete Note</button>
                      <img src="clock.png" alt="time:">
                      <span style="font-size:13px;" class="card-text"> ${tObj[index]}</span>
                      </div>
                  </div>`;
      }
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// <h5 class="card-title">Note ${index + 1}</h5>

// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);

  getAll();
  //  if(unameObj[index]==un)
  //  {
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  titlesObj.splice(index, 1);
  localStorage.setItem("titles", JSON.stringify(titlesObj));
  checksObj.splice(index, 1);
  localStorage.setItem("checks", JSON.stringify(checksObj));
  tObj.splice(index, 1);
  localStorage.setItem("t", JSON.stringify(tObj));
  unameObj.splice(index, 1);
  localStorage.setItem("uname", JSON.stringify(unameObj));
  localStorage.setItem("t", JSON.stringify(tObj));
  idsObj.splice(index, 1);
  localStorage.setItem("id", JSON.stringify(idsObj));
  //  }
  addToList();
  showNotes(un);
}



document.getElementById("addBtn").addEventListener("click", addToList());

function count(val, arr) {
  let c = 0;

  arr.forEach((element) => {
    if (element === val) {
      c += 1;
    }
  });

  return c;
}

function addToList() {
  let temp = removeDuplicates(JSON.parse(localStorage.getItem("uname")));
  // console.log(temp);
  // console.log("heyy");

  let html = "";
  temp.forEach(function (element, index) {
    let i = count(element, JSON.parse(localStorage.getItem("uname")));
    html += `<div style="border-radius:4px;" class="listSelf btn-close" data-bs-dismiss="offcanvas" aria-label="Close" data-toggle="button" onclick="activeList(this)"><button data-id="${element}" type="button" class="list-group-item list-group-item-action listbtn" onclick="activeList()" ><span class="listItemValue">${element}</span><span class="badge badge-primary badge-pill">${i}</span></button></div>`;
  });

  let ListElm = document.getElementsByClassName("list-group")[0];
  if (temp.length != 0) {
    ListElm.innerHTML = html;
  } else {
    ListElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// $('.list-group button').on('click', function (e) {
//   e.preventDefault()
//   $(this).tab('show');
//   let b=e.target;
//   // if($(this).css("background-color")=="white"){
//   //   $(this).css("background-color", "yellow");

//   // }
//   // else
//   // $(this).css("background-color", "white");

//   let f=$(this).attr('data-id');
//   console.log(b);
//   console.log(f);
//   showNotes((String(f)));



//   // let data =b.getAttribute("data-elem"); 
//   // console.log(data);
//   // b.addEventListener("click",showNotes());
//   // console.log(b);
//   // let elemdata=$(this).getAttribute('data-elem')
//   // showNotes(elemdata);
// });

// function show(e){
//   showNotes(e);
// }

// function showListItemNotes(uid) {
//   askName(uid);

// getAll();
//   let html = "";
//   notesObj.forEach(function (element, index) {
//     if (unameObj[index] == uid)
//       if (checksObj[index]) {
//         text = "(imp)";
//         html += `
//             <div class="noteCard my-2 mx-2 card" style="width: 18rem;order:0;">
//                     <div class="card-body">
//                     <p class=""> ${unameObj[index]}</p>
//                     <h5 class="card-title"> ${titlesObj[index]}</h5>
//                     <p class="card-text"> ${element}</p>
//                     <button id="${index}"onclick="deleteNote(this.id)" class="d-block btn btn-primary">Delete Note</button>
//                     <img src="clock.png" alt="time:">
//                     <span style="font-size:13px;" class="card-text"> ${tObj[index]}</span>
//                     <img style="height:50px;width:50px;" src="pin.png" alt="time:">

//                     </div>
//                 </div>`;
//       } else {
//         text = "";
//         html += `
//               <div class="noteCard my-2 mx-2 card" style="width: 18rem;order:${
//                 index + 1
//               };">
//                       <div class="card-body">
//                       <p class=""> ${unameObj[index]}</p>
//                       <h5 class="card-title"> ${titlesObj[index]}${text}</h5>
//                       <p class="card-text"> ${element}</p>
//                       <button id="${index}"onclick="deleteNote(this.id)" class="d-block btn btn-primary">Delete Note</button>
//                       <img src="clock.png" alt="time:">
//                       <span style="font-size:13px;" class="card-text"> ${
//                         tObj[index]
//                       }</span>
//                       </div>
//                   </div>`;
//       }
//   });
//   let notesElm = document.getElementById("notes");
//   if (notesObj.length != 0) {
//     notesElm.innerHTML = html;
//   } else {
//     notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
//   }
// }

let search = document.getElementById("searchTxt");

search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    // let cardTxt = element.getElementsByTagName("p")[0].innerText;
    let cardTxt = element.querySelector(".card-text").innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});

let pdAll = document.getElementById("pdAll");
pdAll.addEventListener("click", () => {
  for(j=12;j>0;j--)
  {
    
    getAll();
    for( var i=0;i<unameObj.length;i++){
      if(unameObj[i]===un){
        
        console.log(i);
        deleteNote(i);
      }
    }

  }

  // unameObj.forEach(function (element, index) {
  //   if (element == un) deleteNote(index);
  
  // localStorage.clear();
  // console.log("done");
  pdAll.innerText = "Deleted";
  setTimeout(() => {
    pdAll.innerText = "Permanently Delete All";
  }, 1000);
  // showNotes();
});

let dNimp = document.getElementById("dNimp");
dNimp.addEventListener("click", function(){
  for(j=12;j>0;j--)
  {
    
    getAll();
    for( var i=0;i<unameObj.length;i++){
      if(unameObj[i]===un && !checksObj[i]){
        
        console.log(i);
        deleteNote(i);
      }
    }

  }
  
  // localStorage.clear();
  // console.log("done");
  dNimp.innerText = "Deleted";
  setTimeout(() => {
    dNimp.innerText = "Delete all non important files";
  }, 1000);
  // showNotes();
});



//     let dAll = document.getElementById("dAll");
//     dAll.addEventListener("click",function(e){
//       let noteCards = document.getElementsByClassName('noteCard');
//       Array.from(noteCards).forEach(function(element){
//         element.style.display = "none";
//       })
//       let notesElm = document.getElementById("notes");
//       notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;

//       let search = document.getElementById('searchTxt');
//       search.disabled=true;

//       })

//     let restore = document.getElementById("restore");
//     restore.addEventListener("click",function(e){
//       let noteCards = document.getElementsByClassName('noteCard');
//       Array.from(noteCards).forEach(function(element){
//         element.style.display = "block";

//       })

// })

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/
