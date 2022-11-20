let cid = 0;
console.log("Welcome to notes app. This is app.js");



//will get all the local Storage object elemnts and create their array objects so that they can be accessed
function getAll() {
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

  let temp = localStorage.getItem("temp");
  if (temp == null) {
    tempObj = [];
  } else {
    tempObj = JSON.parse(temp);
  }

  let username = localStorage.getItem("username");
  if (username == null) {
    usernameObj = [];
  } else {
    usernameObj = JSON.parse(username);
  }

  let id = localStorage.getItem("id");
  if (id == null) {
    idsObj = [];
    cid = 0;
  } else {
    idsObj = JSON.parse(id);
    cid = Math.max(...idsObj);
    cid++;
  }

}
getAll();



//show a prompt as soon as the body starts to load
// var un = prompt("To make your time on this website better, please enter your name.");
var un = tempObj[0];
showNotes(un);
document.getElementById("noteBookBtn").addEventListener("click", () => {
  un = document.getElementById("modal-messageNoteBook-text").value;
  console.log(un);
  showNotes(un);
  addToList(un);

});


//decides the heading taking input from the usrname modal when the user visits our website for the first time
document.getElementsByTagName("body")[0].addEventListener("onload", askName());

function askName() {
  if (usernameObj.length == 0) {
    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
    var myModal = new bootstrap.Modal(document.getElementById('myModal'), { keyboard: false, backdrop: 'static' })
    myModal.show();
    document.getElementById("modalbtn").addEventListener("click", () => {

      let usname = document.getElementById("modal-message-text").value;
      usernameObj.push(usname);
      localStorage.setItem("username", JSON.stringify(usernameObj));
      document.getElementById("modal-message-text").value = "";

      document.getElementById("heading").innerText = `Welcome to ${usernameObj[0]}'s Diary`;
      // document.getElementById("myModal").style.display="none";
      $('#myModal').modal('hide');


    })
  }

  else {
    document.getElementById("heading").innerText = `Welcome to ${usernameObj[0]}'s Diary`;
  }

}


// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let checkV = document.getElementById("checkV");
  console.log(checkV.value);
  addBtn.innerHTML = "Added!!"
  setTimeout(() => {
    document.getElementById("primaryAddNote").style.display = "none";
    document.getElementById("primaryAddBtn").style.backgroundColor="#f8f9fa";

  }, 2000);
  setTimeout(() => { addBtn.innerHTML = "Add Note" }, 1500);

  getAll();

  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";   //will empty the input fields once the add btn has been pressed. 

  titlesObj.push(addTitle.value);
  localStorage.setItem("titles", JSON.stringify(titlesObj));
  addTitle.value = "";

  checksObj.push(checkV.checked);
  localStorage.setItem("checks", JSON.stringify(checksObj));
  checkV.checked = false;

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
  un = uid;
  getAll();

  let html = "";
  notesObj.forEach(function (element, index) {
    if (unameObj[index] == uid)
      if (checksObj[index]) {
        console.log("y");
        text = "(imp)";
        html += `
            <div onclick="update()"  onmouseover="showCopybtn.call(this)" onmouseout="hideCopybtn.call(this)" class="noteCard my-2 mx-2 card highlight" style="width: 18rem;order:0;">
                    <div class="card-body ">
                    <p class=""> ${unameObj[index]}</p>
                    <span class="card-title"> ${titlesObj[index]}</span>
                    <button style="display:none;" onclick="sharetxt.call(this)" class="sharebtn"><img style="height: 25px;border-radius:10px;" src="icon.png" alt="..." /></button>
                    <button style="display:none;" onclick="copytxt.call(this)" class="copybtn">Copy</button>
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
                    <div onclick="update()"  onmouseover="showCopybtn.call(this)" onmouseout="hideCopybtn.call(this)" class="noteCard my-2 mx-2 card" style="width: 18rem;order:${index + 1};">
                    <div class="card-body">
                    <p class=""> ${unameObj[index]}</p>
                    <span class="card-title"> ${titlesObj[index]}${text}</span>
                    <button style="display:none;" onclick="sharetxt.call(this)" class="sharebtn"><img style="height: 20px;border-radius:10px;" src="icon.png" alt="..." /></button>
                    <button style="display:none;" onclick="copytxt.call(this)" class="copybtn">Copy</button>
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

function count(val) {
  let c = 0;
  let uname = localStorage.getItem("uname");
  if (uname == null) {
    unameObj = [];
  } else {
    unameObj = JSON.parse(uname);
  }

  unameObj.forEach((element) => {
    if (element === val) {
      c += 1;
    }
  });

  return c;
}

function addToList(un) {
  // getAll();
  let temp = localStorage.getItem("temp");
  if (temp == null) {
    tempObj = [];
  } else {
    tempObj = JSON.parse(temp);
  }

  if (un) {
    tempObj.push(un);
    localStorage.setItem("temp", JSON.stringify(tempObj));


  }
  // let temp = removeDuplicates(JSON.parse(localStorage.getItem("uname")));
  // console.log(temp);
  // console.log("heyy");

  let html = "";
  tempObj.forEach(function (element, index) {
    let i = count(element, JSON.parse(localStorage.getItem("uname")));
    html += `<div style="border-radius:4px;" class="listSelf btn-close" data-bs-dismiss="offcanvas" aria-label="Close" data-toggle="button" onclick="activeList(this)"><button data-id="${element}" type="button" class="list-group-item list-group-item-action listbtn" onclick="activeList()" ><span class="listItemValue">${element}</span><span class="badge badge-primary badge-pill">${i}</span></button></div>`;
  });

  let ListElm = document.getElementsByClassName("list-group")[0];
  if (tempObj.length != 0) {
    ListElm.innerHTML = html;
  } else {
    ListElm.innerHTML = `Nothing to show! Use "+ New noteBook" button above to add noteBooks.`;
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


let search = document.getElementById("searchTxt");

search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    // let cardTxt = element.getElementsByTagName("p")[0].innerText;
    let cardTxt = element.querySelector(".card-text").innerText;
    cardTxt = cardTxt.toLowerCase();
    let titleTxt = element.querySelector(".card-title").innerText;
    titleTxt = titleTxt.toLowerCase();

    if (cardTxt.includes(inputVal) || titleTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});

// function search(e) {
// 	let searched = document.getElementById("search").value.trim();
//   if (searched !== "") {
//   	let text = document.getElementById("text").innerHTML;
//   	let re = new RegExp(searched,"g"); // search for all instances
// 		let newText = text.replace(re, `<mark>${searched}</mark>`);
// 		document.getElementById("text").innerHTML = newText;
//   }
// }


let pdAll = document.getElementById("pdAll");
pdAll.addEventListener("click", () => {
  for (j = 12; j > 0; j--) {

    getAll();
    for (var i = 0; i < unameObj.length; i++) {
      if (unameObj[i] === un) {

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
dNimp.addEventListener("click", function () {
  for (j = 12; j > 0; j--) {

    getAll();
    for (var i = 0; i < unameObj.length; i++) {
      if (unameObj[i] === un && !checksObj[i]) {

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




// Further Features:
// 1. Add Title*
// 2. Mark a note as Important*
// 3. Separate notes by user*
// 4. Sync and host to web server *
// 5.mark the search text highlighted
// 6. make the being editted card draggable.
// 7.share a note *
// 8. copy a note*
// 9. some keyboard shortcuts can be added.
// 10. while adding a note , by keyboard itself the form filed can be switched.
// 11 prompt hatao*
// 12 jaise hi nayi notebook bane waise hi show krre list me . no one note criteria.*
// 13 add note input from inside a button/icon*
// 14 search must include title search also. *
// 15 share button#
// 16 if coming for first time set user name . Otherwise show the starter page . then he can select the notebook himself.*
// 17 sort feature
// 18 title editting

