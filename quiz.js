// questions
var questionlist=[
{
    q:"What does HTML stand for?",
    answers:["Hypertext Markup Language", "Hyperlinks Text Mark language","Home Tool Markup Language","Hyper Transfer Markup Laungage"],
    correct:"Hypertext Markup Language"
},
{
    q:"Which protocol is used for secure browsing?",
    answers:["HTTP","HTTPS","SMTP","FTP"],
    correct:"HTTPS"
},
{
    q:"Which data structure works on LIFO concept?",
    answers:["Queue","Array","Stack","Tree"],
    correct:"Stack"
},
{
    q:"Which programming language is used for styling web pages?",
    answers:["C++","Python","CSS","HTML"],
    correct:"CSS"
},
{
    q:"What is the standard port number for HTTP?",
    answers:["80","443","21","404"],
    correct:"80"
},
{
    q:"Which variable type cannot be changed in javascript?",
    answers:["int","var","let","const"],
    correct:"const"
},
{
    q:"What is Git?",
    answers:["Github","Version Control system","Text editor","VScode plugin"],
    correct:"Version Control system"
},
{
    q:"What is used to define the algorithm speed?",
    answers:["Big O","Big Theta","Little O","Alpha"],
    correct:"Big O"

},
{
    q:"Which command removes an empty directory?",
    answers:["rmdir","clean","delete","remove"],
    correct:"rmdir"
},
{
    q:"Which is an SQL database?",
    answers:["MongoDB","Python","MySQL","NumPy"],
    correct:"MySQL"
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
    if(currentQues<questionlist.length){
        showquestion();
    } else {
        localStorage.setItem("userscore",currentscore);
        localStorage.setItem("totalquestions",questionlist.length);
        window.location.href='results.html';
    }
};

showquestion();