// let node = document.getElementsByClassName("card");

document.getElementById("primaryAddBtn").addEventListener("click",()=>{
    if(document.getElementById("primaryAddNote").style.display=="block"){
        document.getElementById("primaryAddNote").style.display="none";
        // document.getElementById("primaryAddNote").style.height="0px";

    }
    else{

        document.getElementById("primaryAddNote").style.display="block";
        // document.getElementById("primaryAddNote").style.height="274px";
    }
    // document.getElementById("primaryAddNote").style.display="block";
    
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
    // console.log("yeeeess");

    var x = this.querySelector(".copybtn");
    var y= this.querySelector(".sharebtn");

    x.style.display = "inline-block";
    y.style.display = "inline-block";
    x.innerHTML="Copy";


 }

 function hideCopybtn(){
    // console.log("yeeeess");

    var x = this.querySelector(".copybtn");
    var y= this.querySelector(".sharebtn");
    x.style.display = "none";
    y.style.display = "none";


 }

 function copytxt(){
   let txt= this.nextElementSibling.nextElementSibling.innerHTML;
   console.log("text"+txt);
//    txt.select();
//    txt.setSelectionRange(0, 99999); // For mobile devices
 
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
        elem= element.querySelector(".card-body");
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
        textarea.setSelectionRange(textarea.value.length,textarea.value.length);
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


            // notesObj
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





