const {getcountry,getstate,getSearchid,getstateselect,login,create,checkifemailexist,getuser,userupdatestatusbyid,userdeletesuperbyid,getemailtemplate,getemailtemplateone,saveuserpunch,savebreakstartid,savebreakstopid,saveuserpunchout,activationverificationid,getplan,getsubscriptionidcreated,planupgradesbyid,getDetailid,getsubscriptionid,getsubscriptiondetailid,addsubscriptionsid,getuserbiling,getadmin,editprofileid,viewdetailid,getsitesettings,useredit,sitesettingedit,passwordedit,getuserbilingcompany,getselectedcompanydetail,updatepaymentid,datatransferid,getproductivityinfo,getusercompany,addcompanyuserid,checkemailexistid,getattendence,checkiftodaydateexistuserid,getcpaturescrreninterval,getsnapshotsinfo,breaklistget,activeactivityget } = require('../users/user.service');
const { genSaltSync, hashSync } = require('bcryptjs');
const { sign } = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
var multer = require('multer');
const path = require('path');
const helpers = require('./helpers');
var upload = multer({ dest: 'uploads/' });
const moveFile = require('move-file');
const moment = require("moment");
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
checkemailexist: (req, res) => {
    const body = req.body;

    checkemailexistid(body, (err, results) => {
       


        if (results.length === 0) {

            return res.status(200).json({
                success: false,
                data: [],
                detail: 0

            });



        }


        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            detail: 1
          });

        }

    });

},

// Get Selected State from Country 
getSearch: (req, res) => {
    const body = req.body;

    getSearchid(body, (err, results) => {
        if (err) {
          return res.status(500).json({
                success: false,
                data: [],
                detail: "Connection Error."
            });
        }
   
        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            detail: ""
          });

        }else{

            return res.status(200).json({
                success: false,
                data: [],
                detail: "No State Listed."

            });

        }

    });

},

// Get Selected User Detail
getDetail: (req, res) => {
    const body = req.body;

    getDetailid(body, (err, results) => {
        if (err) {
          return res.status(500).json({
                success: false,
                data: [],
                detail: "Connection Error."
            });
        }
        
        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            detail: ""
          });

        }else{

            return res.status(200).json({
                success: false,
                data: [],
                detail: "No State Listed."

            });

        }

    });

},



// Get Selected User Detail
editprofile:(req, res) => {
    const body = req.body;
    body.userid=req.decoded.result[0].id;
    editprofileid(body, (err, results) => {
        if (err) {
          return res.status(500).json({
                success: false,
                data: [],
                detail: "Connection Error."
            });
        }
        getcountry(body, (err, resultsdata) => {
            getstate(body, (err, resultsdatae) => {
                getsitesettings(body, (err, resultsetting) => {

            
        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            country:resultsdata,
            state:resultsdatae,
            settings:resultsetting,
            detail: ""
          });

        }else{

            return res.status(200).json({
                success: false,
                data: [],
                detail: "No State Listed."

            });

        }
    });
    });
    });
});

},

// Get Selected User Detail
viewdetail:(req, res) => {
    const body = req.body;
    body.userid=body.id
    viewdetailid(body, (err, results) => {
        if (err) {
          return res.status(500).json({
                success: false,
                data: [],
                detail: "Connection Error."
            });
        }
        getcountry(body, (err, resultsdata) => {
            getstate(body, (err, resultsdatae) => {
                getsitesettings(body, (err, resultsetting) => {
                    getattendence(body, (err, resultlogs) => {


                        let x = 60; //minutes interval
                        let times = []; // time array
                        let tt = 0; // start time
                     
                        
                        //loop to increment the time and push results in array
                        for (let i=0;tt<24*60; i++) {
                            let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
                            let sh=hh+1;
                            let mm = (tt%60); // getting minutes of the hour in 0-55 format
                          times[i] = ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00") + '-' + ("0" + (sh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00"); // pushing data in array in [00:00 - 12:00 AM/PM format]
                          tt = tt + x;
                        }
                        body.times=times;
                        const startdate = new Date();
                        body.startdate=moment(startdate).format('YYYY-MM-DD');
                    
                    

        getsnapshotsinfo(body, (err, productivityresults) => {
       

        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            country:resultsdata,
            state:resultsdatae,
            settings:resultsetting,
            logss:resultlogs,
            snapshotdata: productivityresults
          });

        }else{

            return res.status(200).json({
                success: false,
                data: [],
                detail: "No Data Listed."

            });

        }
    });
    });
    });
    });
    });
});

},

// Get Selected User Detail
getsubscription: (req, res) => {
    const body = req.body;

    getsubscriptionid(body, (err, results) => {
        if (err) {
          return res.status(500).json({
                success: false,
                data: [],
                detail: "Connection Error."
            });
        }
        
        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            detail: ""
          });

        }else{

            return res.status(200).json({
                success: false,
                data: [],
                detail: "No State Listed."

            });

        }

    });

},

// Get Selected User Detail
updatepayment: (req, res) => {
    const body = req.body;

    updatepaymentid(body, (err, results) => {
        if (err) {
          return res.status(500).json({
                success: false,
                data: 2,
                detail: "Connection Error."
            });
        }
        
        if (results) {

          body.lid=2;
            getemailtemplate(body, (err, resultsf) => {
                
                        var ured = JSON.stringify(resultsf);
                        var utest = JSON.parse(ured);
                
                var subscriptiondetail = JSON.stringify(results);
            var subscriptiondetails = JSON.parse(subscriptiondetail);


        var replacements = {
            "%Name%": subscriptiondetails.user.companyname,
            "%planname%": subscriptiondetails.plan.name,
            "%totaluser%": subscriptiondetails.totaluser,
            "%price%": subscriptiondetails.payment_detail,
            "%payment_id%": subscriptiondetails.payment_id,
            "%createdd%": moment(subscriptiondetails.created).format('DD-MM-YYYY'),
            "%expire%": moment(subscriptiondetails.expiry_date).format('DD-MM-YYYY')
        }

var str=utest[0].format;
        str = str.replace(/%\w+%/g, function(all) {
            return replacements[all] || all;
         });
                const mailData = {
                    from: 'noreply@eboxtenders.com',
                    to: subscriptiondetails.user.email,
                    subject: utest[0].subject,
                    text: '',
                    html: str,
                };
            
                transporter.sendMail(mailData, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }


                   // res.status(200).json({ message: "Mail send", message_id: info.messageId,   data: resultsdata });
                   console.log(info.messageId);
                    return res.status(200).json({
                        success:true,
                        data: 1,
                        message_id:info.messageId,
                        detail: ""
                      });
                });
    
   
    
            });



       

        }else{

            return res.status(200).json({
                success: false,
                data: 2,
                detail: "No State Listed."

            });

        }

    });

},
// Get Selected User Detail
getsubscriptiondetail: (req, res) => {
    const body = req.body;

    getsubscriptiondetailid(body, (err, results) => {
        
        
        if (results) {

        getadmin(body, (err, resultsdata) => {
           
            return res.status(200).json({
                success:true,
                data: results,
                admin:resultsdata,
                detail: ""
              });



        });


 }else{

            return res.status(200).json({
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
                        return res.status(401).json({
                            success: false,
                            data: [],
                            detail: "Invalid username or password."

                        });
                    }
                    if (data) {

                        
        results.password=undefined;
        const jsontoken = sign({ result: results },process.env.TOKEN_SECRET, { expiresIn: '9h' });
        const planexpiry='2022-06-14';
        var firstname=test[0].firstname;
        if(test[0].lastname){
         firstname=test[0].firstname +' '+ test[0].lastname;
        }
        var obj = [];
        obj.push({ "token": jsontoken,"planExpiryDate":planexpiry });

                    return res.status(200).json({
                        success: true,
                        data: obj,
                        companyname: test[0].companyname,
                        name: firstname,
                        roleid: test[0].role_id,
                        detail: "Logged IN"
    });
}else{

    return res.status(401).json({
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
// Signup User Web
addsubscriptions: (req, res) => {
    const body = req.body;
    body.orderid=randomstring.generate(7);
    addsubscriptionsid(body, (err, results) => {
       
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                data: results,
                detail: "Connection Error."

            });
        }

        if (!results){
            return res.status(500).json({
                success: false,
                data: results,
                detail: "Invalid username or password."

            });
        }

        if (results) {
            res.status(200).json({ message: "Mail send", results: results,   data: results });
      /*  body.lid=1;
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
*/
    }

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
// Get Company employee
    companyuser: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;
        getusercompany(body, (err, results) => {
            if (err) {

                console.log(err);
              
            }



            
            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    detail: "No User Listed."

                });
            }


                

                return res.status(200).json({
                    success: true,
                    data: results
    
    
                });
    
    
    
         


   



        });

    },

  // Get All User
  billingdetail: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;
        getuserbiling(body, (err, results) => {
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
  // Get All User
  billingcompany: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;
        getuserbilingcompany(body, (err, results) => {
            if (err) {

            
              return res.status(500).json({
                    success: false,
                    data: [],
                    detail: "Connection Error."
                });
            }



            
         

            getplan(body, (err, resultsf) => {

                getsubscriptionidcreated(body, (err, resultsfy) => {
                if (err) {
                    console.log(err);
                    return;
    
                }

                return res.status(200).json({
                    success: true,
                    data: results,
                    plan:resultsf,
                    userfreeplan:resultsfy
    
    
                });
    
    
    
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
     body.orderid=randomstring.generate(7);
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

       body.punchInTime=moment(body.punchInTime).format('YYYY-MM-DD HH:mm:ss');
       checkiftodaydateexistuserid(body, (err, resultsd) => {

        if (err) {
             
            return res.status(500).json({
                success: false,
                data: [],
                detail: "Connection Error."

            });
        }

        if (resultsd.length === 0) {


        saveuserpunch(body, (err, results) => {
        getcpaturescrreninterval(body, (err, resultss) => {
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
          var resave = JSON.stringify(resultss);
           var testgetscrren = JSON.parse(resave);
   // const intimee=test.punch_in;
    const intimee=moment(test.punch_in).format('YYYY-MM-DD HH:mm:ss');
    var obj = [];
    obj.push({ "intime": intimee, "ScreenShortInterval": testgetscrren.screenshot_freq });
            return res.status(200).json({
                success:true,
                data: obj
              });



        });
        });
        }else{
            return res.status(200).json({
                success: false,
                data: [],
                detail: "User Already Punch IN Today."

            });


        }
        });

    },

// Save Break Stop
savebreakstop: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;

       body.endtime=moment(body.breakStopTime).format('YYYY-MM-DD HH:mm:ss');
       savebreakstopid(body, (err, results) => {
          
            if (err) {
               
              return res.status(500).json({
                    success: false,
                    data: [],
                    detail: "Connection Error."
                });
            }

            if (results) {
              
            var re = JSON.stringify(results);
            var test = JSON.parse(re);
           
            var now  = moment(test.endtime).format('DD/MM/YYYY HH:mm:ss');
            var then = moment(test.starttime).format('DD/MM/YYYY HH:mm:ss');
            var ms =  moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
     
         
    var obj = [];
    obj.push({ "time_invseted_break": ms });
            return res.status(200).json({
                success:true,
                data: obj
              });
            }else{
                return res.status(200).json({
                    success: false,
                    data: [],
                    detail: "No Time Listed."

                });
            }

            


        });

    },
    // Save Employee Break IN
    savebreakstart: (req, res) => {

        const body = req.body;

       body.userid=req.decoded.result[0].id;

       body.starttime=moment(body.breakStartTime).format('YYYY-MM-DD HH:mm:ss');
     
       savebreakstartid(body, (err, results) => {
    
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

       
   // const intimee=test.punch_in;
    const intimee=moment(test.starttime).format('YYYY-MM-DD HH:mm:ss');
    var obj = [];
    obj.push({ "savetime": intimee});
            return res.status(200).json({
                success:true,
                data: obj,
                detail: "Save Break Log Succesfully."
              });



  
        });
      


        
      

    },
     // Save Employee Punch IN
     savepunchout: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;

       body.puchOutTime=moment(body.puchOutTime).format('YYYY-MM-DD HH:mm:ss');
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

    },

// Edit Profile
usereditservice: (req, res) => {
    const body = req.body;
    body.userid=req.decoded.result[0].id;
if(body.companyname){
    useredit(body, (err, results) => {
       

        getcountry(body, (err, resultsdata) => {
            getstate(body, (err, resultsdatae) => {
                getsitesettings(body, (err, resultsetting) => {

            
        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            country:resultsdata,
            state:resultsdatae,
            settings:resultsetting,
            detail: "Your Profile has been updated succesfully."
          });

        }else{

            return res.status(200).json({
                success: false,
                data: [],
                detail: "No State Listed."

            });

        }
    });
    });
    });
     


        
       

    });

}else if(body.cpassword){

    const salt = genSaltSync(10);
      
    body.passwords = hashSync(body.cpassword, salt);
    passwordedit(body, (err, results) => {
       
       
        getcountry(body, (err, resultsdata) => {
            getstate(body, (err, resultsdatae) => {
                getsitesettings(body, (err, resultsetting) => {

            
        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            country:resultsdata,
            state:resultsdatae,
            settings:resultsetting,
            detail: "Password changed succesfully."
          });

        }else{

            return res.status(200).json({
                success: false,
                data: [],
                detail: "No State Listed."

            });

        }
    });
    });
    });
     


        
       

    });

}else{

  
    sitesettingedit(body, (err, results) => {


        getcountry(body, (err, resultsdata) => {
            getstate(body, (err, resultsdatae) => {
                getsitesettings(body, (err, resultsetting) => {

            
        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            country:resultsdata,
            state:resultsdatae,
            settings:resultsetting,
            detail: "Your Account Setting has been updated succesfully."
          });

        }else{

            return res.status(200).json({
                success: false,
                data: [],
                detail: "No State Listed."

            });

        }
    });
    });
    });
     


        
       

    });
}

},



// Edit Profile
viewdetailprofileservice: (req, res) => {
    const body = req.body;
    body.userid=body.id;
if(body.companyname){
   
    useredit(body, (err, results) => {

        getcountry(body, (err, resultsdata) => {
            getstate(body, (err, resultsdatae) => {
                getsitesettings(body, (err, resultsetting) => {
                    getattendence(body, (err, resultlogs) => {

            
        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            country:resultsdata,
            state:resultsdatae,
            settings:resultsetting,
            logss:resultlogs,
            id:body.userid+'?userfound=1',
            detail: ""
          });

        }else{

            return res.status(200).json({
                success: false,
                data: [],
                detail: "No State Listed.",
                id:body.userid

            });

        }
    });
    });
    });
    });
     


        
       

    });

}else if(body.cpassword){

    const salt = genSaltSync(10);
      
    body.passwords = hashSync(body.cpassword, salt);
    passwordedit(body, (err, results) => {
       
       
        getcountry(body, (err, resultsdata) => {
            getstate(body, (err, resultsdatae) => {
                getsitesettings(body, (err, resultsetting) => {
                    getattendence(body, (err, resultlogs) => {

            
        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            country:resultsdata,
            state:resultsdatae,
            settings:resultsetting,
            logss:resultlogs,
            id:body.userid+'?userfound=2',
            detail: "Password changed succesfully."
          });

        }else{

            return res.status(200).json({
                success: false,
                data: [],
                detail: "No State Listed.",
                id:body.userid

            });

        }
    });
    });
    });
    });
     


        
       

    });

}else{

  
    sitesettingedit(body, (err, results) => {


        getcountry(body, (err, resultsdata) => {
            getstate(body, (err, resultsdatae) => {
                getsitesettings(body, (err, resultsetting) => {

            
        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            country:resultsdata,
            state:resultsdatae,
            settings:resultsetting,
            detail: "Your Account Setting has been updated succesfully."
          });

        }else{

            return res.status(200).json({
                success: false,
                data: [],
                detail: "No State Listed."

            });

        }
    });
    });
    });
     


        
       

    });
}

},

datatransfer: (req, res) => {
  const body = req.body;
       console.log(body);
 body.userId=req.decoded.result[0].id;
var productivitycnt=body.productivityCount;
var applist=body.applist;
body.applist=JSON.stringify(applist);
body.capturetime=moment(body.capturetime).format('YYYY-MM-DD HH:mm:ss')
            datatransferid(body, (err, results) => {
            if (err) {
               console.log(err);
                return res.status(401).json({
                    success: false,
                    detail: "Data Inserted Error ,Try Again"

                });
            }
            var obj = [];
            obj.push({ "productivityCount": productivitycnt });
            return res.status(200).json({
                success: true,
                data: obj,
                detail: "Data Inserted"

            });


        });
        


},
breaklist: (req, res) => {
  
    const body = req.body;
    body.userid=req.decoded.result[0].id;

    breaklistget(body, (err, results) => {
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
                detail: "No Break Found."
            });
        }

        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            detail: "Break List"
          });

        }else{
            return res.status(500).json({
                success: false,
                data: [],
                detail: "No Break List."

            });

        }

    });

},
activeactivity: (req, res) => {
  
    const body = req.body;
    body.userid=req.decoded.result[0].id;

    activeactivityget(body, (err, results) => {
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
                detail: "No Activity Break Found."
            });
        }

        if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            detail: "Activity Break List"
          });

        }else{
            return res.status(500).json({
                success: false,
                data: [],
                detail: "No Activity Break List."

            });

        }

    });

},




productivityinfo: (req, res) => {
  
    const body = req.body;
    body.userid=req.decoded.result[0].id;

    let x = 60; //minutes interval
    let times = []; // time array
    let tt = 0; // start time
 
    
    //loop to increment the time and push results in array
    for (let i=0;tt<24*60; i++) {
        let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
        let sh=hh+1;
        let mm = (tt%60); // getting minutes of the hour in 0-55 format
      times[i] = ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00") + '-' + ("0" + (sh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00"); // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + x;
    }
    body.times=times;
    const startdate = new Date();
    body.startdate=moment(startdate).format('YYYY-MM-DD');


    getproductivityinfo(body, (err, results,totalproductinfo,totalidle) => {
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
                detail: "No Productivity Found."

            });
        }

        if (results) {

            if(totalproductinfo){


                var mstotalworkings = Math.floor(totalproductinfo % 3600 / 60);
                var mstotalworkingDisplays = mstotalworkings > 0 ? (mstotalworkings > 9 ? mstotalworkings : "0"+mstotalworkings) + (mstotalworkings == 1 ? "" : "") : "00";
                 var percentage=(Number(mstotalworkingDisplays)*100)/60;


                dtotalproductinfo = Number(totalproductinfo);
                var htotalproductinfo = Math.floor(dtotalproductinfo / 3600);
                var mtotalproductinfo = Math.floor(dtotalproductinfo % 3600 / 60);
                
                var totalproductinfoDisplay = htotalproductinfo > 0 ? (htotalproductinfo > 9 ? htotalproductinfo : "0"+htotalproductinfo) + (htotalproductinfo == 1 ? "" : "") : "00";
                var mtotalproductinfoDisplay = mtotalproductinfo > 0 ? (mtotalproductinfo > 9 ? mtotalproductinfo : "0"+mtotalproductinfo) + (mtotalproductinfo == 1 ? "" : "") : "00";
 



               var totalworking=totalproductinfo+totalidle;
               dtotalworking = Number(totalworking);
              
               var htotalworking = Math.floor(dtotalworking / 3600);
            
               var mtotalworking = Math.floor(dtotalworking % 3600 / 60);
               
               var totalworkingDisplay = htotalworking > 0 ? (htotalworking > 9 ? htotalworking : "0"+htotalworking) + (htotalworking == 1 ? "" : "") : "00";
             
               var mtotalworkingDisplay = mtotalworking > 0 ? (mtotalworking > 9 ? mtotalworking : "0"+mtotalworking) + (mtotalworking == 1 ? "" : "") : "00";
              
               dtotalidle = Number(totalidle);
               var htotalidle = Math.floor(dtotalidle / 3600);
               var mtotalidle = Math.floor(dtotalidle % 3600 / 60);
               
    var totalidleDisplay = htotalidle > 0 ? htotalidle + (htotalidle == 1 ? "" : "") : "00";
    var mtotalidleDisplay = mtotalidle > 0 ? (mtotalidle > 9 ? mtotalidle : "0"+mtotalidle) + (mtotalidle == 1 ? "" : "") : "00";





            }else{
                var totalworking="";
                var totalworkingDisplay="00";
                var mtotalworkingDisplay="00";
                var percentage="0";
            }

            percentage=Math.round(percentage);

        return res.status(200).json({
            success:true,
            data: results,
            totalproductivity: totalproductinfoDisplay+':'+mtotalproductinfoDisplay,
            totalidle: totalidleDisplay+':'+mtotalidleDisplay,
            totalworking: totalworkingDisplay+':'+mtotalworkingDisplay,
            totalproductivitypercentage: percentage+' %',
            detail: "Productivity Info"
          });

        }else{
            return res.status(500).json({
                success: false,
                data: [],
                detail: "No Productivity Listed."

            });

        }

    });

},


// Add Company User

    addcompanyuser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.passwords = hashSync(body.cpassword, salt);
        body.role_id=3;
       
        checkifemailexist(body, (err, result) => {
  if (err) {
    console.log(err);
                return res.status(500).json({
                    success: false,
                    data: [],
                    detail: "Connection Error."

                });
            }

            
        if (result.length === 0) {
            body.userid=req.decoded.result[0].id;
            
            getselectedcompanydetail(body, (err, resultsdata) => {
                body.plan_id=resultsdata.plan_id;
                body.country_id=resultsdata.country_id;
                body.state_id=resultsdata.state_id;
                body.parent_id=body.userid;
            addcompanyuserid(body, (err, results) => {
           
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    data: 'resultsdata',
                    detail: "Connection Error."

                });
            }

            if (!results){
                return res.status(500).json({
                    success: false,
                    data: '',
                    detail: "Add User Error , Please Try Again."

                });
            }

if(results) {
   
            body.lid=3;
            getemailtemplate(body, (err, resultsf) => {
                getusercompany(body, (err, resultsd) => {
        //  console.log(resultsf);
                var ure = JSON.stringify(resultsf);
                var utest = JSON.parse(ure);
              
             
        var replacements = {
            "%Name%": body.email,
            "%Email%": body.email,
            "%Password%": body.cpassword
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


                    res.status(200).json({ message: "Mail send", message_id: info.messageId,   data: resultsd });
                });
    
    
    
            });
            });

        }

        });
        });
    }else{

        return res.status(500).json({
            success: false,
            data: '',
            detail: "Email Already Exist."

        });

    }

    });
    },





    
}