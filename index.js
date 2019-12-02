let questions = ["Hyper Text Markup Language stands for?", "JavaScript was created by?", "InPlayer was formed in?",
    "The capital of Macedonia is?", "How many options are in this quiz?"];
let answers = [["HTML", "JavaScript", "Java", "C#"], ["Netscape", "Oracle", "Google", "Facebook"],
    ["2010", "2009", "2005", "2012"], ["Skopje", "Bitola", "Prilep", "Ohrid"], ["4", "1", "2", "3"]];
let correctAnswers = ["HTML", "Netscape", "2010", "Skopje", "4"];
let answeredCorrectly = 0;
let currentQuestion = 0;
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let highScoresList = document.getElementById("highScoresList");
const MAX_HIGH_SCORES = 5;

playAgain();

function shuffleArray(array) {
    let cidx, ridx, tmp;
    cidx = array.length;
    while (cidx !== 0) {
        ridx = Math.floor(Math.random() * cidx);
        cidx--;
        tmp = array[cidx];
        array[cidx] = array[ridx];
        array[ridx] = tmp;
    }
    return array;
}


function nextQuestion() {
    for (let i = 0; i < 4; i++)
    {
        document.getElementsByClassName("btn").item(i).style = "background-color = none !important";
    }
    if(currentQuestion < 4)
    {
        currentQuestion++;
        document.getElementById("question").innerHTML = questions[currentQuestion];
        shuffleArray(answers[currentQuestion]);
        for(let i = 0; i < 4; i++)
        {
            document.getElementById("option" + i.toString()).value = answers[currentQuestion][i];
        }
    } else
    {
        document.getElementById("title").innerHTML = "Result";
        document.getElementById("question").innerHTML = "Your score is " + answeredCorrectly;
        document.getElementById("buttons").style.display = "none";
        document.getElementById("textQuestion").style.display = "none";
        document.getElementById("repeatButton").style.display = "inline";
        document.getElementById("scoreButton").style.display = "inline";
    }
}

function choose(btn) {
    if(btn.value === correctAnswers[currentQuestion])
    {
        answeredCorrectly++;
        document.getElementById("scoreNumber").innerHTML = (answeredCorrectly).toString();
        btn.style = "background-color: green !important"
    } else {
        btn.style = "background-color: red !important";
    }
    if(currentQuestion < 4)
    {
        document.getElementById("currentQuestionNumber").innerHTML = (currentQuestion + 2).toString();
    } else if (currentQuestion === 4)
    {
        document.getElementById("currentQuestionNumber").innerHTML = "5";
    }
    window.setTimeout(nextQuestion, 1000);
}

function playAgain() {
    answeredCorrectly = 0;
    currentQuestion = 0;

    highScoresList.style.display = "none";
    document.getElementById("repeatButton").style.display = "none";
    document.getElementById("scoreButton").style.display = "none";
    document.getElementById("currentQuestionNumber").innerHTML = "1";
    document.getElementById("scoreNumber").innerHTML = "0";
    document.getElementById("title").innerHTML = "InPlayer Quiz";
    document.getElementById("buttons").style.display = "inline";
    document.getElementById("textQuestion").style.display = "inline";
    document.getElementById("questionTotal").innerHTML = questions.length.toString();
    document.getElementById("scoreTotal").innerHTML = questions.length.toString();
    document.getElementById("question").innerHTML = questions[currentQuestion];
    shuffleArray(answers[currentQuestion]);
    for(let i = 0; i < 4; i++)
    {
        document.getElementById("option" + i.toString()).value = answers[currentQuestion][i];
    }
}



function saveScore() {
    let user = window.prompt("Please enter your user name", "");
    document.getElementById("title").innerHTML = "High Scores";

    const score = {
        score: answeredCorrectly.toString(),
        name: user
    };

    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));


    highScoresList.innerHTML = highScores.map( score => { return `<li class="high-score">${score.name} - ${score.score}</li>`;
    }).join("");
    document.getElementById("question").innerHTML = "The top 5 highest scores are";
    highScoresList.style.display = "inline";
    document.getElementById("scoreButton").style.display = "none";

}