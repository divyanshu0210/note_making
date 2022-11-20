// let node = document.getElementsByClassName("card");

let temp = localStorage.getItem("temp");
if (temp == null) {
  tempObj = [];
} else {
  tempObj = JSON.parse(temp);
}

// to open the add note box.......
document.getElementById("primaryAddBtn").addEventListener("click",()=>{
    if(tempObj.length){
    if(document.getElementById("primaryAddNote").style.display=="block"){
        document.getElementById("primaryAddNote").style.display="none";
        document.getElementById("primaryAddBtn").style.backgroundColor="#f8f9fa";
    }
    else{
        
        document.getElementById("primaryAddNote").style.display="block";
        document.getElementById("primaryAddBtn").style.backgroundColor="#ffc107";
        // document.getElementById("primaryAddNote").style.height="274px";
    }
    // document.getElementById("primaryAddNote").style.display="block";
}
else{
    document.getElementById("primaryAddBtn").innerHTML="Add some NoteBook to add notes";
    setTimeout(()=>{
        document.getElementById("primaryAddBtn").innerHTML="+Add Note";

    },3000);
}
});


function getA() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    
    let id = localStorage.getItem("id");
    if (id == null) {
        idsObj = [];
    } else {
        idsObj = JSON.parse(id);
    }
}

function showCopybtn(){

    var x = this.querySelector(".copybtn");
    var y= this.querySelector(".sharebtn");

    x.style.display = "inline-block";
    y.style.display = "inline-block";
    x.innerHTML="Copy";
 }

 function hideCopybtn(){

    var x = this.querySelector(".copybtn");
    var y= this.querySelector(".sharebtn");
    x.style.display = "none";
    y.style.display = "none";
}

 function copytxt(){
   let txt= this.nextElementSibling.nextElementSibling.innerHTML;
   console.log("text"+txt);
 
    // Copy the text inside the text field
   navigator.clipboard.writeText(txt);
   this.innerHTML="Copied";
 }

 function sharetxt(){
    let sharetxt = this.parentElement.querySelector(".card-text").innerHTML;
    console.log(sharetxt);
    window.open("whatsapp://send?text=" + sharetxt,'_blank' );
}



function update(){

    let noteCards = document.getElementsByClassName("noteCard");
    // console.log(noteCards);
    Array.from(noteCards).forEach(function (element) {
        // console.log(element);
        element.addEventListener("dblclick", function () {
            elem = element.querySelector(".card-body");
            // document.getElementsByTagName("body")[0].classList.add("bodyoverlay");
            elem.classList.add("zoom");
            // on();
            // element.classList.add("zoom");
            let noTextAreas = document.getElementsByClassName('textarea').length;
            let cardTxt = element.querySelector(".card-text");
            let noteId = element.querySelector(".noteId").innerText;
            Number(noteId);
            // console.log("noteId" + noteId);
            if (noTextAreas == 0) {
                // console.log(cardTxt);
                let html = cardTxt.innerHTML;
                // console.log(html);
                cardTxt.innerHTML = ` <textarea autofocus class="textarea form-control" id="textarea" column="10" rows="3">${html}</textarea>`;
            }
            //listen for the blur event on textarea
            let textarea = document.getElementById('textarea');
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
            textarea.focus();
            on();
            textarea.addEventListener('blur', function () {
                cardTxt.innerHTML = textarea.value;

                getA();
                idsObj.forEach(function (e, index) {
                    if (e == noteId || e == null)
                        notesObj[index] = textarea.value;
                });
                localStorage.setItem("notes", JSON.stringify(notesObj));

                // console.log(localStorage);

                elem.classList.remove("zoom");
                off();

            });
        });
    });
}

function on() {
    document.getElementById("overlay").style.display = "block";
}
  
function off() {
    document.getElementById("overlay").style.display = "none";
}





