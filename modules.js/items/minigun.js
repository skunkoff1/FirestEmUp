import Player from "../player";
import Item from "./item"


export default class Minigun extends Item {
    constructor(posX, posY) {
        super(posX,posY);
    }

    trigger() {
        Player.getInstance().attackSpeed += 1,5;
    }
}