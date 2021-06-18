const { getemailtemplate,addemailtemplate,editemailtemplate, editshows, emailtemplateupdatestatusbyid,emailtemplatedeletesuperbyid } = require('../emailtemplate/emailtemplate.service');
const { sign } = require("jsonwebtoken");
var multer = require('multer');


module.exports = {

// Get emailtemplatelist
emailtemplatelist: (req, res) => {
    const body = req.body;
    getemailtemplate(body, (err, results) => {
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
// Add emailtemplatelist
emailtemplateaddservice: (req, res) => {
    const body = req.body;
    
  
addemailtemplate(body, (err, results) => {
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
                detail: "emailtemplate Not Added , Try Again later."

            });
        }

   
        return res.status(200).json({
            success: true,
            data: results,
            detail: ""
          });
       

    });

},
// Edit emailtemplatelist
emailtemplateeditservice: (req, res) => {
    const body = req.body;
    
  
editemailtemplate(body, (err, results) => {
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
                detail: "emailtemplate Not Updated , Try Again later."

            });
        }

   
        return res.status(200).json({
            success: true,
            data: results,
            detail: ""
          });
       

    });

},
// Show emailtemplate Edit View

emailtemplateeditshow: (req, res) => {
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
                detail: "emailtemplate ID Not Found , Try Again later."

            });
        }

   
        return res.status(200).json({
            success: true,
            data: results,
            detail: ""
          });
       

    });

},
emailtemplateupdatestatus: (req, res) => {
    const body = req.body;

  
 
    emailtemplateupdatestatusbyid(body, (err, results) => {
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

emailtemplatedeletesuper: (req, res) => {
    const body = req.body;

    emailtemplatedeletesuperbyid(body, (err, results) => {
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