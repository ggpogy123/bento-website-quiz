var savedscore=localStorage.getItem("userscore");
var totalq=localStorage.getItem("totalquestions");

if(savedscore===null){
    savedscore=0;
}
if(totalq===null){
    totalq=10;
}

savedscore=parseInt(savedscore);

var scorenumber=document.getElementById("score-number");
var leaderboardlist=document.getElementById("highscores-list");
var savebox=document.getElementById("save-box");

scorenumber.innerText=savedscore+"/"+totalq;

function displayleaderboard(){
    var savedlist=localStorage.getItem("quizleaderboard");
    var listarray=[];

    if(savedlist!==null){
        listarray=JSON.parse(savedlist);
    }
    leaderboardlist.innerHTML='';

    if(listarray.length===0){
        var li=document.createElement("li");
        li.innerText="No high scores yet.";
        leaderboardlist.appendChild(li);
        return;
    }

    for(var i=0;i<listarray.length;i++){
        var li=document.createElement("li");
        li.innerText=listarray[i].name+':'+listarray[i].score+" /10";
        leaderboardlist.appendChild(li);
    }
}

function savescore(){
    var nameinput=document.getElementById("player-name").value;

    if(nameinput===""){
        alert("Please enter a name first!");
        return;
    }

    var savedlist=localStorage.getItem("quizleaderboard");
    var listarray=[];

    if(savedlist!==null){
        listarray=JSON.parse(savedlist);
    }

    var newentry={
        name: nameinput.toUpperCase(),
        score: savedscore
    };
    listarray.push(newentry);

    listarray.sort(function(a,b){
        return b.score-a.score;
    });

    if(listarray.length>5){
        listarray=listarray.slice(0,5);
    }

    localStorage.setItem("quizleaderboard", JSON.stringify(listarray));

    savebox.style.display='none';
    displayleaderboard();
}
displayleaderboard();