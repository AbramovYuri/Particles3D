window.onload = function () {

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let universeDiv = document.querySelector('.universe');
    let canvasWidth = universeDiv.offsetWidth;
    let canvasHeight = universeDiv.offsetHeight;
    let mX, mY = 0;
    let xTarget = 0;
    let yTarget = 0;
    let pointCoord = [];
    let starsCount = 300;
    let deepStars = 3000;
    let starsSpeed = 10;
    let k = 3000;
    let pointDistance = 150;
    let pointDistance3D = 1000;
    let circle = 2 * Math.PI;
    let flashBrightness = 200;
    let sinInt = 0;

    // universeDiv.onmousemove = function (event) {
    //     mX = (canvasWidth / 2 - event.clientX) / 2;
    //     mY = (canvasHeight / 2 - event.clientY) / 2;
    // };

    universeDiv.onmousedown = function (event) {
        pointDistance3D = 2000;
        pointDistance = 250;
    };

    universeDiv.onmouseup = function (event) {
        let counter = setInterval(function () {
            pointDistance3D > 1000 ? pointDistance3D-- : null;
            pointDistance > 150 ? pointDistance-- : null;
            if (pointDistance3D === 1000) clearInterval(counter);
        }, 30);
    };

    addEventListener('resize', resize);
    addEventListener('orientationchange', resize);


    resize();
    pointGenerator();
    pointSet();

    mainLoop();

    function mainLoop() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        if (xTarget < mX) {
            xTarget++
        } else if (xTarget > mX) {
            xTarget--
        }

        if (yTarget < mY) {
            yTarget++
        } else if (yTarget > mY) {
            yTarget--
        }

        sinInt <= 360 ? sinInt += .005 : sinInt = 0;


        pointSet();
        lineDraw();
        pointMove();
        requestAnimationFrame(mainLoop);
    }

    function pointGenerator() {
        let x, y, z, s, c, xSpeed, ySpeed;
        for (let i = 0; i < starsCount; i++) {
            x = Math.random() * canvasWidth - canvasWidth / 2;
            xSpeed = Math.random();
            Math.random() > .5 ? xSpeed *= -1 : null;
            y = Math.random() * canvasHeight - canvasHeight / 2;
            ySpeed = Math.random();
            Math.random() > .5 ? ySpeed *= -1 : null;
            z = Math.random() * (deepStars + k);
            s = Math.random() * starsSpeed + 1;
            c = Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255);
            pointCoord[i] = [x, y, z, s, c, 0, xSpeed, ySpeed];
        }
    }

    function pointSet() {

        for (let i = 0; i < starsCount; i++) {
            ctx.fillStyle = 'rgb(' + pointCoord[i][4] + ')';
            let p = pointCoord[i][2];
            let x = (k * pointCoord[i][0]) / (p + k) + canvasWidth / 2 + xTarget;
            let y = (k * pointCoord[i][1]) / (p + k) + canvasHeight / 2 + yTarget;
            let r = (deepStars - p) / deepStars * 1.5;
            if (r > .2) {
                ctx.beginPath();
                ctx.arc(x, y, r, 0, circle);
                ctx.fill();
            }

            if ((Math.random() > .9997) && pointCoord[i][5] === 0) {
                pointCoord[i][5] = flashBrightness;
            }

        }
    }

    function pointMove() {
        let zOffset = Math.sin(sinInt) * 10;

        for (let i = 0; i < starsCount; i++) {

            if (pointCoord[i][2] > -k) {
                pointCoord[i][2] -= pointCoord[i][3] + zOffset;
            } else {
                pointCoord[i][2] = deepStars;
            }

            pointCoord[i][0] = pointCoord[i][0] + pointCoord[i][6];
            if (pointCoord[i][0] > canvasWidth) {
                pointCoord[i][0] = canvasWidth / 2 * -1
            }
            if (pointCoord[i][0] < (canvasWidth * -1)) {
                pointCoord[i][0] = canvasWidth / 2;
            }
            pointCoord[i][1] = pointCoord[i][1] + pointCoord[i][7];
            if (pointCoord[i][1] > canvasHeight) {
                pointCoord[i][1] = canvasHeight / 2 * -1
            }
            if (pointCoord[i][1] < (canvasHeight * -1)) {
                pointCoord[i][1] = canvasHeight / 2;
            }
        }
    }

    function resize() {
        canvasWidth = universeDiv.offsetWidth;
        canvasHeight = universeDiv.offsetHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        starsCount = canvasWidth * canvasHeight / 6000;
        console.log(starsCount);
        pointGenerator();
    }

    function lineDraw() {
        let vector, xCord, yCord, zCord;

        for (let i = 0; i < starsCount - 1; i++) {

            let x = pointCoord[i][0];
            let y = pointCoord[i][1];
            let z = pointCoord[i][2];

            pointCoord[i][5] > 0 ? pointCoord[i][5]-- : null;

            for (let q = 1; q < starsCount / 6; q++) {

                xCord = Math.abs(x - pointCoord[q][0]);
                yCord = Math.abs(y - pointCoord[q][1]);
                zCord = Math.abs(z - pointCoord[q][2]);

                vector = Math.sqrt((xCord * xCord) + (yCord * yCord) + (zCord * zCord));

                if (vector > 5 && vector < pointDistance3D) {
                    let p = pointCoord[i][2];
                    let x = (k * pointCoord[i][0]) / (p + k) + canvasWidth / 2 + xTarget;
                    let y = (k * pointCoord[i][1]) / (p + k) + canvasHeight / 2 + yTarget;

                    let p2 = pointCoord[q][2];
                    let x2 = (k * pointCoord[q][0]) / (p2 + k) + canvasWidth / 2 + xTarget;
                    let y2 = (k * pointCoord[q][1]) / (p2 + k) + canvasHeight / 2 + yTarget;

                    xCord = Math.abs(x - x2);
                    yCord = Math.abs(y - y2);

                    vector = Math.sqrt((xCord * xCord) + (yCord * yCord));

                    if (vector > 5 && vector < pointDistance) {

                        ctx.beginPath();
                        // ctx.strokeStyle = 'rgba(255, 0, 0,' + ((1 - vector / pointDistance) / 4 + (pointCoord[i][5] / 255)) + ')';
                        ctx.strokeStyle = 'rgba(' + pointCoord[i][4] + ',' + ((1 - vector / pointDistance) / 2 + (pointCoord[i][5] / 255)) + ')';
                        ctx.moveTo(x, y);
                        ctx.lineTo(x2, y2);
                        ctx.stroke();
                        // console.log(((1 - vector / pointDistance) / 4 + (pointCoord[i][5] / 255)));
                    }
                }


            }
        }

    }
};
