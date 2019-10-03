


let paragraphs = 5;
let words = "10-20";
let url = "https://www.randomtext.me/api/gibberish/p-" + paragraphs + "/" + words;

// first attempt

/*
const req = new XMLHttpRequest();
req.open("GET", url);
req.send();

document.getElementById("text").innerHTML = JSON.parse(req.response).text_out;

*/

// second attempt
/*
const req = new XMLHttpRequest();
req.onreadystatechange = function(){
    if(this.status == 200){        
        document.getElementById("text").innerHTML = JSON.parse(req.response).text_out;
    }
}
req.open("GET", url, true);
req.send();

*/
// third attempt



function get(url){
    return new Promise(function(resolve, reject){
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function(){
            if(req.status == 200){
                resolve(req.response);
            }
            else{
                reject(Error(req.statusText));
            }
        };

        req.onerror = function(){
            reject(Error("Network Error"));
        };

        req.send();
    });
}

/*
get(url).then(function(response){
    document.getElementById("text").innerHTML = JSON.parse(response).text_out;
});    

*/

// adding interactivity

function moreGib(){
    paragraphs = document.getElementById("paragraphs").value;
    words = document.getElementById("words").value;
    url = "https://www.randomtext.me/api/gibberish/p-" + paragraphs + "/" + words;
    get(url).then(function(response){
        document.getElementById("text").innerHTML = JSON.parse(response).text_out;
    });
}


// fourth attempt

fetch(url).then((resp) => resp.json()).then(function(data){
    document.getElementById("text").innerHTML = data.text_out;
});


// demo-ing some different flavors of performing async actions

function unpredictable(order) {
  return new Promise(function (resolve) {
    var resultValue = 'Result from call ' + String(order)
    setTimeout(() => resolve(resultValue), Math.random() * 1000)
  })
}

function ASAP() { // Random numbers, as values come out as soon as they are available
for (let i = 1; i <= 10; i++) {        
  unpredictable(i).then(resultValue => console.log(resultValue))    
}}

function allComplete() { // One big array comes out only after everything is done    
  var promisesArray = []    
  for (let i = 1; i <= 10; i++) {       
    promisesArray.push(unpredictable(i))    
  }    
  var allPromises = Promise.all(promisesArray)    
  allPromises.then(resultArray => console.log(resultArray))
}

async function inSequence() { // Each value is released in the order it was requested
  for (let i = 1; i <= 10; i++) {        
    var resultValue = await unpredictable(i)        
    console.log(resultValue)
  }
}
