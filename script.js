const typeDisplay = document.getElementById("typeDisplay")
const typeInput = document.getElementById("typeInput")

const typeSound = new Audio('./audio/typing-sound.mp3')
const wrongSound = new Audio('./audio/wrong.mp3')
const correctSound = new Audio('./audio/correct.mp3')

typeInput.addEventListener("input", () => {
    const displayArray = typeDisplay.querySelectorAll("span");
    const inputArray = typeInput.value.split("");

    let spanTextArray = [];
    displayArray.forEach((span) => {
        const text = span.innerText;
        spanTextArray.push(text);
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
            correctSound.play();
            correctSound.currentTime = 0;
            setTimeout(() => {
                RenderRandomWord();
                typeInput.value = "";
            }, 1000);
        }
    }

});

function RenderRandomWord() {
    // const foodWords = ['apple', 'banana', 'cupcake', 'doughnut', 'eggplant', 'fries', 'grape', 'hamburger', 
    // 'ice cream', 'juice', 'kiwi', 'lasagna', 'mango', 'noodles', 'orange', 'pizza', 'quiche', 'raspberry', 
    // 'strawberry', 'taco', 'udon', 'vegetable', 'watermelon', 'xmas pudding', 'yogurt', 'zucchini'];

    const randomWords = ['Aussie Meat Pies', 'Blueberry Muffins', 'Chicken Nuggets', 'Doughnuts with Sprinkles',
    'Egg Sandwiches', 'Fruity Yogurt Parfait', 'Grilled Cheese Sandwiches', 'Hot Chocolates',
    'Italian Meatballs', 'Jellybeans', 'Kabobs', 'Lollipop', 'Mashed Potatoes', 'Nougat Candy','Omelette', 
    'Popsicles', 'Quiche', 'Red Velvet Cupcakes', 'Spaghetti Bolognese', 'Trifle', 'Udon Noodles', 
    'Vanilla Ice Cream', 'Wonton Soup', 'Xylitol Gummies', 'Yeast Rolls', 'Zebra Cake']
    const randomImages = ['./img/a.jpg', './img/b.jpg', './img/c.jpg', './img/d.jpg', './img/e.jpg', './img/f.jpg', 
    './img/g.jpg', './img/h.jpg', './img/i.jpg', './img/j.jpg', './img/k.jpg', './img/l.png', './img/m.jpeg', 
    './img/n.jpg', './img/o.jpg', './img/p.jpg', './img/q.jpg', './img/r.jpg', './img/s.jpg', './img/t.jpg', 
    './img/u.jpg', './img/v.jpg', './img/w.jpg', './img/x.jpg', './img/y.jpg', './img/z.jpg', ]
    const randomIndex = Math.floor(Math.random() * randomWords.length);
    const randomWord = randomWords[randomIndex];
    const randomImage = randomImages[randomIndex];

    const imgElement = imgDisplay.querySelector("img");
    imgElement.src = randomImage;

    typeDisplay.innerText = "";
    let fragmented = randomWord.split("");
    fragmented.forEach((f)=>{
        const tagSpan = document.createElement("span");
        tagSpan.innerText = f;
        typeDisplay.appendChild(tagSpan);
    });

};

RenderRandomWord();
