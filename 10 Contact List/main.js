
var data = fetch("https://randomuser.me/api/?results=5");
data.then(function(result){
  return result.json();
}).then( resultjson => {
  const authors = resultjson.results;
  var index = 0;
  var boxFavorites = document.querySelector(".box-favorites"); 
  var dragStart = function ( ev ) {     
    ev.dataTransfer.setData("text", ev.target.id);
  } 
  var dragIng = function( e ) {
    console.log("en dragIng");
  }  
  var dragEnd = function( e ) {
    e.className = "box";
  }  
  var dragOver = function( e ) {
    boxFavorites.classList.add("hovered");
    e.preventDefault();
  }
  var dragEnter = (e) => {
    //e.preventDefault();
  }   
  var dragLeave = function( e ) {
    boxFavorites.classList.remove("hovered"); 
  }  
  var dragDrop = function( ev ) {
    var msgDragAndDrop = document.querySelector(".welcome-drag-and-drop");
    if(msgDragAndDrop)
      msgDragAndDrop.remove();
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var card = document.getElementById(data);
    var figure = card.getElementsByTagName("figure")[0];
    card.classList.add("in-favorites");
    figure.classList.add("figure-blue");
    figure.classList.remove("figure-gray");
    boxFavorites.appendChild(card);
  }

  authors.forEach(element => {
    var articleElement = document.createElement("article");
    var figureElement = document.createElement("figure");
    var spanElement = document.createElement("span");
    var flagImgElement = document.createElement("img");
    var srcFlag = "https://www.countryflags.io/" + element.nat +"/flat/32.png";
    flagImgElement.src = srcFlag;

    spanElement.innerHTML = (element.name.first + " " + element.name.last);
    var pElement = document.createElement("p");
    pElement.innerHTML = ("Email: " + element.email + "<br>" + "Phone: " + element.phone );
    var figcaptionElement = document.createElement("figcaption");
    figcaptionElement.append ( spanElement );
    figcaptionElement.append ( flagImgElement );
    figcaptionElement.append ( pElement );

    var imgElement = document.createElement("img");
    imgElement.src = element.picture.large;
    imgElement.className = "img-photo";

    var sectionElement = document.querySelector ("section");
    figureElement.classList.add("figure-gray");
    figureElement.append ( figcaptionElement );
    figureElement.append ( imgElement );
    articleElement.draggable = true;
    articleElement.id = "article-"+index;
    articleElement.addEventListener('dragstart', dragStart, false);
    articleElement.append ( figureElement );
    sectionElement.append ( articleElement );
    articleElement.addEventListener("click", (ev) => {
      if(articleElement.classList.contains("in-favorites")){     
        articleElement.classList.remove("in-favorites");
        figureElement.classList.remove("figure-blue");
        figureElement.classList.add("figure-gray");
        var sectionBox = document.querySelector("section");
        sectionBox.appendChild(articleElement);
      }
    });
    index++; 

    boxFavorites.addEventListener("dragstart", dragStart);
    boxFavorites.addEventListener("dragover", dragOver);
    boxFavorites.addEventListener("dragenter", dragEnter);
    boxFavorites.addEventListener("dragleave", dragLeave);
    boxFavorites.addEventListener("drop", dragDrop);
  });
});