'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this:  const APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
const APP_ID = undefined;

const data = [
        {Question: "If you have played the piano, do you remember practicing?"},
		{Question: "If you have driven a tractor, do you remember sitting in the driver seat?"},
		{Question: "If you have owned a pet, do you remember the color of that pet?"},
		{Question: "If you have been to a foreign country, do you remember a food you tried there?"},
		{Question: "If you had a childhood best friend, do you remember their name?"},
		{Question: "If you were a scout, do you remember earning badges?"},
		{Question: "If you had a bicycle as a child, do you remember learning how to ride it?"},
		{Question: "If you have ridden a horse, do you remember where you did for the first time?"},
		{Question: "If you have ridden a motorcycle, do you remember the first time?"},
		{Question: "If you have been to an ocean, do you remember the first time you visited?"},
		{Question: "If you've ever flown a kite, do you remember getting it stuck in a tree?"},
		{Question: "If you've ever been rollerblading, do you remember injuring yourself?"},

            ];

const quizHandlers = Alexa.CreateStateHandler(states.QUIZ,{
    "AskQuestion": function() {
        if (this.attributes["counter"] == 0)
        {
            this.attributes["response"] = START_QUIZ_MESSAGE + " ";
        }

        let random = getRandom(0, data.length-1);
        let item = data[random];

        let propertyArray = Object.getOwnPropertyNames(item);
        let property = propertyArray[getRandom(1, propertyArray.length-1)];

        this.attributes["quizitem"] = item;
        this.attributes["quizproperty"] = property;
        this.attributes["counter"]++;

        let question = getQuestion(this.attributes["counter"], property, item);
        let speech = this.attributes["response"] + question;

        this.emit(":ask", speech, question);
    },
    "AnswerIntent": function() {
        let response = "";
        let speechOutput = "";
        let item = this.attributes["quizitem"];
        let property = this.attributes["quizproperty"]

        let correct = compareSlots(this.event.request.intent.slots, item[property]);

        if (correct)
        {
            response = getSpeechCon(true);
            this.attributes["quizscore"]++;
        }
        else
        {
            response = getSpeechCon(false);
        }

        response += getAnswer(property, item);

        if (this.attributes["counter"] < 10)
        {
            response += getCurrentScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        else
        {
            response += getFinalScore(this.attributes["quizscore"], this.attributes["counter"]);
            speechOutput = response + " " + EXIT_SKILL_MESSAGE;

            this.response.speak(speechOutput);
            this.emit(":responseReady");
        }
    }
});