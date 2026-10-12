var savedtheme=localStorage.getItem("quiztheme");
var themebtn=document.getElementById("theme-toggle");

if (savedtheme==="light"){
    document.body.classList.add("light-mode");
    if(themebtn){
        themebtn.innerText="Dark Mode";
    }
}

function toggletheme() {
    document.body.classList.toggle("light-mode");


    if(document.body.classList.contains("light-mode")){
        localStorage.setItem("quiztheme","light");
        if(themebtn){
            themebtn.innerText="Dark Mode";
        }
    }else{
        localStorage.setItem("quiztheme","dark");
        if(themebtn){
            themebtn.innerText="Light Mode";
        }
    }
}