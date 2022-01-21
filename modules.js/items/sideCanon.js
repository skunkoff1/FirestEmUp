import Player from "../player";
import Item from "./item"


export default class SideCannon extends Item {
    constructor(posX, posY) {
        super(posX,posY);
    }

    trigger() {
        Player.getInstance().weapon = "sideCannon";
        Player.getInstance().attackSpeed /=2;
    }
}