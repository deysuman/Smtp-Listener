let Server = require("../Server");
let Client = require("..");


// Please give a star my repository 

let server = new Server(2525, {debug: true});
server.on("ready", ()=>{
    let client = new Client({debug: true});
    client.on("*", (mail)=>{
        // Callback method
        console.log("Received email:", mail);
    });
});