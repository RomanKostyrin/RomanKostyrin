let field = document.querySelector('.field');
let start = document.querySelector('.startButton');
let build = document.querySelector('.buildRoads');
let goCar = document.querySelector('.goCar');
let startTo = document.querySelector('.start');
let massive = [];
let lengthMassive = [];
let weightMassive = [];
let wasMassive = [];
let summtotal2 = [1,2,3,4,5,6,7,8,9,10,11,12];
let summtotal = 0;
let display = document.querySelector('.display');
let road = [];
let tempI = 1;
let ostatok = [];
let fullLength = 0;
let wasTempMassive = [];  
let valueMassive = 1; // ставим что в нем уже были
let bre = 0;
let pathForCar = [];
let car = document.querySelector('.car');

const point1 = new Object({
  name: 'point',
  xRand: 20,
  yRand: 425
  })

const point2 = new Object({
    name: 'point',
    xRand: 1250,
    yRand: 425
  })

// фунция создает точку
function creacePoint() {
  const point = new Object({
    name: 'point',
    xRand: randomizer(80, 1200),
    yRand: randomizer(30, 750)
  })
  return point;
}

// функция рандома
function randomizer (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min);
    return Math.round(rand);
}

//функция создает элементы в ДОМ
start.addEventListener(('click'), function() {
  massive.push(point1);
  for(let i = 0; i <10; i++) {
    let pointToMassive = creacePoint();
    let tempPoint = makeElement('div', `point${i+1}`);
    tempPoint.style.top = `${pointToMassive.yRand}px`;
    tempPoint.style.left = `${pointToMassive.xRand}px`;
    pointToMassive.name = `point${i+1}`;
    field.appendChild(tempPoint);
    massive.push(pointToMassive);
  }
  massive.push(point2);
})

// функция создает элемент
let makeElement = function(teg, className, text) {
  var element = document.createElement(teg);
  element.classList.add('point');
  element.classList.add(className);
  if (text) {
   element.textContent = text; 
  }  
  return element;
};
build.addEventListener(('click'),function(event){
  event.preventDefault;
  createRoad(road);
})

startTo.addEventListener(('click'),function(event){
  allLength();
  event.preventDefault;
  let minvalue = 10000;
  display.innerText = 'Searching... Wait...';
    for(i = 0; i < 12500; i++) {
      let temporary = zhopa();
      if (temporary[1] < minvalue) {
        minvalue = temporary[1];
        road = temporary[0];
      }
       // console.log(' mass ' + road);
    }
    hello(minvalue);
})

function hello(minvalue2) {
  display.innerText = `Min length is: ${Math.round(minvalue2)} pixels`;
}

//функция создает дороги

function createRoad(road) {
  let svgElement = document.getElementById('bla');  
  let stringD = '';
  let num = 0;
  let tempString = '';
  for (let i = 0; i < 11; i++) {
    num = road[i];
    num = num[0]+num[1];
    if(num[1] == '-') {
      pathForCar[i] = massive[num[0]-1].xRand;
      pathForCar[50+i] = massive[num[0]-1].yRand;
      // console.log('num0 = ' + num[0] + ' massive[num[0]] = ' + massive[num[0]].xRand);
      tempString = ` ${massive[num[0]-1].xRand+25},${massive[num[0]-1].yRand+25}`;
      tempString.toString;
      stringD += tempString;
    }
    else {
      pathForCar[i] = massive[num-1].xRand;
      pathForCar[50+i] = massive[num-1].yRand;
      tempString = ` ${massive[num-1].xRand+25},${massive[num-1].yRand+25}`;
      tempString.toString;
      stringD += tempString;
    }
    pathForCar[11] = massive[11].xRand;
     pathForCar[61] = massive[11].yRand;
  }

  svgElement.setAttribute("d",`M 40, 445 ${stringD} 1270, 445`);
  console.log(stringD);
  return stringD;
}

//функция заставляет машинку ехать по точкам

goCar.addEventListener(('click'), function(event) {
  event.preventDefault;
  let car = document.querySelector('.car');
  car.classList.add('visual');
    for (let i = 0; i < 11; i++) {
      console.log('i ' + pathForCar[i] + ' i+50 ' + pathForCar[50+i]) ;   
    }

  // ("d",`M 40, 445 ${stringD} 1270, 445`);
     pathForCar.forEach((value)=>{
      car.animate([
      // keyframes
      { top: `${pathForCar[50]}px` , left: `${pathForCar[0]}px`},
      { top: `${pathForCar[51]}px` , left: `${pathForCar[1]}px`},
      { top: `${pathForCar[52]}px` , left: `${pathForCar[2]}px`},
      { top: `${pathForCar[53]}px` , left: `${pathForCar[3]}px`},
      { top: `${pathForCar[54]}px` , left: `${pathForCar[4]}px`},
      { top: `${pathForCar[55]}px` , left: `${pathForCar[5]}px`},
      { top: `${pathForCar[56]}px` , left: `${pathForCar[6]}px`},
      { top: `${pathForCar[57]}px` , left: `${pathForCar[7]}px`},
      { top: `${pathForCar[58]}px` , left: `${pathForCar[8]}px`},
      { top: `${pathForCar[59]}px` , left: `${pathForCar[9]}px`},
      { top: `${pathForCar[60]}px` , left: `${pathForCar[10]}px`},
      { top: `${pathForCar[61]}px` , left: `${pathForCar[11]}px`}
    ], {
      // timing options
      duration: 10000,
      iterations: 1,
      fill: "forwards",
      easing: "cubic-bezier(0.41, 0.59, 0.59, 0.96)"
    });
   })  
})

//функция вычисляет длину пути
function lengthRoad(town1, town2) {
  let katet1 = Math.abs(town1.xRand - town2.xRand);
  let katet2 = Math.abs(town1.yRand - town2.yRand);
  let gipotenusa = Math.sqrt(katet1 * katet1 + katet2 * katet2);
  return gipotenusa;
}

const pathToWin = new Object({
  from: 1,
  to: 2,
  length: '100px',
  weight: 1
})

//функция вычисляет все расстояния между 2мя городами
function allLength() {
  for (let i = 1; i < 13; i++ ) {
    for (let j = 2; j < 13; j++) {
      if (j > i) {
        let value1 = lengthRoad(massive[i-1], massive[j-1]);
        if (value1 != 0) {
          // console.log(i, j);
          // console.log(value1);
          lengthMassive[`${i}-${j}`] = value1;
          weightMassive[`${i}-${j}`] = 1;
          // wasMassive[`${i}`] = 1;
        }
      }
    }
  }
}

function zhopa() {

  //цикл заставляет феромоны устаревать
  for (let i = 0; i < 13; i++) {
     for (let j = i; j < 13; j++) {
       // console.log(weightMassive[`${i}-${j}`]);
      if(weightMassive[`${i}-${j}`] > 1) {
        let temp = weightMassive[`${i}-${j}`] * 0.95;//0.97 - коэффициент регулирует устаревание феромонов, чем больше цифра тем дольше держится феромон
        if (temp > 1) {
          // console.log('temp = ' + temp);
          weightMassive[`${i}-${j}`] =  temp;
        }
      }
    }
  }

  let massForVes = [];
  let schet = 0;
  tempI = 1;
  ostatok = [];
  fullLength = 0;
  wasTempMassive = [,1,1,1,1,1,1,1,1,1,1,1];  
  valueMassive = 1; // ставим что в нем уже были
  bre = 0;   
  //начинаем с какого по номеру города
  for (let i = 1; i < 14; i++ ) {   
    bre ++;
    if (bre == 50) {
      break;
    }
    // console.log(i);
    i = valueMassive; 
    let PMassive = [];
    let verhP = 0;
    let nizP  = 0;
    let P = 0;
    let total = 0;
    let summ = 0;
    let randomchik = randomizer (1, 100);

    if(i == 12) {
      if (ostatok[1] == 12) {
        for (let i = 0; i < 11; i++) {
        let reversed = massForVes[i].split("").reverse().join("");
          if (weightMassive[massForVes[i]] !== undefined) {
            weightMassive[massForVes[i]] += 1;
          }
           if (weightMassive[massForVes[i]] == undefined) {
             if (weightMassive[reversed] !== undefined) {  
             weightMassive[reversed] += 1;      
            }
          }
        } 
        let mass = [];
        mass[0] = massForVes;
        mass[1] = fullLength;
        return mass;
      }
      else {
        return 10000;
      }
    }
    for (let j = 2; j < 13; j++) {
      if (wasTempMassive[`${j-1}`] == 1) {     
        if (weightMassive[`${i}-${j}`] !== undefined) {
          nizP += weightMassive[`${i}-${j}`]/lengthMassive[`${i}-${j}`]; // вычисляем низ формулы
        }
         if (weightMassive[`${i}-${j}`] == undefined) {
           if (weightMassive[`${j}-${i}`] !== undefined) {
            nizP += weightMassive[`${j}-${i}`]/lengthMassive[`${j}-${i}`]; // вычисляем низ формулы ( если нет связи например 5-2 - ищет в 2-5)
          }
        }
      }
    }
    tempI = 1;
    ostatok = [];
    for (let j = 2; j < 13; j++) {  
      if (wasTempMassive[`${j-1}`] == 1) {   
        verhP =  ((1/lengthMassive[`${i}-${j}`]) * weightMassive[`${i}-${j}`]); // вычисляем верх формулы
        if (lengthMassive[`${i}-${j}`] == undefined) {
          if (weightMassive[`${j}-${i}`] !== undefined) {
            verhP =  ((1/lengthMassive[`${j}-${i}`]) * weightMassive[`${j}-${i}`]); // вычисляем верх формулы. вычисляем низ формулы ( если нет связи например 5-2 - ищет в 2-5)
          }
        }
        if (verhP > 0) {
          total = 100 * (verhP/nizP); // итог формулы
          summtotal += total;
          ostatok[tempI] = j;
          tempI++;          
          PMassive.push(total); // заносим в масив результаты P    
        }
      }

    }
    
    summtotal = 0;
     for (let k = 0; k < 11; k++) {
        summ += PMassive[k];
        
        if (randomchik < summ) {
          valueMassive = ostatok[k+1];
          let nomer = summtotal2.getKeyByValue(valueMassive);
          wasTempMassive[nomer] = 0; // нашли точку где уже были и запомнили 
          massForVes[schet] = `${i}-${valueMassive}`;
          schet++;
         break;
        }        
      }
      if(lengthMassive[`${i}-${valueMassive}`]) {
        fullLength += lengthMassive[`${i}-${valueMassive}`];
      }
      else {
         fullLength += lengthMassive[`${valueMassive}-${i}`];
      }      
  }  
}

//функция находит ключ по значению
Object.prototype.getKeyByValue = function(value) {
  for (var prop in this) {
    if (this.hasOwnProperty(prop)) {
      if (this[prop] === value)
        return prop;
    }
  }
}