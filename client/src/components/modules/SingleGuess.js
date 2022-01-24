import React from "react";

/**
 * Component to render a single guess
 * 
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the comment
 */

const SingleGuess = (props) => {
    return (
        <div >
            my vote:
        </div>
    );
}
export default SingleGuess;

let poll = {
    question: "What's your favorite programming language?",
    answers: [
        "C","Java", "PHP", "Javascript"
    ],
    pollCount: 20,
    answersWeight: [4,4,2,10],
    selectedAnswer: -1


};

let pollDOM = {
    question:document.querySelector(".poll .question"),
    answers:document.querySelector(".poll .answers")

};

pollDOM.question.innerText = poll.question;
poll.answers.innerHTML = poll.answers.map(function(answer,i){
    return (
        <div onclick="markAnswer('${i}')" >
            ${answer}

        </div>
    );
}).join("");

function markAnswer(i){
    poll.selectedAnswer = +1;
    try {

        document.querySelector(".poll .answers .answer .selected").classList.remove("selected")
    } catch(msg) {}
}