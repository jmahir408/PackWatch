//Manually creating a user option

const User = require("./models/package");

async function createUser() {
    try {
        const newUser = await User.create({
            trackingID: "WORDS",
            name: "names"
        });
    } catch (err) { 
        console.log(err);
    }
}

console.log("Starting User.js");
createUser();