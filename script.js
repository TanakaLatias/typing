const typeDisplay = document.getElementById("typeDisplay")
const typeInput = document.getElementById("typeInput")
const countDisplay = document.getElementById("countDisplay")
const imgDisplay = document.getElementById("imgDisplay")
const imgElement = imgDisplay.querySelector("img");

const typeSound = new Audio('./audio/typing-sound.mp3')
const wrongSound = new Audio('./audio/wrong.mp3')
const correctSound = new Audio('./audio/correct.mp3')

const numbers = Array.from({ length: 26 }, (_, index) => index).sort(() => Math.random() - 0.5);

const randomWords = ['Aussie Meat Pies', 'Blueberry Muffins', 'Chicken Nuggets', 'Doughnuts with Sprinkles',
    'Egg Sandwiches', 'Fruity Yogurt Parfait', 'Grilled Cheese Sandwiches', 'Hot Chocolates', 'Italian Meatballs', 
    'Jellybeans', 'Kabobs', 'Lollipop', 'Mashed Potatoes', 'Nougat Candy','Omelette', 'Popsicles', 'Quiche', 
    'Red Velvet Cupcakes', 'Spaghetti Bolognese', 'Trifle', 'Udon Noodles', 'Vanilla Ice Cream', 'Wonton Soup', 
    'Xylitol Gummies', 'Yeast Rolls', 'Zebra Cake']
const randomImages = ['./img/a.jpg', './img/b.jpg', './img/c.jpg', './img/d.jpg', './img/e.jpg', './img/f.jpg', 
    './img/g.jpg', './img/h.jpg', './img/i.jpg', './img/j.jpg', './img/k.jpg', './img/l.png', './img/m.jpeg', 
    './img/n.jpg', './img/o.jpg', './img/p.jpg', './img/q.jpg', './img/r.jpg', './img/s.jpg', './img/t.jpg', 
    './img/u.jpg', './img/v.jpg', './img/w.jpg', './img/x.jpg', './img/y.jpg', './img/z.jpg']
const congrats = 'con.jpg'
typeInput.addEventListener("input", () => {

    const displayArray = typeDisplay.querySelectorAll("span");
    const inputArray = typeInput.value.split("");

    let spanTextArray = [];
    displayArray.forEach((span) => {
        const text = span.innerText;
        spanTextArray.push(text);
        span.classList.add("neutral");
        span.classList.remove("correct");
        span.classList.remove("incorrect");
    });

    inputArray.forEach((char, index) => {
        if (char == spanTextArray[index]) {
            displayArray[index].classList.add("correct");
            displayArray[index].classList.remove("incorrect");
            typeSound.play();
            typeSound.currentTime = 0;
        } else {
            displayArray[index].classList.add("incorrect");
            displayArray[index].classList.remove("correct");
            wrongSound.volume = 0.1;
            wrongSound.play();
            wrongSound.currentTime = 0;
        }
    });

    if (spanTextArray.length == inputArray.length) {
        let correct = true;
        inputArray.forEach((char, index) => {
            if (char != spanTextArray[index]) {
                correct = false;
            }
        });
        if (correct==true) {
            typeInput.disabled = true;
            correctSound.play();
            correctSound.currentTime = 0;
            setTimeout(() => {
                typeInput.value = "";
                typeInput.disabled = false;
                if (num < 25) {
                    num = num+1
                    RenderRandomWord(num);
                } else {
                    typeInput.disabled = true;
                    typeInput.value = "Your time is: "+count;
                    typeDisplay.innerText = "congratulations!";
                    imgElement.src = congrats;
                }
            }, 1000);
        }
    }

});

function RenderRandomWord(n) {

    const index = numbers[n];
    const word = randomWords[index];
    const image = randomImages[index];

    imgElement.src = image;

    typeDisplay.innerText = "";
    typeInput.focus();
    countDisplay.innerText = (n + 1) + "/26";
    let fragmented = word.split("");
    fragmented.forEach((f)=>{
        const tagSpan = document.createElement("span");
        tagSpan.innerText = f;
        typeDisplay.appendChild(tagSpan);
    });

};

let num = 24;
RenderRandomWord(num);

let count = 0;
function countUp() {
    count++;
}
const intervalId = setInterval(countUp, 1000);
setTimeout(() => {
    clearInterval(intervalId);
}, 1000000);
