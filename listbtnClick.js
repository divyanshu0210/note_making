function activeList(){
    let listSelf= document.getElementsByClassName("listSelf");
Array.from(listSelf).forEach(function (element) {
    element.addEventListener("click", function () {
        elem= element.querySelector("button").getAttribute("data-id");
        console.log(elem);
        // console.log(elem.getAtrribute("data-id"));
    //    console.log( element.querySelector("button").style.backgroundColor="blue");
    element.querySelector("button").setAttribute("aria-pressed","true");
    // element.querySelector("button").style.display="none";

        showNotes(String(elem));

        // ${element}.css({"background-color":"yellow"});
        





});
});
}

document.addEventListener('keyup', function (event) {
    if (event.key === '`')
     {
      document.getElementById("showNotebook").click();
        
        
    }
  });
  
