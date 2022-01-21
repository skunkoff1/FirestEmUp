import Enemy from '../enemy'

export default class Minion extends Enemy {
    constructor(posX, posY) {
        super(posX, posY,25,6,4,3);
    }

}