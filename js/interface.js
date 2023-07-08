

function play() {


    let scoreEnergie = 40;

    let tabStat = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]; //utilise pour généré les nombres aleatoire  approximativement  10% de 1 et 90% de 0
    let nbRow = 15;
    let nbCol = 25;

    let score = 0;
    let valeurCase = 0; //utilisé pour stocker la valeur  de la case vers laquelle l hero  se deplacera avant qu'elle soit changé



    // creation du tableau initial et remplissage aleatoire
    function creationMapInitiale() {
        let mapInitiale = [];
        for (let i = 0; i < nbRow; i++) {
            mapInitiale.push([]);
            for (let j = 0; j < nbCol; j++) {
                if (i === 7 && j === 12) {
                    mapInitiale[i].push(2);
                } else mapInitiale[i].push(tabStat[Math.floor(Math.random() * 9)]);
            }
        }
        return mapInitiale;
    }

    // creation d'une copie du tableau initial avec les chifres
    let copieMap = creationMapInitiale();



    // creation de map: tableau de la map du jeu qui stockera les images en fonction des valeurs de  tableau copieMap

    let map = [];
    for (let i = 0; i < nbRow; i++) {
        map.push([]);
        for (let j = 0; j < nbCol; j++) {
            map[i].push();
        }
    }

    //sauvgarde position hero
    var hero = {
        x: 7,
        y: 12,
    };

    // remplissage de tableau map avec les tresor piege hero et affichage
    // displaymap affiche la map
    function displaymap() {


        for (let i = 0; i < nbRow; i++) {
            for (let j = 0; j < nbCol; j++) {
                if (copieMap[i][j] === 3) {
                    map[i][j] = "";
                }
                if (copieMap[i][j] === 2) {
                    map[i][j] = '<img src="./img/hero.png" alt="">';
                }
                if (copieMap[i][j] === 1) {
                    map[i][j] = '<img src="./img/bitcoin.png" alt="">';
                }
                if (copieMap[i][j] === 0) {
                    map[i][j] = '<img src="./img/danger.png" alt="">';
                }
            }
        }
        // transformations de tableau java script vers tableau html
        let text = "<table>";
        for (var i = 0; i < nbRow; i++) {
            text += "<tr>";
            for (var j = 0; j < nbCol; j++) {
                text += "<td>" + map[i][j] + "</td>";
            }
            text += "</tr>";
        }
        text += "</table>";
        document.getElementById("map").innerHTML = text;

      
        document.getElementById("score").innerHTML = " score: " + score;
        document.getElementById("energie").innerHTML = " energie: " + scoreEnergie;
        
        win();
    }

    /****************************************fonctions direction hero************************************ */

    function GoUp() {
        valeurCase = copieMap[hero.x - 1][hero.y]; // cette ligne recupere la valeur de la case vers laquelle l hero  se deplace avant qu'elle soit changé
        copieMap[hero.x][hero.y] = 3;
        hero.x = hero.x - 1;
        if (hero.x < 0) {
            // limiter la sortie de l'hero
            hero.x = 0;
        }
        copieMap[hero.x][hero.y] = 2;
        //
        displaymap();
       
        scorePoint(valeurCase);
        energie(valeurCase);
        GameOver();
        
        ScoreBar();


        //affichage du score et energie
        document.getElementById("score").innerHTML = " score: " + score;
        document.getElementById("energie").innerHTML = " energie: " + scoreEnergie;
        
    }

    function GoDown() {
        valeurCase = copieMap[hero.x + 1][hero.y];
        copieMap[hero.x][hero.y] = 3;
        hero.x = hero.x + 1;
        if (hero.x > 14) {
            hero.x = 14;
        }
        copieMap[hero.x][hero.y] = 2;


        displaymap();
      
        scorePoint(valeurCase);
        energie(valeurCase);
        GameOver();
        ScoreBar();
       

        //affichage du score et energie
        document.getElementById("score").innerHTML = " score: " + score;
        document.getElementById("energie").innerHTML = " energie: " + scoreEnergie;
       
    }

    function GoRight() {
        valeurCase = copieMap[hero.x][hero.y + 1];

        copieMap[hero.x][hero.y] = 3;
        hero.y = hero.y + 1;
        console.log(hero.y);
        if (hero.y > 24) {
            hero.y = 24;
        }
        copieMap[hero.x][hero.y] = 2;

        displaymap();
       
        scorePoint(valeurCase);
        energie(valeurCase);
        GameOver();
        ScoreBar();
       
        //affichage du score et energie
        document.getElementById("score").innerHTML = " score: " + score;
        document.getElementById("energie").innerHTML = " energie: " + scoreEnergie;
     
    }

    function GoLeft() {
        valeurCase = copieMap[hero.x][hero.y - 1];

        copieMap[hero.x][hero.y] = 3;
        hero.y = hero.y - 1;
        if (hero.y < 0) {
            hero.y = 0;
        }
        copieMap[hero.x][hero.y] = 2;

        displaymap();
       
        scorePoint(valeurCase);
        energie(valeurCase);
        GameOver();
        
     
        ScoreBar();
        //affichage du score et energie
        document.getElementById("score").innerHTML = " score: " + score;
        document.getElementById("energie").innerHTML = " energie: " + scoreEnergie;
       
    }

    /**************************************fin fonctions direction hero************************************ */


    /*** fonction qui calcule le score  */
    function scorePoint(a) {
        if (a === 0) {
            score = score - 50;
            //alert('azul');
        }
        if (a === 1) {
            score = score + 1000;
        }
        if (a === 3) {
            score = score - 10;
        }
    }

    /**fonction qui calcule l energie restante */
    function energie(a) {
        if (a === 0) {
            scoreEnergie = scoreEnergie - 1;
        }
    }

    /**************************************gestions des touche clavier***************************** */
    //mouvement
    // 3 = null;
    // 2= hero;
    // 1= tresor
    // 0= danger
    document.addEventListener("keydown", function (e) {
        switch (e.key) {
            case "ArrowUp":
               
                GoUp();

                break;
            case "ArrowDown":
                
                GoDown();

                break;
            case "ArrowRight":
             
                GoRight();
                break;
            case "ArrowLeft":
               
                GoLeft();

                break;
        }
    });

    /******************************fin gestions des touche clavier***************************** */

    /**********************gestion des fleches up right down left et exit******************** */

    const goup = document.querySelector("#up");
    goup.onclick = () => {
        GoUp();
    };

    const goleft = document.querySelector("#left");
    goleft.onclick = () => {
        GoLeft();
    };

    const godown = document.querySelector("#down");
    godown.onclick = () => {
        GoDown();
    };
    const goright = document.querySelector("#right");
    goright.onclick = () => {
        GoRight();
    };
    const close = document.querySelector("#close");
    close.onclick = () => {
        let gameover = confirm(
            " Game over \n" + "votre score est " + score + "\n voulez vous quitter"
        );
        if (gameover === true) {
            scoreEnergie=40;
            play();
        }
    };

    /***************************fin de gestion des fleches up right down left********************************* */

    displaymap();


    // fonction qui affiche la barre de score a travers un tableau js   transformé en tab html
    function ScoreBar() {
        let scoreBar = "<table >";

        scoreBar += "<tr>";
        for (var j = 0; j < scoreEnergie; j++) {
            scoreBar += "<td>" + "" + "</td>";
        }
        scoreBar += "</tr>";

        scoreBar += "</table>";
        document.getElementById("scorbarr").innerHTML = scoreBar;
    }
    ScoreBar();


    // fonction qui detecte le win selon le nombre de bitcoin sur la map

    function win() {
        let compteurBitcoin = 0;
        for (let i = 0; i < nbRow; i++) {
            for (let j = 0; j < nbCol; j++) {
                if (copieMap[i][j] === 0) {
                    compteurBitcoin++;
                }
            }
        }
        if (compteurBitcoin === 0) {
            alert(" you win \n" + "votre score est " + score);
            play();
        }
    }



    // fonction qui detecte le game over
    function GameOver() {

        if (scoreEnergie <= 0) {
            let gameover = confirm(
                " Game over \n" + "votre score est " + score + "\n voulez vous rejouer" + scoreEnergie
            );
            if (gameover === true) {
         
                scoreEnergie = 40;
                play();
                
            }
            else {

                play();
            }
        }
    }
    
}
play();
 // appel a la fonction du jeu complet
