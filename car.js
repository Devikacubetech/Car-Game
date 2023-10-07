
alert('Devika welcomes you to this fun game');
const carSource = ['./images/greenCar.png', './images/red.png', './images/yellowCar.png', './images/blueCar.png', './images/grayCar.png'];
const Car_positionArray = [21, 31, 41, 51, 62, 73];

carAccidentMusic = new Audio('./multimedia/crash-7075.mp3');

var Mycar = document.querySelector('.MyCar');
let Myaudio = new Audio('./multimedia/rock-it-21275.mp3');
let sideCarEffect = new Audio('./multimedia/sideCarMusic.mp3')
var count = 0;
var score = 0;

document.querySelector('#start').addEventListener('click', function () {
    if (document.querySelector('#userName').value == '') {
        alert('Enter your name first to start the game')
    }

    else {
        startGame();
    }
});


document.querySelector('#restart').addEventListener('click', function () {
    location.reload();
    startGame();
})
function startGame() {
    localStorage.setItem('music', 'false');
    localStorage.setItem('score', 'false');

    document.querySelector('#Name').innerHTML = userName.value;

    Myaudio.play();
    Myaudio.loop = 'true';
    document.querySelector('.road').style.animationPlayState = 'running';
    document.querySelector('.startDiv').style.display = 'none';
    Mycar.style.transform = 'translateY(0px)';
    document.querySelector('.score').style.display = 'block';

    carLeft = 3;

    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 37:
                carLeft--
                if (carLeft >= 0) {
                    Mycar.style.transition = '0s';
                    console.log(Mycar.style.left = `${Car_positionArray[carLeft]}%`)
                }
                else {
                    carLeft = 0;
                    sideCarEffect.play();
                }
                break;

            case 39:
                carLeft++;
                if (carLeft < 6) {
                    Mycar.style.transition = '0s';
                    Mycar.style.left = `${Car_positionArray[carLeft]}%`;
                }
                else {
                    carLeft = 5;
                    sideCarEffect.play();
                }
        }
    };

    stopScore = setInterval(function () {
        if (localStorage.getItem('score') != 'true') {
            document.querySelector('.score_p').innerHTML = score++;
            document.querySelector('.lastName').innerHTML = userName.value;
            document.querySelector('.lastScore').innerHTML = score;
        }
    }, 300)


    setInterval(() => {
        carSourceIndex = String(Math.random()).substring(2, 3);

        if (carSourceIndex < 6) {
            var AddDiv = document.createElement('div');
            AddDiv.classList.add('car', 'animationClass');
            const img = document.createElement('img');
            if (carSourceIndex > 4) {
                if (count == 0) {
                    img.src = './images/red.png';
                }
                else if (count == 1) {
                    img.src = './images/blueCar.png'
                }
            }
            else {
                img.src = carSource[carSourceIndex];
            }

            AddDiv.append(img)
            AddDiv.style.left = Car_positionArray[carSourceIndex] + "%";
            document.querySelector('.road').append(AddDiv);

            setInterval(function () {

                if ((Math.abs(Mycar.getBoundingClientRect().x - AddDiv.getBoundingClientRect().x)) < 42) {
                    if (Math.abs(Mycar.getBoundingClientRect().top - AddDiv.getBoundingClientRect().top) < 88) {
                        AddDiv.style.animationPlayState = 'paused';
                        document.querySelector('.road').style.animationPlayState = 'paused';
                        document.querySelector('.stop').style.display = 'block';
                        Myaudio.pause();
                        localStorage.setItem('score', true)
                        document.querySelector('.score_p').innerHTML = score;
                        if (localStorage.getItem('music') != 'true') {
                            carAccidentMusic.play();
                            localStorage.setItem('music', 'true');
                        }
                    }
                }
            })
        }

    }, 1500)
}
