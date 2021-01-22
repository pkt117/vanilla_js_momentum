const clockContainer = document.querySelector(".js-clock"),
// js-clock클래스의 자식을 탐색한다.
clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${
        hours < 10? `0${hours}`: hours}:${
        minutes< 10? `0${minutes}`: minutes}:${
        seconds < 10? `0${seconds}`: seconds}`;
}

function init(){
    getTime();
    setInterval(getTime,1000); //1000밀리초(1초)마다 getTime 함수실행
}
init();

