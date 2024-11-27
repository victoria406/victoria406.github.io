document.addEventListener('DOMContentLoaded', init, false);
function init(){

  document.addEventListener("click",whatCell);
  const collection = document.getElementsByClassName("grid-item");
  let clone = collection[0];
  let counter = 0;
  function whatCell(event){
    for (let item of collection){
      var rect = item.getBoundingClientRect();
      var x = event.clientX;
      var y = event.clientY;
      if (x <= rect.right && x >= rect.left && y <= rect.bottom && y >= rect.top) {
        clone = item.cloneNode(true);
        clone.className = "dummy" + Math.trunc(x).toString() + Math.trunc(y).toString();
        clone.style.position = "fixed";
        let test = ".dummy" + Math.trunc(x).toString() + Math.trunc(y).toString();
        document.querySelector(".ghost-container").appendChild(clone);
        gsap.fromTo(test, 
          {y: rect.top-200, x: rect.left},
          {y: -280, x: window.innerWidth-105, 
            onComplete() {
              counter++;
              document.getElementById("counter").innerHTML = "Items: " + counter;
            },
            rotation: 720, opacity: 0, ease: "power1.out", duration: 3}
        );
      }
    }
    
  }
}
