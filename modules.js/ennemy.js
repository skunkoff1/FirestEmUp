import Entity from './entity';

class Ennemy extends Entity {
    constructor(posX, posY) {
        super(posX, posY, 25, 10);
    }
}

export default Ennemy;