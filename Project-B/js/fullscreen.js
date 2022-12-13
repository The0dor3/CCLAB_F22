let words = {
    you: "你",
    now: "现在",
    why: "为什么",
    because: "因为",
    classmate: "同学",
    friend: "朋友",
    only: "只",
    library: "图书馆",
    together: "一起",
    but: "但是",
    with: "跟",
    homework: "功课",
    everybody: "大家",
    cool: "酷",
    recently: "最近",
    later: "后来",
    shoes: "鞋子",
    busy: "忙",
    good: "好",
    please: "请",
    ask: "问",
    expensive: "贵",
    cheap: "便宜",
    last_name: "姓",
    i: "我",
    what: "什么",
    name: "名字",
    that: "那",
    picture: "照片",
    this: "这",
    father: "爸爸",
    mother: "妈妈",
    child: "孩子",
    who: "谁",
    her: "她",
    older_sister: "姐姐",
    younger_brother: "弟弟",
    him: "他",
    son: "儿子",
    daughter: "女儿",
    month: "月",
    week: "星期",
    semester: "学期",
    birthday: "生日",
    year: "年",
    thanks: "谢谢",
    goodbye: "再见",
    hello: "你好",
    weekend: "周末",
    television: "电视",
    music: "音乐",
    book: "书",
    correct: "对",
    often: "常常",
    yesterday: "昨天",
    movie: "电影",
    pretty: "漂亮",
    school: "学校",
    tea: "茶",
    coffee: "咖啡",
    sorry: "对不起",
    water: "水",
    time: "时间",
    if: "要是",
    pen: "笔",
    paper: "纸",
    easy: "容易",
    hard: "难",
    tired: "累",
    breakfast: "早饭",
    classroom: "教室",
    new: "新",
    computer: "电脑",
    lunch: "午饭",
    dorm: "宿舍",
    before: "以前",
    after: "以后",
    already: "已经",
    store: "商店",
    thing: "东西",
    clothes: "衣服",
    shirt: "衬衫",
    color: "颜色",
    pants: "裤子",
    money: "钱",
    airplane: "飞机",
    or: "或者",
    bus: "公共汽车",
    subway: "地铁",
    teacher: "老师",
    student: "学生",
    china: "中国",
    beijing: "北京",
    america: "美国",
    new_york: "纽约",
    home: "家",
    older_brother: "哥哥",
    younger_sister: "妹妹",
    and: "和",
    english: "英文",
    chinese: "中文",
    doctor: "医生",
    dinner: "晚饭",
    today: "今天",
    tomorrow: "明天",
};



let word = "";
let typedText = "";
let letters = [];
let totalNum = 0;
let points = 0;
var rand;
var pic;
var pic1, pic2, pic3;


function preload() {

    rand = [
        "./assets/Translation IMG1.jpeg",
        "./assets/Translation IMG2.jpeg",
        "./assets/Translation IMG3.jpeg",
    ];

    var pick = floor(random(rand.length));

    pic = loadImage(rand[pick]);

}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("fulljs")
    background(255);
    generateWord();
}

function draw() {
    background(255);
    image(pic, 0, 0);
    pic.resize(width, height);
    strokeWeight(3);
    stroke(255);
    rectMode(CENTER);
    rect(width / 2, height / 2, 220, 40);
    textSize(27);
    fill(255);
    stroke(0);
    strokeWeight(3);
    text("Your word:", (width / 2) - 95, (height / 2) - 50);
    text(word, (width / 2) + 40, (height / 2) - 50);
    typedText = typedText.replace(' ', '_');
    text(typedText, (width / 2) - 100, (height / 2) + 10);
    noFill();
    for (let i = 0; i < letters.length; i++) {
        let l = letters[i];
        l.move();
        l.display();
    }

    if (letters.length > 1199) {
        let index = 0;
        let numberOfElement = 20;
        letters.splice(index, numberOfElement);
    } else {
    }
    score();
}

function score() {


    push()
    stroke(0);
    strokeWeight(4)
    rect(width - 50, 0, 100, 175);
    stroke(255);
    strokeWeight(2);
    fill(0);
    text("Score:", width - 90, 35)
    text(points, width - 90, 70);
    pop()

}

function checkAnswer() {
    let keyArray = Object.keys(words);
    let valArray = Object.values(words);

    for (let i = 0; i < valArray.length; i++) {
        let value = valArray[i];
        if (word == value) {
            //console.log(value);
            //console.log(keyArray[i]);
            if (typedText == keyArray[i]) {
                // console.log("YES!");
                for (let j = 0; j < 300; j++) {
                    let x = random(width, width * 2);
                    let y = random(-300, 0);
                    let xSpd = random(-8, -3);
                    let ySpd = random(3, 8);
                    let r = 0;
                    let g = 200;
                    let b = 100;
                    letters.push(new LetterParticle(x, y, xSpd, ySpd, r, g, b, word));
                    points += 1;
                }
            } else {
                // console.log("No...");
                for (let j = 0; j < 300; j++) {
                    let x = random(-width, 0);
                    let y = random(-300, 0);
                    let xSpd = random(3, 8);
                    let ySpd = random(3, 8);
                    let r = 255;
                    let g = 0;
                    let b = 0;
                    letters.push(new LetterParticle(x, y, xSpd, ySpd, r, g, b, keyArray[i]));
                    points -= 1;
                }
            }
        }
    }
    typedText = "";
    generateWord();
}
function keyPressed() {
    if (typedText.substring <= 10) {
        // HOW DO I FIGURE THIS OUT
    } else {
        if (keyCode == ENTER) {
            checkAnswer();
        } else if (keyCode == BACKSPACE) {
            typedText = typedText.substring(0, typedText.length - 1); //get the characters (from, to)
        } else if (keyCode == SHIFT) {
            //
        } else {
            let x = random(width);
            let y = random(height);
            let xSpd = random(-3, 3);
            let ySpd = random(-3, 3);
            letters.push(new LetterParticle(x, y, xSpd, ySpd, key));
            typedText += key;
        }
    }

    if (key == "n" && key == "N") {
        typedText = "";
        generateWord();
    }
}

function generateWord() {
    let cnArray = Object.values(words);
    word = random(cnArray);
}

class LetterParticle {
    constructor(x, y, xSpd, ySpd, r, g, b, txt) {
        this.txt = txt;
        this.x = x;
        this.y = y;
        this.xSpd = xSpd;
        this.ySpd = ySpd;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    move() {
        this.x += this.xSpd;
        this.y += this.ySpd;
    }
    display() {
        push();
        noStroke();
        fill(this.r, this.g, this.b);
        text(this.txt, this.x, this.y);
        pop();
    }
}