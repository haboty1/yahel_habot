const connect = require("./db");
const updatemimush = function(req,res){
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    const projectName = req.body.projectName;
    const gamashValue = req.body.gamash;
    const salkiumValue = req.body.salkium;
    const heseimValue = req.body.heseim;

    const quary = `UPDATE mimushim SET gamash = '${gamashValue}' AND set salkium = '${salkiumValue}' AND set heseim = '${heseimValue}' WHERE projectName = '${projectName}'`;

    connect.query(quary,(error, results) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in adding mimush: " + err});
            return;
        }
    console.log('Updated row in memoshim table');
    res.render('reviewAdded');
    return;
    });
};

module.exports = {updatemimush};