import { k } from "../kaplaCTX";

export default function gameOver(citySfx) {
    citySfx.paused = true;
    let bestScore = k.getData("best-score");
    let currentScore = k.getData("current-score");
    const rankGrade = ["F", "E", "D", "C", "B", "A", "S"];
    const rankValue = ["50", "80", "100", "200", "300", "400", "500"];
    let currentRank = "F";
    let bestRank = "F";
    for(let i=0; i < rankValue.length; i++){
        if(rankValue[i]< currentScore){
            currentRank = rankGrade[i];
        }
        if(rankValue[i]< bestScore){
            bestRank = rankGrade[i];
        }
        if(bestScore < currentScore){
            bestScore = currentScore;
            bestRank = currentRank;
        }
    }
    k.add([
        k.text("GAME OVER", { font: "mania", size: 96 }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y-300),
    ]);
    k.add([
        k.text(`Best Score: ${bestScore}`, { font: "mania", size: 64 }),
        k.anchor("center"),
        k.pos(k.center().x-400, k.center().y-200),
    ]);
    k.add([
        k.text(`Current Score: ${currentScore}`, { font: "mania", size: 64 }),
        k.anchor("center"),
        k.pos(k.center().x+400, k.center().y-200),
    ]);
    const bestRankBox = k.add([
        k.rect(400, 400, {radius: 4 }),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x - 400, k.center().y +50),
    ]);
    bestRankBox.add([
        k.text(bestRank, { font: "mania", size: 100 }),
        k.anchor("center")
    ]);
    const currentRankBox = k.add([
        k.rect(400, 400, {radius: 4 }),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x - 400, k.center().y +50),
    ]);
    currentRankBox.add([
        k.text(currentRank, { font: "mania", size: 100 }),
        k.anchor("center")
    ]);
    k.wait(1, ()=>{
        k.add([
            k.text("Press Space/ W/ Up-Arrow/ Click/ Touch to play Again",{
                font: "mania",
                size: 64
            }),
            k.anchor("center"),
            k.pos(k.center().x, k.center().y+ 350),
        ]);
        k.onButtonPress("jump", () => k.go("game"));
    });
}