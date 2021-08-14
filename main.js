const KAIDAN_COUNT = 15;
var kaidans;
var finisheds = [];
var texts = ["1フロアの間武器か盾しか落ちていない",
    "3フロアの間武器か盾しか落ちていない",
    "3フロアの間草しか落ちていない",
    "1フロアの間巻物しか落ちていない",
    "3フロアの間巻物しか落ちていない",
    "1フロアの間壺しか落ちていない",
    "3フロアの間壺しか落ちていない",
    "4フロアの間ギタンしか落ちていない",
    "2フロアの間HPの自然回復無し、罠が多い",
    "4フロアの間HPの自然回復無し、罠が多い",
    "3フロアの間ずっと夜",
    "2フロアの間店が出る",
    "5フロアの間マゼルン種大量発生",
    "3フロアの間モンスターハウスが出る",
    "7フロアの間モンスターハウスが出る"]
    
function reset() {
    finisheds = [];
    kaidans = new Array(KAIDAN_COUNT);
    for (let i = 0; i < kaidans.length; i++) {
        kaidans[i] = i;
        changeImage(i,'kaidan.png');
    }
    kaidans = kaidans.sort(() => Math.random() - 0.5);
    let element = document.getElementById("c-list");
    element.innerHTML = "";

    next();
}
function next() {
    if (finisheds.length > 0) {
        let current = finisheds[finisheds.length - 1];
        changeImage(current,'kaidan0.png');
    }
    let index = kaidans.pop()
    if(index === undefined)
        return;
    finisheds.push(index)
    
    saveStrage();

    changeImage(index,'kaidan2.png');
    addText(index);
};
function generateImage() {
    kaidanElements = new Array(KAIDAN_COUNT);

    let wrapper = document.getElementById('img-wrapper');
    for (let i = 0; i < KAIDAN_COUNT; i++) {
        let img = document.createElement('img');
        img.id = `${i}`;
        img.src = 'kaidan.png';
        wrapper.appendChild(img);
    }
}
function addText(index){
    let text = texts[index];
    let element = document.getElementById("c-list");

    let newElement = document.createElement("li"); 
    let newContent = document.createTextNode(`${text}`);
    newElement.appendChild(newContent);
    newElement.setAttribute("class","list-group-item");
    element.appendChild(newElement);

    let textElement = document.getElementById("text");
    textElement.textContent = `${text}`;
}
function changeImage(index,src){
    let img = document.getElementById(`${index}`);
    img.src = src;
}
function saveStrage(){
    localStorage.setItem('finished', JSON.stringify(finisheds));
    localStorage.setItem('kaidan', JSON.stringify(kaidans));
}
function loadStrage(){
    finisheds = JSON.parse(localStorage.getItem('finished'));
    kaidans = JSON.parse(localStorage.getItem('kaidan'));
    
    for (let i = 0; i < finisheds.length; i++) {
        let index = finisheds[i];
        changeImage(index,'kaidan0.png');
        if(i === finisheds.length-1){
            changeImage(index,'kaidan2.png');
        }
        addText(index)
    }
}
window.onload = function () {
    generateImage();
    if (localStorage.getItem("finished") === null) {
        reset();
    }else{
        loadStrage();
    }
};