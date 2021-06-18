const { getstaticpages,addstaticpages,editstaticpages, editshows, staticpagesupdatestatusbyid,staticpagesdeletesuperbyid } = require('../staticpages/staticpages.service');
const { sign } = require("jsonwebtoken");
var multer = require('multer');


module.exports = {

// Get staticpageslist
staticpageslist: (req, res) => {
    const body = req.body;
    getstaticpages(body, (err, results) => {
        if (err) {
        
          return res.status(500).json({
                success: false,
                data: [],
                message: "Connection Error."
            });
        }
      
      

        
        return res.status(200).json({
            success: true,
            data: results,
            detail: ""
          });
        


    });

},
// Add staticpageslist
staticpagesaddservice: (req, res) => {
    const body = req.body;
    
  
addstaticpages(body, (err, results) => {
        if (err) {

            console.log(err);
          return res.status(500).json({
                success: false,
                data: [],
                message: "Connection Error."
            });
        }

        if (results.length === 0) {
            return res.status(500).json({
                success: false,
                data: [],
                detail: "staticpages Not Added , Try Again later."

            });
        }

   
        return res.status(200).json({
            success: true,
            data: results,
            detail: ""
          });
       

    });

},
// Edit staticpageslist
staticpageseditservice: (req, res) => {
    const body = req.body;
    
  
editstaticpages(body, (err, results) => {
        if (err) {

            console.log(err);
          return res.status(500).json({
                success: false,
                data: [],
                message: "Connection Error."
            });
        }

        if (results.length === 0) {
            return res.status(500).json({
                success: false,
                data: [],
                detail: "staticpages Not Updated , Try Again later."

            });
        }

   
        return res.status(200).json({
            success: true,
            data: results,
            detail: ""
          });
       

    });

},
// Show staticpages Edit View

staticpageseditshow: (req, res) => {
    const body = req.body;
    
  editshows(body, (err, results) => {
        if (err) {

     
          return res.status(500).json({
                success: false,
                data: [],
                message: "Connection Error."
            });
        }

        if (results.length === 0) {
            return res.status(500).json({
                success: false,
                data: [],
                detail: "staticpages ID Not Found , Try Again later."

            });
        }

   
        return res.status(200).json({
            success: true,
            data: results,
            detail: ""
          });
       

    });

},
staticpagesupdatestatus: (req, res) => {
    const body = req.body;

  
 
    staticpagesupdatestatusbyid(body, (err, results) => {
        if (err) {
            console.log(err);
            return;

        }
        if (!results) {
            return res.status(500).json({
                suceess: 0,
                message: "Record Not Found"

            });
        }
        return res.status(200).json({
            success: 1,
            data: results


        });

    });


},

staticpagesdeletesuper: (req, res) => {
    const body = req.body;

    staticpagesdeletesuperbyid(body, (err, results) => {
        if (err) {
            console.log(err);
            return;

        }
        if (!results) {
            return res.status(500).json({
                suceess: 0,
                message: "Record Not Found"

            });
        }
        return res.status(200).json({
            success: 1,
            data: results


        });



    });


},


    
}