import Stage from "../stage";
import Cruiser from "../ennemies/cruiser";
import Corvete from "../ennemies/corvete";
import Minion from "../ennemies/minion";
import Sniper from "../ennemies/sniper";
import Boss2 from "../ennemies/boss2";
import Speeder from "../ennemies/speeder";
import Minigun from "../items/minigun";
import BigCaliber from "../items/bigCaliber";
import SideCannon from "../items/sideCanon";


export default class Stage2 extends Stage {
    

    spawnWave() {
        switch(this.wave) {
            case 1:
                new BigCaliber(300, 70);
                new Minigun(600, 70);
                new SideCannon(900, 70);
                new Minion(300, 60);
                new Speeder(600, 70);
                new Minion(900, 60);
                break;
            case 2:
                new Speeder(300, 60);
                new Sniper(600, 70);
                new Speeder(900,60);
                break;
            case 3:
                new Minion(300, 150);
                new Sniper(300, 70);
                new Speeder(600, 70);
                new Sniper(900, 70);
                new Minion(900, 150);
                break;
            case 4:
                new Sniper(300, 70);
                new Sniper(600, 70);
                new Sniper(900, 70);
                new Speeder(450, 120);
                new Speeder(750, 120);
                break;
            case 5:
                new Cruiser(600, 90);
                break;
            case 6:
                new Sniper(200, 60);
                new Speeder(300, 70);
                new Minion(400, 60);
                new Corvete(600, 80);
                new Minion(800, 60);
                new Speeder(900, 70);
                new Sniper(1000, 60);
                break;
            case 7:
                new Minion(400, 120);
                new Minion(500, 120);
                new Minion(600, 120);
                new Minion(700, 120);
                new Minion(800, 120);
                new Cruiser(600, 90);
                break;
            case 8:
                new Speeder(450, 50);
                new Minion(500, 80);
                new Speeder(600,100);
                new Minion(700, 80);
                new Speeder(750, 50);
                new Sniper(600, 50);
                break;
            case 9:
                new Minion(250,100);
                new Speeder(200,50);
                new Cruiser(600, 90);
                new Speeder(1000,50);
                new Minion(950, 100);
                break;
            case 10:
                new Boss2(600);
                break;
            default:
                console.log("Launching next stage");
                Stage.nextStage();
        }
    }

    toString() {
        return "Stage 2."+this.wave;
    }
}