class Ship {
    constructor(radius, x, y) {
        this.radius = radius;
        this.x = x;
        this.y = y;
    }

    detectHit(obj) {
        let dx = this.x - obj.x;
        let dy = this.y - obj.y;
        let dist = Math.sqrt(dx*dx + dy*dy);

        if(dist < this.radius + obj.radius) {
            return true;
        } else {
            return false;
        }
    }
}

let bob = new Ship(10, 0, 0);

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