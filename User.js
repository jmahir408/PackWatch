//Manually creating a user option

const User = require("./models/package");

async function createUser() {
    try {
        const newUser = await User.create({
            trackingID: "WORDS",
            alias: "names"
        });
    } catch (err) { 
        console.log(err);
    }
}

console.log("Starting User.js");
createUser();