let stageIndic = document.getElementById("stageIndic");
export default class Stage {

    static stageTab = [];

    constructor() {
        this.wave = 0;
        Stage.stageTab.push(this);
        this.isSpawnable = true;
    }

    getNextWave() {
        if (this.isSpawnable) {
            this.wave += 1;
            this.isSpawnable = false;
            setTimeout(() => {
                this.spawnWave();
                this.isSpawnable = true;
            },1000);
        }
        stageIndic.innerHTML = Stage.stageTab[0].toString();
    }

    spawnWave() {
        // switch use to launch the stage's different waves
        
    }

    static nextStage() {
        if(Stage.stageTab[1] != null) {
            Stage.stageTab.splice(0,1);
            Stage.stageTab[0].getNextWave();
        }
    }

}