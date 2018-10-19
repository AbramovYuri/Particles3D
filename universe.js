let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth, canvasHeight;
let mX = 0;
let mY = 0;
let pointCoord = [];
let starsCount = 300;
let deepStars = 3000;
let starsSpeed = 10;
let k = 3000;
let pointDistance = 120;
let pointDistance3D = 400;


addEventListener('resize', resize);
addEventListener('orientationchange', resize);


resize();
pointGenerator();
pointSet();

/*
document.querySelector('.universe').onmousemove = function (event) {
        mX = (canvasWidth / 2 - event.clientX)/2;
        mY = (canvasHeight / 2 - event.clientY)/2;
};
*/
mainLoop();

function mainLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    pointSet();
    lineDraw();
    pointMove();
    requestAnimationFrame(mainLoop);
}


function pointGenerator() {
    let x, y, z, s;
    for (let i = 0; i < starsCount; i++) {
        x = Math.random() * canvasWidth - canvasWidth / 2;
        y = Math.random() * canvasHeight - canvasHeight / 2;
        z = Math.random() * (deepStars + k);
        s = Math.random() * starsSpeed + 1;
        pointCoord[i] = [x, y, z, s];
    }
}

function pointSet() {


    let circle = 2 * Math.PI;
    ctx.fillStyle = '#d0d0d0';
    for (let i = 0; i < starsCount; i++) {
        let p = pointCoord[i][2];
        let x = (k * pointCoord[i][0]) / (p + k) + canvasWidth / 2 + mX;
        let y = (k * pointCoord[i][1]) / (p + k) + canvasHeight / 2 + mY;
        let r = (deepStars - p) / deepStars * 1.5;
        if (r > .4) {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, circle);
            ctx.fill();
        }

    }

}

function pointMove() {
    for (let i = 0; i < starsCount; i++) {

        if (pointCoord[i][2] > -k) {
            pointCoord[i][2] -= pointCoord[i][3];
        }
        else {
            pointCoord[i][2] = deepStars;
        }

    }
}

function resize() {
    let universeDiv = document.getElementsByClassName("universe");
    canvasWidth = universeDiv[0].offsetWidth;
    canvasHeight = universeDiv[0].offsetHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    pointGenerator();
}

function lineDraw() {
    let vector, xCord, yCord, zCord;

    for (let i = 0; i < starsCount - 1; i++) {

        let x = pointCoord[i][0];
        let y = pointCoord[i][1];
        let z = pointCoord[i][2];

        for (let q = 1; q < starsCount/5; q++) {

            xCord = Math.abs(x - pointCoord[q][0]);
            yCord = Math.abs(y - pointCoord[q][1]);
            zCord = Math.abs(z - pointCoord[q][2]);

            vector = Math.sqrt((xCord * xCord) + (yCord * yCord) + (zCord * zCord));

            if (vector > 5 && vector < pointDistance3D) {
                let p = pointCoord[i][2];
                let x = (k * pointCoord[i][0]) / (p + k) + canvasWidth / 2 + mX;
                let y = (k * pointCoord[i][1]) / (p + k) + canvasHeight / 2 + mY;

                let p2 = pointCoord[q][2];
                let x2 = (k * pointCoord[q][0]) / (p2 + k) + canvasWidth / 2 + mX;
                let y2 = (k * pointCoord[q][1]) / (p2 + k) + canvasHeight / 2 + mY;

                xCord = Math.abs(x - x2);
                yCord = Math.abs(y - y2);

                vector = Math.sqrt((xCord * xCord) + (yCord * yCord));

                if (vector > 5 && vector < pointDistance) {

                    ctx.beginPath();
                    ctx.strokeStyle = 'rgba(255,255,255,' + ((1 - vector / pointDistance) / 6) + ')';
                    ctx.moveTo(x, y);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }


        }
    }

}
