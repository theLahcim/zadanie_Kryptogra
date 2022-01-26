var pkt = document.getElementById("punkty");
var podp = document.getElementById("podpowiedz");
var input = document.getElementById("odp");
var modal = document.getElementById("myModal");
var win = document.getElementById("win");

function openModal(){
    modal.style.display = "block";
}

function closeModal(){
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
}}

if (sessionStorage.getItem("pkt")===null){
    sessionStorage.setItem("pkt", 0);
}
if (sessionStorage.getItem("podp")===null){
    sessionStorage.setItem("podp", 3);
}
pkt.innerHTML = sessionStorage.getItem("pkt");
podp.innerHTML = sessionStorage.getItem("podp");

function savePodp(){
    sessionStorage.setItem("podp",podp.innerHTML);
}

function savePkt(){
    sessionStorage.setItem("pkt", pkt.innerHTML);
}

function plusPodp(a){
    podp.innerHTML = parseInt(podp.innerHTML) + a;
    savePodp();
}

function plusPkt(a){
    pkt.innerHTML = parseInt(pkt.innerHTML) + a;
    savePkt();
}

let podpowiedz;
let odpowiedz;
let czyOdpowiedz = false;
let czyPodpowiedz = false;
let czyKupOdpowiedz = false;

$.getJSON('https://raw.githubusercontent.com/theLahcim/kryptogra/main/pytania.json', function(data) {
    if (sessionStorage.getItem("rand")===null){
        sessionStorage.setItem("rand", Math.floor(Math.random() * data.length));
    }
    let r  = parseInt(sessionStorage.getItem("rand"),10);
    $("#tresc").text(data[r].tresc);
    $("#zagadka").text(data[r].zagadka);
    podpowiedz = data[r].podpowiedz;
    odpowiedz = data[r].odpowiedz;
});

input.addEventListener('input', updateValue);

function updateValue() {
    let a = input.value
    if(!czyOdpowiedz){
        if(a.split(' ').join('').toUpperCase() == odpowiedz){
            if(czyKupOdpowiedz){}
            else if(czyPodpowiedz){
                plusPkt(1);
            }
            else{
                plusPkt(3);
            }
            plusPodp(1);
            czyOdpowiedz = true;
            win.style.display = "block";
            sessionStorage.removeItem("rand");
    }}
}

function kupPodp(){
    if(!czyPodpowiedz){
    if (parseInt(podp.innerHTML)>0){
        $('#miejscePodp').text("Podpowiedz: " + podpowiedz);
        plusPodp(-1);
        czyPodpowiedz = true;
    }
    else{
        $('#miejscePodp').text("Nie masz już podpowiedzi :(");
}}}

function kupOdp(){
    if(!czyKupOdpowiedz){
        if (parseInt(podp.innerHTML)>2){
            $('#miejsceOdp').text("Odpowiedz: " + odpowiedz);
            plusPodp(-3);
            czyKupOdpowiedz = true;
    }
    else{
        $('#miejsceOdp').text("Nie masz wystarczająco podpowiedzi :(");
}}}

function refresh(a){
    if(a != true){
        sessionStorage.removeItem("podp");
        sessionStorage.removeItem("pkt");
    }
    sessionStorage.removeItem("rand");
    window.location.reload(true);
}