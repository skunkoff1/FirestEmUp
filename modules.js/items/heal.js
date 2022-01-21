import Player from "../player";
import Item from "./item";

let healImg = document.getElementById("healImg");

export default class Heal extends Item {

    constructor(posX, posY) {
        super(posX, posY);
        this.image = healImg;
    }

    trigger() {
        Player.getInstance().damage(-1);
    }
}