
import Boss1 from "./ennemies/boss1";
import Minion from "./ennemies/minion";
import Sniper from "./ennemies/sniper";


export default class Stage {

    static stageTab = [];

    constructor() {
        this.wave = 0;
        Stage.stageTab.push(this);
    }

    getNextWave() {
        this.wave += 1;
        this.spawnWave();
    }

    spawnWave() {
        switch(this.wave) {
            case 1:
                new Minion(300, 60);
                new Minion(600, 60);
                new Minion(900, 60);
                break;
            case 2:
                new Minion(300, 60);
                new Sniper(600, 70);
                new Minion(900,60);
                break;
            case 3:
                new Minion(300, 150);
                new Sniper(300, 70);
                new Sniper(900, 70);
                new Minion(900, 150);
                break;
            case 4:
                new Sniper(300, 70);
                new Sniper(600, 70);
                new Sniper(900, 70);
                new Minion(450, 120);
                new Minion(750, 120);
                break;
            case 5:
                new Boss1(600, 310);
                break;
            default:
                console.log("error : default reached in stage.js");
        }
    }
}