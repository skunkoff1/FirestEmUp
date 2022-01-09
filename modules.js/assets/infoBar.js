export function displayPlayerHp(hp) {    
    let power = document.getElementById('power');

    for(let i=0; i<hp; i++) {
        let displayHp = document.createElement('div');
        displayHp.className = "displayHp";
        power.appendChild(displayHp);  
    }
}