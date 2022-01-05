class Ship {
    constructor(length, x, y) {

        // points du côté haut
        for (let i = 0; i<length; i++) {
            this.hitBox[i] = [i,0];
        }

        // points du côté gauche
        for (let i = 0; i<length; i++) {
            this.hitBox[i+length] = [0,i];
        }

        // points du côté bas
        for (let i = 0; i<length; i++) {
            this.hitBox[i+(length*2)] = [i,length];
        }

        // points du côté droit
        for (let i = 0; i<length; i++) {
            hitBox[i+(length*3)] = [length,i];
        }
    }
}


let ship = document.getElementById('ship');
let x = 50;
let y = 50;

window.addEventListener("keypress", (event) => {
    if (event.key === "z") {
        y -= 1;
        ship.style.top = y + "%";
        console.log("z pressed");
        return y;
    }
    if (event.key === "q") {
        x -= 1;
        ship.style.left = x + "%";
        console.log("q pressed");
        return x;
    }
    if (event.key === "s") {
        y += 1;
        ship.style.top = y + "%";
        console.log("s pressed");
        return y;
    }
    if (event.key === "d") {
        x += 1;
        ship.style.left = x + "%";
        console.log("d pressed");
        return x;
    }
})