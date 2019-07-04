const User = require("./models/User");

const createAdminAccount = () => {
    console.log("Checking for admin account");

    // check if the admin account already exists
    User.findOne({email:"admin@noob.com"})
    .then(doc => {
        console.log("DOC:", doc);
        // Create admin account
        if(!doc) {
            const record = new User();
            record.email = "admin@noob.com";
            record.password = record.hashPassword("admin");
            record.userName = "admin";
            record.firstName = "Admin";
            record.lastName = "Admin";

            User.create(record)
            .then(doc => {
                console.log(doc)
            })
            .catch(err =>{
                console.log("Database error during creation of admin account");
                console.log(err);
            });
        } else {
            console.log("Admin account already exists");
        }
    });
}

module.exports = createAdminAccount;