const arrayNumber1_19 = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
const arrayNumber20_90 = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
const arrayNumber100_900 = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

let close_modal = document.getElementById('btn');
let close_modal2 = document.getElementById('btn2');
let close_modal3 = document.getElementById('btn3');
let close_modal4 = document.getElementById('btn4');
let modal = document.getElementById('modal');
let modal2 = document.getElementById('modal2');
let modal3 = document.getElementById('modal3');
let modal4 = document.getElementById('modal4');
let text4 = document.getElementById('modal_txt4');
let minValue;
let maxValue;

close_modal.onclick = function() { 
        modal.classList.add('modal_vis');
        modal2.classList.add('modal_vis2');
}  

close_modal2.onclick = function(event) {
        event.preventDefault();
        minValue = parseInt(document.getElementById("minValue").value) || 0;
        minValue = (minValue < -999) ? -999 : minValue;
        modal2.classList.remove('modal_vis2'); 
        modal3.classList.add('modal_vis3');
        
}   

close_modal3.onclick = function(event) {
    event.preventDefault();
    maxValue = parseInt(document.getElementById("maxValue").value) || 100;
    maxValue = (maxValue > 999) ? 999 : maxValue;
    if (maxValue < minValue) {
        minValue = 0;
        maxValue = 100;
    }
    text4.textContent = `Загадай любое целое число от ${minValue} до ${maxValue}, а я его угадаю`;
    modal3.classList.remove('modal_vis3'); 
    modal4.classList.add('modal_vis4');
} 

close_modal4.onclick = function() {
        modal4.classList.remove('modal_vis4');
        game();   
}

/*старый код который изначально прорабатывал
const arr = [];
    for (let i = 0; i < 101; i++) {
        arr[i] = i;
    }
    function sIncrease(i, ii) {
        if (i > ii)
            return 1;
        else if (i < ii)
            return -1;
        else
            return 0;
    }
    arr.sort(sIncrease);
    function f1() {
        var num, prNum, tempOut, out;
        num = document.getElementById('mynum').value;
        out = document.getElementById('out');
        while(i<100){
            prNum = Math.floor ((Math.random() * 100)/2);
            /
            alert ( 50?);
            howManyGuesses = howManyGuesses  + 1; //increment the amount of guesses
            //your logic
            alert ("Got it! It was a " + guess + ". It took me " + howManyGuesses  + " guesses.");
        }
        if (num == prNum) {
            out.innerHTML = 'Вы угадали';
        }
        else if (num > 50) {
            out.innerHTML = 'Да, больше 50';
        }
        else (num <50){
            out.innerHTML = 'Нет, меньше 50';
        }
    }*/

function game () {
let answerNumber  = Math.floor((minValue + maxValue) / 2);/*число, которое предлагает программа, его округление до меньшего*/
let orderNumber = 1; /*номер вопроса*/
let textOfNumber;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

function textNumber() {
    let textCount = Math.abs(answerNumber);
    if (textCount < 20) {
        textOfNumber = arrayNumber1_19[textCount];
        }
        else if (textCount < 100) {
            let ostatok1 = textCount%10;
            textCount = parseInt(textCount/10);
            textOfNumber = arrayNumber20_90[textCount] + " " + arrayNumber1_19[ostatok1];
            }
            else if (textCount < 1000) {
                ostatok1 = textCount%100;
                if(ostatok1 < 20) {
                    textCount = parseInt(textCount/100);
                    textOfNumber = arrayNumber100_900[textCount] + " " + arrayNumber1_19[ostatok1];
                }
                else {
                    let ostatok2 = ostatok1%10;
                    ostatok1 = parseInt(ostatok1/10);
                    textCount = parseInt(textCount/100);
                    textOfNumber = arrayNumber100_900[textCount] + " " + arrayNumber20_90[ostatok1] + " " + arrayNumber1_19[ostatok2];
                }    
        }

    if (answerNumber == 0) {textOfNumber = "ноль"}
    if (textOfNumber.length > 20) {
        textOfNumber =  answerNumber.toString();
    }
        else if (answerNumber < 0) {
            textOfNumber = 'минус ' + textOfNumber;
        }
    
    return textOfNumber;
}

textNumber();

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${textOfNumber }?`;


document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            textNumber();
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            let phraseRandom1 = Math.round( Math.random()*2);
            switch (phraseRandom1){
                case 0:
                    answerField.innerText = `Вы загадали число ${textOfNumber }?`; 
                    break;
                case 1:
                    answerField.innerText = `А может это число ${textOfNumber }?`;
                    break;
                case 2:
                    answerField.innerText = `Это легко! Ваше число ${textOfNumber }?`;
                    break;
            }
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            textNumber();
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            let phraseRandom2 = Math.round( Math.random()*2);
            switch (phraseRandom2){
                case 0:
                    answerField.innerText = `Сейчас угадаю! Это ${textOfNumber }?`; 
                    break;
                case 1:
                    answerField.innerText = `Вероятно, это ${textOfNumber }?`;
                    break;
                case 2:
                    answerField.innerText = `Ваше число ${textOfNumber }?`;
                    break;
            }
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        let phraseRandom3 = Math.round( Math.random()*3);
        switch (phraseRandom3){
            case 0:
                answerField.innerText = `Я всегда угадываю!\n\u{1F600}` ; 
                break;
            case 1:
                answerField.innerText = `Опять угадал!\n\u{1F601}`;
                break;
            case 2:
                answerField.innerText = `Угадал, как всегда!\n\u{1F609}`;
                break;
            case 3:
                answerField.innerText = `Я угадал!\n\u{1F680}`;
                break;
        }
        document.body.classList.add('еqual');
        gameRun = false;
    }
})
}