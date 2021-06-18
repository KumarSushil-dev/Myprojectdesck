const { getplan,addplan,editplan, editshows, planupdatestatusbyid,plandeletesuperbyid } = require('../plans/plan.service');
const { sign } = require("jsonwebtoken");
var multer = require('multer');


module.exports = {

// Get Planlist
planlist: (req, res) => {
    const body = req.body;
    getplan(body, (err, results) => {
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
                detail: "No Plan Listed."

            });
        }

        if (results) {
        return res.status(200).json({
            success: true,
            data: results,
            detail: ""
          });
        }else{
            return res.status(500).json({
                success: false,
                data: [],
                detail: "No Plan Listed."

            });

        }


    });

},
// Add Planlist
planaddservice: (req, res) => {
    const body = req.body;
    
  
addplan(body, (err, results) => {
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
                detail: "Plan Not Added , Try Again later."

            });
        }

   
        return res.status(200).json({
            success: true,
            data: results,
            detail: ""
          });
       

    });

},
// Edit Planlist
planeditservice: (req, res) => {
    const body = req.body;
    
  
editplan(body, (err, results) => {
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
                detail: "Plan Not Updated , Try Again later."

            });
        }

   
        return res.status(200).json({
            success: true,
            data: results,
            detail: ""
          });
       

    });

},
// Show Plan Edit View

planeditshow: (req, res) => {
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
                detail: "Plan ID Not Found , Try Again later."

            });
        }

   
        return res.status(200).json({
            success: true,
            data: results,
            detail: ""
          });
       

    });

},
planupdatestatus: (req, res) => {
    const body = req.body;

  
 
    planupdatestatusbyid(body, (err, results) => {
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

plandeletesuper: (req, res) => {
    const body = req.body;

    plandeletesuperbyid(body, (err, results) => {
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