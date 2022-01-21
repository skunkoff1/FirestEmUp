import Entity from "../entity";

let trollImg = document.getElementById("trollImg");
export default class Item extends Entity {

    static itemsTab = [];
    static count = 0;

    constructor(posX, posY) {
        super(posX, posY, 15, 2);
        this.direction = "down";
        Item.count ++;
        this.id = Item.count;
        this.onHit = 0;
        this.image = trollImg;
        Item.itemsTab.push(this);
    }

    trigger() {
        // what the item does when player touches it
    }

    wallHit() {
        this.delete();
    }

    delete() {
        for (let i = 0; i < Item.itemsTab.length; i++) {
            if(this.id == Item.itemsTab[i].id) {
                Item.itemsTab.splice(i, 1);
                delete this;
            }
        }
    }
}
