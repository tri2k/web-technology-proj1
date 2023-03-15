let questionList = document.querySelectorAll(".questions__card");
questionList.forEach(question => question.addEventListener("click", clickedCard, false));

let answerList = document.querySelectorAll(".questions__answer");
answerList.forEach(answer => answer.addEventListener("click", clickedAnswer, true));


// User clicked the card
function clickedCard(e) {
    titleNode = e.currentTarget.querySelector(".questions__card-title");
    questionNode = e.currentTarget.querySelector(".questions__question");
    answerNode = e.currentTarget.querySelector(".questions__answer");

    if (questionNode.style.display == "block") {
        // VISIBLE => INVISIBLE
        questionNode.style.display = "none";
        answerNode.style.display = "none";
        titleNode.style.display = "block";

        e.currentTarget.style.justifyContent = "center";

    } else {
        // INVISIBLE => VISIBLE
        questionNode.style.display = "block";
        answerNode.style.display = "block";
        titleNode.style.display = "none";


        e.currentTarget.style.justifyContent = "space-between";
        blurAnswer(answerNode, true);
    }
}

// User clicks the answer node
function clickedAnswer(e) {
    answer = e.currentTarget;
    if (answer.style.display == "block") {
        // executed when the question and answer are shown to prevent user from clicking the answer while it is hidden

        // color = aliceblue => target is visible
        if (e.target.style.color == "aliceblue"){
            blurAnswer(answer, true);
        } else {
            blurAnswer(answer, false);
        }
        e.stopPropagation();
    }

}

// Blurs answerNode by adding textShadows
function blurAnswer(answerNode, blur) {

    if (blur) {
        answerNode.style.textShadow = "0 0 8px aliceblue";
        answerNode.style.color = "transparent";
    } else {
        answerNode.style.textShadow = "none";
        answerNode.style.color = "aliceblue";
    }

}