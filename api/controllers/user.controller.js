const {getcountry,getstate,getstateselect,login,create,checkifemailexist,getuser,userupdatestatusbyid,userdeletesuperbyid,getemailtemplate,saveuserpunch,saveuserpunchout,activationverificationid,getplan,planupgradesbyid } = require('../users/user.service');
const { genSaltSync, hashSync } = require('bcryptjs');
const { sign } = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
var multer = require('multer');
const path = require('path');
const helpers = require('./helpers');
var upload = multer({ dest: 'uploads/' });
const moveFile = require('move-file');
var randomstring = require("randomstring");
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    port: 587,
    host: "email-smtp.us-east-1.amazonaws.com",
    auth: {
        user: 'AKIA2LYP4IEXPZ6EWYLV',
        pass: 'BInmkwVa3BmUu0ZX/5QoFOXFZ3gLg0dY2b/AVrwwhEtg',
    },
    //secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {

        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
module.exports = {

// Get Country List For Signup
countrylist: (req, res) => {
    const body = req.body;

    getcountry(body, (err, results) => {
        if (err) {
          return res.status(500).json({
                success: false,
                data: [],
                detail: "Connection Error."
            });
        }

        if (results.length === 0) {
            return res.status(500).json({
                success: false,
                data: [],
                detail: "No Country Listed."

            });
        }

        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            detail: ""
          });

        }else{
            return res.status(500).json({
                success: false,
                data: [],
                detail: "No Country Listed."

            });

        }

    });

},
// Get State List For Signup
statelist: (req, res) => {
    const body = req.body;

    getstate(body, (err, results) => {
        if (err) {
          return res.status(500).json({
                success: false,
                data: [],
                detail: "Connection Error."
            });
        }

        if (results.length === 0) {
            return res.status(500).json({
                success: false,
                data: [],
                detail: "No State Listed."

            });
        }

        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            detail: ""
          });

        }else{

            return res.status(500).json({
                success: false,
                data: [],
                detail: "No State Listed."

            });

        }

    });

},
// Get Selected State from Country 
getselectedstate: (req, res) => {
    const body = req.body;

    getstateselect(body, (err, results) => {
        if (err) {
          return res.status(500).json({
                success: false,
                data: [],
                detail: "Connection Error."
            });
        }

        if (results.length === 0) {
            return res.status(500).json({
                success: false,
                data: [],
                detail: "No State Listed."

            });
        }

        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            detail: ""
          });

        }else{

            return res.status(500).json({
                success: false,
                data: [],
                detail: "No State Listed."

            });

        }

    });

},

    // Login User
    loginuser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.passwords = hashSync(body.password, salt);

        login(body, (err, results) => {
         if (err) {
               
                return res.status(500).json({
                    success: false,
                    data: [],
                    detail: "Connection Error."

                });
            }
        var re = JSON.stringify(results);
                var test = JSON.parse(re);
                var confirm_pass = test[0].password;

               
             
 bcrypt.compare(body.password, confirm_pass, (err, data) => {
                    if (err) {
                       
                        return;

                    }
                    if (!data) {
                        return res.status(500).json({
                            success: false,
                            data: [],
                            detail: "Invalid username or password."

                        });
                    }
                    if (data) {

                        
        results.password=undefined;
        const jsontoken = sign({ result: results },process.env.TOKEN_SECRET, { expiresIn: '1h' });
        const planexpiry='2022-06-14';
        var obj = [];
        obj.push({ "token": jsontoken,"planExpiryDate":planexpiry });

                    return res.status(200).json({
                        success: true,
                        data: obj,
                        companyname: test[0].companyname,
                        detail: "Logged IN"
    });
}else{

    return res.status(500).json({
        success: false,
        data: [],
        detail: "Invalid username or password."

    });
}

 });
   });

    },
    // Signup User
    signupuser: (req, res) => {
        const body = req.body;
 
        const salt = genSaltSync(10);
      
        body.passwords = hashSync(body.password, salt);
        body.activationkey=randomstring.generate();
      
    

        checkifemailexist(body, (err, result) => {
  if (err) {
             
                return res.status(500).json({
                    success: false,
                    data: [],
                    detail: "Connection Error."

                });
            }

            if (result.length === 0) {
         create(body, (err, results) => {
           
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    data: [],
                    detail: "Connection Error."

                });
            }

            if (!results){
                return res.status(500).json({
                    success: false,
                    data: [],
                    detail: "Invalid username or password."

                });
            }
            return res.status(200).json({
                success:true,
                data: results,
                detail: "Sign Up Successfully"


            });



        });
    }else{

        return res.status(500).json({
            success: false,
            data: [],
            detail: "Email Already Exist."

        });

    }
    });
    },


    // Signup User Web
    signupuserweb: (req, res) => {
        const body = req.body;
 
        const salt = genSaltSync(10);
        body.password=randomstring.generate(7);
        body.passwords = hashSync(body.password, salt);
        body.activationkey=randomstring.generate();
        body.plan_id=5;
        body.role_id=2;

        checkifemailexist(body, (err, result) => {
  if (err) {
             
                return res.status(500).json({
                    success: false,
                    data: [],
                    detail: "Connection Error."

                });
            }

            getcountry(body, (err, resultsdata) => {
               
        if (result.length === 0) {
         create(body, (err, results) => {
           
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    data: resultsdata,
                    detail: "Connection Error."

                });
            }

            if (!results){
                return res.status(500).json({
                    success: false,
                    data: resultsdata,
                    detail: "Invalid username or password."

                });
            }

            if (results) {
            body.lid=1;
            getemailtemplate(body, (err, resultsf) => {
        //  console.log(resultsf);
                var ure = JSON.stringify(resultsf);
                var utest = JSON.parse(ure);
              
             
var activation=process.env.APP_URL+'/activationverified/'+body.activationkey;

        var replacements = {
            "%Name%": body.companyname,
            "%Email%": body.email,
            "%Password%": body.password,
            "%Activation%": activation
        }

var str=utest[0].format;
        str = str.replace(/%\w+%/g, function(all) {
            return replacements[all] || all;
         });
                const mailData = {
                    from: 'noreply@eboxtenders.com',
                    to: body.email,
                    subject: utest[0].subject,
                    text: '',
                    html: str,
                };
            
                transporter.sendMail(mailData, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }


                    res.status(200).json({ message: "Mail send", message_id: info.messageId,   data: resultsdata });
                });
    
    
    
            });

        }

        });
    }else{

        return res.status(500).json({
            success: false,
            data: resultsdata,
            detail: "Email Already Exist."

        });

    }
});
    });
    },
  // Get All User
    getallusers: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;
        getuser(body, (err, results) => {
            if (err) {

                console.log(err);
              return res.status(500).json({
                    success: false,
                    data: [],
                    detail: "Connection Error."
                });
            }



            
            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    detail: "No User Listed."

                });
            }

            getplan(body, (err, resultsf) => {
                if (err) {
                    console.log(err);
                    return;
    
                }

                return res.status(200).json({
                    success: true,
                    data: results,
                    plan:resultsf
    
    
                });
    
    
    
            });


   



        });

    },
    userupdatestatus: (req, res) => {
        const body = req.body;

      
        const salt = genSaltSync(10);
        body.password=randomstring.generate(7);
        body.passwords = hashSync(body.password, salt);
     
        userupdatestatusbyid(body, (err, results) => {
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

            if (results) {
             
                getplan(body, (err, resultsf) => {
                    if (err) {
                        console.log(err);
                        return;
        
                    }
    
                    return res.status(200).json({
                        success: true,
                        data: results,
                        plan:resultsf
        
        
                    });
        
        
        
                });
              
                


        

        }

        });


    },
    
    planupgrades: (req, res) => {
        const body = req.body;

console.log(body);
     
        planupgradesbyid(body, (err, results) => {
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

            if (results) {
             
                getplan(body, (err, resultsf) => {
                    if (err) {
                        console.log(err);
                        return;
        
                    }
    
                    return res.status(200).json({
                        success: true,
                        data: results,
                        plan:resultsf
        
        
                    });
        
        
        
                });
              
                


        

        }

        });


    },


    activationverification: (req, res) => {
        const body = req.body;
     
        activationverificationid(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    suceess: 0,
                    message: "Record Not Found"

                });

            }
            if (!results) {
                return res.status(500).json({
                    suceess: 0,
                    message: "Record Not Found"

                });
            }

            if (results) {
             
                return res.status(200).json({
                    success: 1,
                    data: results
    
    
                });
        
        }

        });


    },

    userdeletesuper: (req, res) => {
        const body = req.body;

        userdeletesuperbyid(body, (err, results) => {
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
            getplan(body, (err, resultsf) => {
                if (err) {
                    console.log(err);
                    return;
    
                }

                return res.status(200).json({
                    success: true,
                    data: results,
                    plan:resultsf
    
    
                });
    
    
    
            });



        });


    },


    // Save Employee Punch IN
    savepunchin: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;

      
        saveuserpunch(body, (err, results) => {
            if (err) {
                console.log(err);
              return res.status(500).json({
                    success: false,
                    data: [],
                    detail: "Connection Error."
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    detail: "No Time Listed."

                });
            }
          var re = JSON.stringify(results);
           var test = JSON.parse(re);
    const intimee=test.punch_in;
    var obj = [];
    obj.push({ "intime": intimee, "ScreenShortInterval": 12 });
            return res.status(200).json({
                success:true,
                data: obj
              });



        });

    },
     // Save Employee Punch IN
     savepunchout: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;

      
        saveuserpunchout(body, (err, results) => {
            if (err) {
               
              return res.status(500).json({
                    success: false,
                    data: [],
                    detail: "Connection Error."
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    detail: "No Time Listed."

                });
            }
       
    var obj = [];
    obj.push({ "is_full_day": 'Y' });
            return res.status(200).json({
                success:true,
                data: obj
              });



        });

    }






    
}