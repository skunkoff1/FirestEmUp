import Enemy from "../enemy";
import Targeted from "../bulletTypes/targeted";
import Player from "../player";


export default class Cruiser extends Enemy {
    constructor(posX, posY) {
        super(posX, posY, 80, 3, 150, 10);
        this.value = 700;
    }

    shoot() {
        if (Player.getInstance().posX>this.posX) {
            new Targeted(this.posX, this.posY+40, true, Player.getInstance().posX-40, Player.getInstance().posY+40);
            new Targeted(this.posX, this.posY+40, true, Player.getInstance().posX, Player.getInstance().posY);
            new Targeted(this.posX, this.posY+40, true, Player.getInstance().posX+40, Player.getInstance().posY-40);
        } else {
            new Targeted(this.posX, this.posY+40, true, Player.getInstance().posX-40, Player.getInstance().posY-40);
            new Targeted(this.posX, this.posY+40, true, Player.getInstance().posX, Player.getInstance().posY);
            new Targeted(this.posX, this.posY+40, true, Player.getInstance().posX+40, Player.getInstance().posY+40);
        }
        
        setTimeout(() => {
            if (Player.getInstance().posX>this.posX) {
                new Targeted(this.posX, this.posY+40, true, Player.getInstance().posX-40, Player.getInstance().posY+40);
                new Targeted(this.posX, this.posY+40, true, Player.getInstance().posX, Player.getInstance().posY);
                new Targeted(this.posX, this.posY+40, true, Player.getInstance().posX+40, Player.getInstance().posY-40);
            } else {
                new Targeted(this.posX, this.posY+40, true, Player.getInstance().posX-40, Player.getInstance().posY-40);
                new Targeted(this.posX, this.posY+40, true, Player.getInstance().posX, Player.getInstance().posY);
                new Targeted(this.posX, this.posY+40, true, Player.getInstance().posX+40, Player.getInstance().posY+40);
            }
        }, 300);
    }
}