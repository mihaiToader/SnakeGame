/**
 * Created by Mihai on 21.04.2017.
 */

window.onload = function(){
    var sceneDiv = document.getElementById("scene");
    var score_board = document.getElementById("score");

    var timeStarted = new Date().getTime();

    var mapLength = 100;
    var snakeStartingSegments = 5;
    var snakeSegmentWidth = 5;
    var snakeSegmentHeight = 5;
    var cubeDimension = 5;
    /*
     1 - UP
     2 - Right
     3 - Down
     4 - Left
     */
    var direction = 1;


    /* Snake */
    var Snake = new Array(snakeStartingSegments);

    /* Matrice with the Map*/
    var Map = new Array(mapLength);
    for (var i =0; i<mapLength; i++){
        Map[i] = new Array(mapLength);
    }

    /*Game is active: true
      Game is end: false */
    var active = true;

    var score = 0;

    var food = {'x':0, 'y': 0};

    function clearMap(){
        while (sceneDiv.firstChild) {
            sceneDiv.removeChild(sceneDiv.firstChild);
        }

        for (var i = 0; i<mapLength; i++){
            for (var j = 0; j<mapLength; j++){
                Map[i][j] = 0;
            }
        }
    }

    function generateFood(){
        var cordX = Math.floor((Math.random() * 98) + 1);
        var cordY = Math.floor((Math.random() * 98) + 1);
        while (Map[cordX][cordY] == 1){
            cordX = Math.floor((Math.random() * 98) + 1);
            cordY = Math.floor((Math.random() * 98) + 1);
        }
        food['x'] = cordX;
        food['y'] = cordY;
    }

    //Create snake for the first time
    function createSnake(){
        var startingPositionX = 50;
        var startingPositionY = 48;
        for (var i=0; i<snakeStartingSegments; i++){
            Snake[i] = {'x':startingPositionX, 'y':startingPositionY+i};
            Map[startingPositionX][startingPositionY+i] = 1;
        }
    }

    function renderMap(){
        scaleAndAdd(food['x'], food['y'], 4, 4, "red");

        for (var i = 0; i<mapLength; i++){
            for (var j = 0; j<mapLength; j++){
                if (Map[i][j] == 1){
                    if (Snake[0]['x'] == i && Snake[0]['y'] == j){
                        scaleAndAdd(i,j,snakeSegmentWidth,snakeSegmentHeight,"white");
                    }else{
                        scaleAndAdd(i,j,snakeSegmentWidth,snakeSegmentHeight,"yellow");
                    }
                }
            }
        }
    }

    function scaleAndAdd(x,y,w,h,color){
        addElementToMap(x*cubeDimension, y*cubeDimension, w, h, color);
    }

    function addElementToMap(x,y,w,h,color){
        var iDiv = document.createElement('div');
        iDiv.style.position = "absolute";
        iDiv.style.left = x + 'px';
        iDiv.style.top = y + 'px';
        iDiv.style.width = w + 'px';
        iDiv.style.height = h + 'px';
        iDiv.style.backgroundColor = color;

        sceneDiv.appendChild(iDiv);
    }

    function renderScore(){
        score_board.innerHTML = "Score: " + score;
    }

    function eatFood() {
        // Check if the snake ate the food, if so returns true
        for(var i = 0; i < Snake.length; i++)
            if(Snake[i]['x'] == food['x'] && Snake[i]['y'] == food['y'])
            {
                return true;
            }
        return false;
    }

    function checkForCanibalism() {
        // Checks if the snake ate himself, if so returns true
        for(var i = 0; i < Snake.length; i++) {
            for(var j = 0; j < Snake.length; j++)
            {
                if(i != j) {
                    if(Snake[i]['x'] == Snake[j]['x'] && Snake[i]['y'] == Snake[j]['y'])
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    var oVariabila = setInterval(function() {
        var nowTime = new Date().getTime();
        // Find the distance between now an the count down date
        var distance = nowTime - timeStarted;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("startedTime").innerHTML = "Time: " + days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";
    },100);

    clearMap();
    createSnake();
    generateFood();
    renderMap();

    window.addEventListener('keydown', function(e) {
        // Check if the snake needs to change direction
        //left
        if(e.keyCode == 37 && direction != 4 && direction != 2) {
            direction = 4;
            //setTimeout(function(){}, 700);
        }
        //up
        if(e.keyCode == 38 && direction != 1 && direction != 3) {
            direction = 1;
            //setTimeout(function(){}, 700);
        } else
        //right
        if(e.keyCode == 39 && direction != 2 && direction != 4) {
            direction = 2;
            //setTimeout(function(){}, 700);
        } else
        //down
        if(e.keyCode == 40 && direction != 3 && direction != 1) {
            direction = 3;
            //setTimeout(function(){}, 700);
        }
    });

    window.setInterval(function() {
        if(active == 1) {
            clearMap();

            // Update snake's coordinates

            var newSnake = [];

            for(var i = Snake.length - 1 ; i > 0; i--) {
                newSnake[i] = Snake[i-1];
                Map[newSnake[i]['x']][newSnake[i]['y']] = 1;
            }

            newSnake[0] = {'x': 0, 'y': 0};

            if(direction == 1) {
                newSnake[0]['y'] = Snake[0]['y'] - 1;
                newSnake[0]['x'] = Snake[0]['x'];
            } else
            if(direction == 2) {
                newSnake[0]['y'] = Snake[0]['y'];
                newSnake[0]['x'] = Snake[0]['x'] + 1;
            } else
            if(direction == 3) {
                newSnake[0]['y'] = Snake[0]['y'] + 1;
                newSnake[0]['x'] = Snake[0]['x'];
            } else
            if(direction == 4) {
                newSnake[0]['y'] = Snake[0]['y'];
                newSnake[0]['x'] = Snake[0]['x'] - 1;
            }

            // Update snake position
            Snake = newSnake;

            // Check if the snake hit the wall, if so, the game ends
            if(Snake[0]['x'] == 0 || Snake[0]['x'] == mapLength  || Snake[0]['y'] == 0 || Snake[0]['y'] == mapLength){
                active = 0;
            }
            else{
                Map[newSnake[0]['x']][newSnake[0]['y']] = 1;
            }

            // Check if the snake ate the food
            if(eatFood() == true)
            {
                Snake.push({'x': Snake[Snake.length-1]['x'], 'y': Snake[Snake.length-1]['y']});
                generateFood();
                score = score + 1;
            } else {
                // Check if the snake ate himself, if so the game ends
                if(checkForCanibalism() == true) {
                    active = 0;
                }
            }

            // If everything went well, update the scene
            renderMap();
            renderScore();
        } else {
            // If the game ended, print the message
            score_board.innerHTML = "Game over! Please refresh the page to try again.";
        }

    }, 100);
};