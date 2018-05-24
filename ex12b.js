// ex12b.js

// can be used only in a worker javascript file
importScripts("utils.js");

for(var i=1; i<=30; i++){
    postMessage("From worker-2 ex12b.js: " + i);
    sleep(400);
}