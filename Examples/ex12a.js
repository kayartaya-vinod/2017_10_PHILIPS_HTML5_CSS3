// ex12a.js

// can be used only in a worker javascript file
importScripts("utils.js");


for(var i=1; i<=20; i++){
    postMessage(`From Web Worker 1, value of i is ${i}`);
    sleep(500);
}