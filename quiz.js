// questions
var questionlist=[
{
    q:"What is the green spicy paste often served with sushi?",
    answers:["Wasabi", "Matcha","Guacamole","Pesto"],
    correct:"Wasabi"
},
{
    q:"What type of food is ramen?",
    answers:["Noodle Soup","Rice Ball","Pancake","Dessert"],
    correct:"Noodle Soup"
},
{
    q:"What is the dark seaweed sheet used to wrap sushi called?",
    answers:["Kelp","Tofu","Miso","Nori"],
    correct:"Nori"
},
{
    q:"What is a traditional japanese packed lunch box called?",
    answers:["Bento","Donburi","Nabe","Tempura"],
    correct:"Bento"
},
{
    q:"What are Takoyaki balls filled with?",
    answers:["Beef","Cheese","Octopus","Chicken"],
    correct:"Octopus"
},
{
    q:"What is Gyoza?",
    answers:["Dumplings","Rice Crackers","Fish cakes","Sweet buns"],
    correct:"Dumplings"
},
{
    q:"What is the primary ingredient used to make tofu?",
    answers:["Soybeans","Rice","Wheat","Potato"],
    correct:"Soybeans"
},
{
    q:"What is tempura?",
    answers:["Battered and deep-fried food","Fermented Rice","Raw Sliced fish","Pickled Radish"],
    correct:"Battered and deep-fried food"

},
{
    q:"What is japanese powdered green tea called?",
    answers:["Sake","Chai","Matcha","Sencha"],
    correct:"Matcha"
},
{
    q:"What is a triangular Japanese rice ball called?",
    answers:["Onigiri","Mochi","Sashimi","Udon"],
    correct:"Onigiri"
}
];

function shuffle(arr){
    return arr.sort(function(){
        return 0.5-Math.random();
    });
}

var currentQues=0;
var currentscore=0;
var timeleft=15;
var countdown=null;

var countertext=document.getElementById("counter-text");
var timertext=document.getElementById("timer-text");
var questionbox=document.getElementById("question-box");
var choicebox=document.getElementById("choices");
var nextbtn=document.getElementById("next-button");

shuffle(questionlist);

function showquestion(){
    clearInterval(countdown);
    timeleft=15;
    timertext.innerText="Time: "+ timeleft+"s";
    nextbtn.style.display="none";
    var currentQ=questionlist[currentQues];
    countertext.innerText="Question"+(currentQues+1)+" of "+questionlist.length;
    questionbox.innerText=currentQ.q;

    choicebox.innerHTML='';
    var shuffledans=shuffle([...currentQ.answers]);
    for(var i=0;i<shuffledans.length;i++){
        var button=document.createElement("button");
        button.className='choice-btn';
        button.innerText=shuffledans[i];
        button.onclick=function(){
            checkans(this.innerText);

        };
        choicebox.appendChild(button);
    }
    countdown=setInterval(function() {
        timeleft=timeleft-1;
        timertext.innerText="Time: "+timeleft+"s";
        if (timeleft<=0){
            clearInterval(countdown);
            checkans(null);
        }
    }, 1000);
}

function checkans(selectedans){
    clearInterval(countdown);
    var currentQ=questionlist[currentQues];
    var allbuttons=document.getElementsByClassName("choice-btn");

    for(var i=0;i<allbuttons.length;i++){
        allbuttons[i].disabled=true;
        if(allbuttons[i].innerText===currentQ.correct){
            allbuttons[i].classList.add("correct-btn");
        }

        if(allbuttons[i].innerText===selectedans&&selectedans!==currentQ.correct){
            allbuttons[i].classList.add("wrong-btn");
        }
    }

    if (selectedans===currentQ.correct){
        currentscore=currentscore+1;
    }
    nextbtn.style.display="inline-block";
}

nextbtn.onclick=function(){
    currentQues=currentQues+1;
    console.log("Moved to question:", currentQues);
    if(currentQues<questionlist.length){
        showquestion();
    } else {
        console.log("Quiz complete saving score", currentscore);
        localStorage.setItem("userscore",currentscore);
        localStorage.setItem("totalquestions",questionlist.length);
        console.log("saved to localstorage");
        window.location.href='results.html';
    }
};

showquestion();