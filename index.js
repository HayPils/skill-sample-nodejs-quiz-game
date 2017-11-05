const Alexa = require('alexa-sdk');

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

const handlers = {
    "LaunchRequest": function() {
        this.emit("Welcome to Rememoir");
     },
    "AskQuestion": function() {
        let random = getRandom(0, data.length-1);
        let question = data[random].Question;

        //this.attributes["questionItem"] = question;

        //let speech = this.attributes["response"] + question;

        this.emit(":ask", question, question);
    },
    "AMAZON.YesIntent": function() {
        this.emit(":tell", "That sounds like a hoot and a half")
    }
};

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};