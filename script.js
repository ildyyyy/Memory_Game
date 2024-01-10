// ensure everything is loaded
document.addEventListener("DOMContentLoaded", function() {

    const gameContainer = document.getElementById("game");
    let chosen1 = null;
    let chosen2 = null;
    let numberFlipped = 0;
    let noClick = false;

    const COLORS= [
      "red",
      "blue",
      "green",
      "orange",
      "purple",
      "red",
      "blue",
      "green",
      "orange",
      "purple"
    ];

    // here is a helper function to shuffle an array
    // it returns the same array with values shuffled
    // it is based on an algorithm called Fisher Yates if you want ot research more
    function shuffle(array) {
      let counter = array.length;

      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }

      return array;
    }

    let shuffledColors = shuffle(COLORS);

    // this function loops over the array of colors
    // it creates a new div and gives it a class with the value of the color
    // it also adds an event listener for a click for each card
    function createDivsForColors(colorArray) {
      for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
      }
    }

    // function for gameplay
    function handleCardClick(event) {
      if(noClick) return;
      if(event.target.classList.contains("flipped")) return;

      let selection = event.target;
      selection.style.backgroundColor = selection.classList[0];

      // checks for match, adds flipped class
      if(!chosen1 || !chosen2){
        selection.classList.add("flipped");
        chosen1 = chosen1 || selection;
        chosen2 = selection === chosen1 ? null : selection;
      }

      if( chosen1 && chosen2){
        noClick = true;

        let item1 = chosen1.className;
        let item2 = chosen2.className;

        // if cards match, they will stay upright and cannot be clicked
        if( item1 === item2){
          numberFlipped += 2;
          chosen1.removeEventListener("click", handleCardClick);
          chosen2.removeEventListener("click", handleCardClick);
          chosen1 = null;
          chosen2 = null;
          noClick = false;
        }
        // if cards do not match, they will slowly change color back to normal
        else{
          setTimeout(function(){
            chosen1.style.backgroundColor = "";
            chosen2.style.backgroundColor = "";
            chosen1.classList.remove("flipped");
            chosen2.classList.remove("flipped");
            chosen1 = null;
            chosen2 = null;
            noClick = false;
          }, 1000)
        }
      }

      if( numberFlipped === COLORS.length) alert("Game Over!");
    }


    // when the DOM loads
    createDivsForColors(shuffledColors);

    });
