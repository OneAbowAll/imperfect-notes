const { OnStart, ChangeBrush } = require("./src/notMain");

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

//window.onload = OnStart;

//window.onkeydown = (e)=>{ if(e.key === "e") ChangeBrush(); };