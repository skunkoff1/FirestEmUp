import Entity from "./entity";

function isCollision(obj1, obj2) {
    let dx = obj1.x - obj2.x;
    let dy = obj1.y - obj2.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < obj1.radius + obj2.radius) {
        return true;
    } else {
        return false;
    }
}


let bob = new Entity(10, 0, 0);
let Maurice = new Entity(10, 5, 5);
let Math = new Entity(10, 50, 50);

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