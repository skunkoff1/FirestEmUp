import Enemy from "../enemy";
import Targeted from "../bulletTypes/targeted";
import Player from "../player";
import { sniperPatterns } from "../assets/patterns";


export default class Sniper extends Enemy {
    constructor(posX, posY) {
        super(posX, posY, 30, 8, 3, 10);
        this.value = 40;
        this.pattern = sniperPatterns;
    }

    shoot() {
        new Targeted(this.posX, this.posY, true, Player.getInstance().posX, Player.getInstance().posY);
    }
}