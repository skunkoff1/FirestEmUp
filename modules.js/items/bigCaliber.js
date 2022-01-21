import Player from "../player";
import Item from "./item"


export default class BigCaliber extends Item {
    constructor(posX, posY) {
        super(posX,posY);
    }

    trigger() {
        Player.getInstance().attackSpeed /= 8;
        Player.getInstance().weapon = "bigCaliber";
    }
}