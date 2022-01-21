import Stage from "../stage";

export function displayPlayerHp(hp) {    
    let power = document.getElementById('power');
    power.innerHTML = "";

    for(let i=0; i<hp; i++) {
        let displayHp = document.createElement('div');
        displayHp.className = "displayHp";
        power.appendChild(displayHp);  
    }
}