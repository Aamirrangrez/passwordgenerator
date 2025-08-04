const inputSlider =  document.querySelector("[data-lengthSlider]");
const lengthDisplay =  document.querySelector("[data-lengthNumber]");
const passwordDisplay =  document.querySelector("[ data-passwordDisplay]");
const copyBtn =  document.querySelector("[data-copy]");
const copyMsg =  document.querySelector("[data-copymsg]");
const uppercaseCheck =  document.querySelector("#uppercase");
const lowercaseCheck =  document.querySelector("#lowercase");
const symbolsCheck =  document.querySelector("#symbols");
const numbersCheck =  document.querySelector("#numbers");
const indicator =  document.querySelector("[data-indicator]");
const generateBtn =  document.querySelector(".generateBtn");
const allCheckBox =  document.querySelectorAll("input[type =  checkbox]");
const symbols='~!@#$%^&*(_+{}/-+<>=?\"`';

let password="";
let passwordLength=10;
let checkCount=0;
//indicator have to color and establish
handleSlider();
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    //shadowis pending
}

function getRandomInteger(min,max){
     return Math.floor( Math.random ()* (max-min))+min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generaterUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateSymbol(){
  const reandom=getRandomInteger(0,symbols.length);
  return symbols.charAt(reandom);
}
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasSymbols = false;
    let hasNumbers = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(symbolsCheck.checked) hasSymbols = true;
    if(numbersCheck.checked) hasNumbers = true;

    if(hasUpper && hasLower && hasSymbols && hasNumbers && passwordLength >= 8){
        setIndicator("green");    
    } else if(hasLower && hasUpper && hasNumbers && passwordLength >= 6){
        setIndicator("yellow");
    } else {
        setIndicator("red");    
    }
}
    async function copyContent() {
        try{
            await navigator.clipboard.writeText(passwordDisplay.value);
            copyMsg.innerText="copied";
        }
        catch(e){
            copyMsg.innerText="failed";
        }
        //copy span will visible
        copyMsg.classList.add("active");

        setTimeout(() => {
            copyMsg.classList.remove("active");
        },1000);
    }
    function handleCheckBoxChange(){
        checkCount=0;
        allCheckBox.forEach((checkbox)=>{
            if(checkbox.checked)
                checkCount++;
        });
        if(passwordLength>checkCount){
            passwordLength=checkCount;
            // handleSlider();
        }
    }
    allCheckBox.forEach((checkBox)=>{
        checkBox.addEventListener('change', handleCheckBoxChange);
    });

    inputSlider.addEventListener('input',(e)=>{
        passwordLength= e.target.value;
        handleSlider();
    })

    copyBtn.addEventListener('click',()=>{
        if(passwordDisplay.value)
            copyContent();
        
    })


    function shufflePassword(array){
        for(let i=array.length-1;i>0;i--){
            const j=Math.floor(Math.random()*(i+1));
            const temp=array[i];
            array[i]=array[j];
            array[j]=temp;
        }
    let str="";
    array.forEach((el) => (str+=el));
    return str;
    }   


    generateBtn.addEventListener('click',()=>{
        if(checkCount==0) 
            return;

        if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
        }
        console.log("Staring the journey");
        password="";

        // if(uppercaseCheck.checked){
        //     password+=generaterUpperCase(); 
        // }
        // if(lowercaseCheck.checked){
        //     password+=generateLowerCase();
        // }
        // if(numbersCheck.checked){
        //     password+=generateRandomNumber(); 
        // }
        // if(symbolsCheck.checked){
        //     password+=generateSymbol(); 
        // }

        let funcArr=[];
        if(uppercaseCheck.checked){
            funcArr.push(generaterUpperCase);
        }
        
        if(lowercaseCheck.checked){
            funcArr.push(generateLowerCase);
        }

        if(symbolsCheck.checked){
            funcArr.push(generateSymbol);
        }

        if(numbersCheck.checked){
            funcArr.push(generateRandomNumber);
        }

        for(let i=0;i<funcArr.length;i++){
            password+=funcArr[i]();
        }
        console.log('Compalsory addition done');

        for(let i=0;i<passwordLength-funcArr.length;i++){
            let randIndex=getRandomInteger(0,funcArr.length);
            password+=funcArr[randIndex]();
        }
         
        console.log('Remaining addition done');

        password=shufflePassword(Array.from(password));
        console.log('Shuffling done');
        passwordDisplay.value=password;
        console.log('UI addition done');

        calcStrength();

    }) 

