 const connection = require("./db")
 const path = require('path');

 const getProjectDetails = (req, res) => {
     const name = req.params.projectname;
     connection.query('SELECT * FROM projects WHERE projectname like ?', name + '%', (err, mysqlres) => {
       if (err) {
         res.status(400).send({ message: err });
         return;
       }
  
       if (mysqlres[0]) {
         res.render(path.join(__dirname, "./views/details.pug"), {
           projectname: mysqlres[0]?.projectname,
           gamash: mysqlres[0]?.gamash,
           salkium: mysqlres[0]?.salkium,
           heseim: mysqlres[0]?.heseim,
         });
       } 
     });
   };


   const getAllprojects = async (req, res) => {
    connection.query('SELECT * FROM projects', (err, mysqlres) => {
      if (err) {
        res.status(400).send({ message: err });
        return;
      }
      res.render(path.join(__dirname, './views/menu.pug'), {
        maslulim: mysqlres?.filter(({ type }) => type === 'maslulim') || [],
        mevoot: mysqlres?.filter(({ type }) => type === 'mevoot') || [],
        reshony: mysqlres?.filter(({ type }) => type === 'reshony') || [],
        general: mysqlres?.filter(({ type }) => type === 'general') || [],

      });
    });
  };

   module.exports = {getProjectDetails,getAllprojects };
