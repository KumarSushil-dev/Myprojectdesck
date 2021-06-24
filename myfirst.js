require("dotenv").config();
const express = require('express');
const request = require('request');
var Firebase = require('firebase');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
var path = require('path');
const moment = require("moment");
const { ToWords } = require('to-words');
const  Razorpay  = require('razorpay');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var $           = require('jquery');  
var {check,validationResult} = require('express-validator');  
const puppeteer = require("puppeteer"); // will automatically load the node version

//set up express app
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets', express.static('assets'));
app.use('/theme-assets', express.static('theme-assets'));
app.use('/jquery', express.static('node_modules/jquery/dist/'));
app.use('/uploads', express.static('uploads'));
app.use('/admin', express.static('views/admin'));
app.use('/pages', express.static('views/pages'));
app.use(cookieParser());

const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
    }
  });

  const rzp = new Razorpay({
    key_id: "rzp_test_ZL1wkQfxNIacl5",
    key_secret: "WcApSUvwtcDKO6dFiCtLCshu",
   });


app.locals.moment = moment;
app.locals.fs = fs;
app.locals.toWords = toWords;
var jsonParser = bodyParser.json({'limit':'500MB'})
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '500MB', extended: true });

// parse application/json

app.use(session({
    secret: 'streamserver',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//intilize routes
//app.use('/api/users', urlencodedParser, require('./api/routes/user.router'));
app.use('/api/users', jsonParser, require('./api/routes/user.router'));
app.use('/app', urlencodedParser, require('./api/routes/user.router'));
app.use('/api/plans', jsonParser, require('./api/routes/plan.router'));
app.use('/api/plans', urlencodedParser, require('./api/routes/plan.router'));
app.use('/api/emailtemplate', jsonParser, require('./api/routes/emailtemplate.router'));
app.use('/api/emailtemplate', urlencodedParser, require('./api/routes/emailtemplate.router'));
app.use('/api/staticpages', jsonParser, require('./api/routes/staticpages.router'));
app.use('/api/staticpages', urlencodedParser, require('./api/routes/staticpages.router'));



app.get('/', (req, res) => {
    res.send('Hello World!')
  })
       
// Login 


app.get('/login', function(req, res) {

    sess = req.session;

    if (sess.email) {
        res.render('admin/dashboard');
    }

    res.render('users/login');
});

// Logout
app.get('/logout', (req, res) => {
    sess = req.session;

    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/login');
    });

});

app.post('/login', urlencodedParser, (req, res) => {
  
   var body = req.body;

    request.post({
            url: process.env.APP_URL + '/api/users/login',
            body: req.body,
            json: true
        },

        function(error, response, body) {
            if (response.statusCode == 401) {
                var data = response.body;
                req.flash("error", "Failed to log in user account: User account not found.");
                res.locals.messages = req.flash();
                res.render('users/login');
            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var test = JSON.parse(re);
         
            sess = req.session;
            sess.token = test.data[0].token;
            sess.companyname = test.companyname;
            sess.roleid = test.roleid;
            res.render('admin/dashboard', { person: sess.companyname,roleid :sess.roleid  });
            res.end;
            }else{
            res.sendStatus(500);
                return;
               }

        })

});


// Dashboard
app.get('/dashboard', function(req, res) {

    sess = req.session;
    if (sess.companyname && sess.token!='') {
        res.render('admin/dashboard', { person: sess.companyname,roleid :sess.roleid });
    } else {

        res.render('users/login');
    }
});







//users list


app.get('/userlist', urlencodedParser, function(req, res) {
    sess = req.session;
    console.log(sess);
    const token = sess.token;
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/userlist',
                    body: { "companyname": sess.companyname },
                    json: true
                },
           function(error, response, body) {

          
                   if (response.statusCode == 500) {
                        var data = response.body;

                        req.flash("error", "Failed to log in user account: User account not found.");
                        res.locals.messages = req.flash();
                        res.render('users/login');
                    } else if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
          
                        sess = req.session;
                      res.render('admin/userlist', { person: sess.companyname, userlist: datas,roleid :sess.roleid  });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    } 

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
});

// Biling Detail

app.get('/billingdetail', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/billingdetail',
                    body: { "companyname": sess.companyname },
                    json: true
                },
           function(error, response, body) {

          
                   if (response.statusCode == 500) {
                        var data = response.body;

                        req.flash("error", "Failed to log in user account: User account not found.");
                        res.locals.messages = req.flash();
                        res.render('users/login');
                    } else if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                        sess = req.session;
                      res.render('admin/billingdetail', { person: sess.companyname, userlist: datas,roleid :sess.roleid  });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    } 

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
});

// Order Invoice Detail

app.get('/orderinvoice', urlencodedParser, function(req, res) {
    sess = req.session;
if(req.query.userfound){
    var userfound = req.query.userfound;
}else{
    var userfound=0;
}
    const token = sess.token;
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/billingcompany',
                    body: { "companyname": sess.companyname },
                    json: true
                },
           function(error, response, body) {

          
                   if (response.statusCode == 500) {
                        var data = response.body;

                        req.flash("error", "Failed to log in user account: User account not found.");
                        res.locals.messages = req.flash();
                        res.render('users/login');
                    } else if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                        console.log(datas);
if(userfound==1){
    req.flash("error", "Payment Succesfully completed with selected plan. You Can Proceed Now.");
    res.locals.messages = req.flash();
}else if(userfound==2){
    req.flash("error", "Payment Declined with selected plan.Please try again later !");
    res.locals.messages = req.flash();
}
                        sess = req.session;
                      res.render('admin/orderinvoice', { person: sess.companyname, userlist: datas,roleid :sess.roleid });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    } 

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
});


// Company Upgrade Plan


app.post('/planupgrade', urlencodedParser, (req, res) => {
    var body = req.body;
    sess = req.session;
    const token = sess.token;
    if (sess.companyname && sess.token!='') {
    
    request.post({
        headers: {
            'Authorization': `Bearer ${token}`
          },
            url: process.env.APP_URL + '/api/users/planupgrades',
            body: req.body,
            json: true
        },
        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
             
            req.flash("error", "Plan Cannot Upgarded ,Please Try Again.");
            res.locals.messages = req.flash();
              
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                res.render('admin/userlist', { person: sess.companyname,userlist: datas,roleid :sess.roleid  });
            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var datas = JSON.parse(re);
       
        
        req.flash("error", "Plan Upgraded Succesfully For Selected Company.");
        res.locals.messages = req.flash();
       
         res.render('admin/userlist', { person: sess.companyname,userlist: datas,roleid :sess.roleid  });

            
            res.end;

            }else{

                //do something with error
                // res.redirect('/charge-error');
                //or
                res.sendStatus(500);
                return;


            }

        });

    }else {

        res.render('users/login');
    }

});




// Company List Active / Inactive


app.get('/userupdatestatus/:id/:name', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    names = req.params.name;
   
    const token = sess.token;
    if (sess.token!='') {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/userupdatestatus',
                    body: {"id":ids,"name":names },
                    json: true
                },

                function(error, response, body) {
                    if (response.statusCode == 500) {
                        var data = response.body;

                        req.flash("error", "Failed to log in user account: User account not found.");
                        res.locals.messages = req.flash();
                        res.render('users/login');
                    } else if (!error && response.statusCode == 200){
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var test = JSON.parse(re);
                       
                        sess = req.session;
                      //  console.log(sess);
                      req.flash("error", "Company Status has been Updated Successfully.");
                      res.locals.messages = req.flash();
                      res.render('admin/userlist', { person: sess.companyname,userlist: test,roleid :sess.roleid  });
                      res.end;

                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    }

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
});

// Delete User


app.get('/userupdatedelete/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    const token = sess.token;
    if (sess.token!='') {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/userdeletesuper',
                    body: {"id":ids },
                    json: true
                },

                function(error, response, body) {
                    if (response.statusCode == 500) {
                        var data = response.body;

                        req.flash("error", "Failed to log in user account: User account not found.");
                        res.locals.messages = req.flash();
                        res.render('users/login');
                    } else if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                        sess = req.session;

                        req.flash("error", "Company details Deleted Successfully.");
                        res.locals.messages = req.flash();

                        res.render('admin/userlist', { person: sess.companyname,userlist: datas,roleid :sess.roleid  });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    }

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
});


// Signup 

app.get('/signup', function(req, res) {
    var countrylist ='';
  // Country
  request.get({
        url: process.env.APP_URL + '/api/users/countrylist',
        body: { "country": 'select' },
        json: true
    },
function(error, response, body) {


    if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var countrylist = JSON.parse(re);
           res.render('users/signup', { country: countrylist });
         }  

    });


    res.end;
});



app.post('/signup', urlencodedParser, (req, res) => {
    var body = req.body;
    request.post({
            url: process.env.APP_URL + '/api/users/signupweb',
            body: req.body,
            json: true
        },
        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
             
                req.flash("error", "This email is already Registered. Please use a unique Email Address.");
                res.locals.messages = req.flash();
                var re = JSON.stringify(data);
                var countrylist = JSON.parse(re);
               res.render('users/signup', { country: countrylist });
            } else if (!error && response.statusCode == 200) {
            var data = response.body;

       
        
            req.flash("error", "Please click on the link that has just been sent to your email account to verify your email and continue with given Login Credentials.");
          
         res.locals.messages = req.flash();
         var re = JSON.stringify(data);
         var countrylist = JSON.parse(re);
        res.render('users/signup', { country: countrylist });

            
            res.end;

            }else{

                //do something with error
                // res.redirect('/charge-error');
                //or
                res.sendStatus(500);
                return;


            }

        });

});

// Plan List

app.get('/plan', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/plans/planlist',
                    body: { "companyname": sess.companyname },
                    json: true
                },
           function(error, response, body) {

           if (response.statusCode == 500) {
                        var data = response.body;

                        req.flash("error", "Failed to log in user account: User account not found.");
                        res.locals.messages = req.flash();
                        res.render('users/login');
                    } else if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                        sess = req.session;
                      res.render('admin/plan', { person: sess.companyname, plan: datas,roleid :sess.roleid  });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    } 

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
});

// Add Plan 
app.get('/planadd', function(req, res) {

sess = req.session;
const token = sess.token;
if(sess.companyname!="" && sess.token!=''){  
res.render('admin/planadd', { person: sess.companyname,roleid :sess.roleid  });
res.end;
}
 //  res.render('users/login');
});

// Add Plan Post
app.post('/planadd', urlencodedParser, (req, res) => {
sess = req.session;
const token = sess.token;
var body = req.body;

    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
        // this code will only run when time has ellapsed
        
            request.post({
            headers: {
                    'Authorization': `Bearer ${token}`
            },
             url: process.env.APP_URL + '/api/plans/planaddservice',
             body: req.body,
             json: true
        },

        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
           
                req.flash("error", "Add Plan Error.Try Again Later");
                res.locals.messages = req.flash();
                res.redirect(process.env.APP_URL + '/plan');

            } else if (!error && response.statusCode == 200) {
                
            var data = response.body;
            var re = JSON.stringify(data);
            var test = JSON.parse(re);
         
            sess = req.session;
            req.flash("error", "Your Plan has been added Successfully.");
            res.locals.messages = req.flash();
         
            res.render('admin/plan', { person: sess.companyname,plan: test,roleid :sess.roleid  });
           
            res.end;

            }else{

                //do something with error
                // res.redirect('/charge-error');
                //or
                res.sendStatus(500);
                return;


            }

        });
    }, 0000);
    }

});

    app.get('/planedit/:id', urlencodedParser, function(req, res) {
        sess = req.session;
        id = req.params.id;
        const token = sess.token;
        if(id && sess.token!='') {
            setTimeout(function() {
             
        request.post({
                     headers: {
                     'Authorization': `Bearer ${token}`
                     },
                    url: process.env.APP_URL + '/api/plans/planeditshow',
                    body: { "id": id },
                    json: true
                    },
                    function(error, response, body) {
                        if (response.statusCode == 500) {
                            var data = response.body;
    
                            req.flash("error", "Id not Found Plan.Try Again Later");
                            res.locals.messages = req.flash();
                            res.redirect(process.env.APP_URL + '/plan');
                        } else if (!error && response.statusCode == 200) {
                            var data = response.body;
                            var re = JSON.stringify(data);
                            var test = JSON.parse(re);
                   
                           
                            sess = req.session;
                            if(test.data.id){
                           
                    sess = req.session;
                       
                    res.render('admin/planedit', { person: sess.companyname, plan: test,roleid :sess.roleid  });
                            res.end;
    
                            }else{
                                req.flash("error", "Id not Found Plan.Try Again Later");
                                res.locals.messages = req.flash();
                                res.redirect(process.env.APP_URL + '/plan');
                                res.end;
                            }
                        } else {
                            req.flash("error", "Id not Found Plan.Try Again Later");
                res.locals.messages = req.flash();
                res.redirect(process.env.APP_URL + '/plan');
                            res.end;
    
    
                        }
    
                    });
    
            }, 0000);
    
    
        } else {
    
            res.render('users/login');
        }
    }); 
    





    
    // Edit Plan Post
    app.post('/planedit', urlencodedParser, (req, res) => {
    sess = req.session;
    const token = sess.token;
    var body = req.body;
    if (sess.companyname && sess.token!='') {
            setTimeout(function() {
            // this code will only run when time has ellapsed
                request.post({
                headers: {
                'Authorization': `Bearer ${token}`
                },
                url: process.env.APP_URL + '/api/plans/planeditservice',
                body: req.body,
                json: true
            },
    
            function(error, response, body) {
                if (response.statusCode == 500) {
                    var data = response.body;
               
                    req.flash("error", "Error While updated Plan Successfully.");
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/plan');
    
                } else if (!error && response.statusCode == 200) {
                    
                var data = response.body;
                var re = JSON.stringify(data);
                var test = JSON.parse(re);
             
                sess = req.session;
                req.flash("error", "Your Plan has been Updated Successfully.");
                res.locals.messages = req.flash();
                res.render('admin/plan', { person: sess.companyname,plan: test,roleid :sess.roleid  });
                
                res.end;
    
                }else{
    
                    //do something with error
                    // res.redirect('/charge-error');
                    //or
                    res.sendStatus(500);
                    return;
    
    
                }
    
            });
        }, 0000);
        }
    
    });
    

    app.get('/planupdatestatus/:id/:name', urlencodedParser, function(req, res) {
        sess = req.session;
        ids = req.params.id;
        names = req.params.name;
       
        const token = sess.token;
        if (sess.token!='') {
            setTimeout(function() {
                // this code will only run when time has ellapsed
                request.post({
                    headers: {
                        'Authorization': `Bearer ${token}`
                      },
                        url: process.env.APP_URL + '/api/plans/planupdatestatus',
                        body: {"id":ids,"name":names },
                        json: true
                    },
    
                    function(error, response, body) {
                        if (response.statusCode == 500) {
                            var data = response.body;
    
                                 
                    req.flash("error", "Error While updated Plan Successfully.");
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/plan');
                        } else if (!error && response.statusCode == 200){
                            var data = response.body;
                            var re = JSON.stringify(data);
                            var test = JSON.parse(re);
                           
                           
                            sess = req.session;
                          //  console.log(sess);
    
                          req.flash("error", "Your Plan Status has been Update Successfully.");
                          res.locals.messages = req.flash();
                          res.render('admin/plan', { person: sess.companyname,plan: test,roleid :sess.roleid  });
    
                          
                            res.end;
                        } else {
    
                            //do something with error
                            // res.redirect('/charge-error');
                            //or
                            res.sendStatus(500);
                            return;
    
    
                        }
    
                    });
    
            }, 0000);
    
    
        } else {
    
            res.render('users/login');
        }
    });
    
    // Delete User
    
    
    app.get('/planupdatedelete/:id', urlencodedParser, function(req, res) {
        sess = req.session;
        ids = req.params.id;
        const token = sess.token;
        if (sess.token!='') {
            setTimeout(function() {
                // this code will only run when time has ellapsed
                request.post({
                    headers: {
                        'Authorization': `Bearer ${token}`
                      },
                        url: process.env.APP_URL + '/api/plans/plandeletesuper',
                        body: {"id":ids },
                        json: true
                    },
    
                    function(error, response, body) {
                        if (response.statusCode == 500) {
                            var data = response.body;
    
                         
                            req.flash("error", "Error While updated Plan Successfully.");
                            res.locals.messages = req.flash();
                            res.redirect(process.env.APP_URL + '/plan');
                        } else if (!error && response.statusCode == 200) {
                            var data = response.body;
                            var re = JSON.stringify(data);
                            var test = JSON.parse(re);
                            sess = req.session;
                            req.flash("error", "Your Plan Detail Deleted Successfully.");
                            res.locals.messages = req.flash();
                            res.render('admin/plan', { person: sess.companyname,plan: test,roleid :sess.roleid  });
                            res.end;
                        } else {
    
                            //do something with error
                            // res.redirect('/charge-error');
                            //or
                            res.sendStatus(500);
                            return;
    
    
                        }
    
                    });
    
            }, 0000);
    
    
        } else {
    
            res.render('users/login');
        }
    });




// Email Template



app.get('/emailtemplate', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/emailtemplate/emailtemplatelist',
                    body: { "companyname": sess.companyname },
                    json: true
                },
           function(error, response, body) {

           if (response.statusCode == 500) {
                        var data = response.body;

                        req.flash("error", "Failed to log in user account: User account not found.");
                        res.locals.messages = req.flash();
                        res.render('users/login');
                    } else if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                        sess = req.session;
                      res.render('admin/emailtemplate', { person: sess.companyname, emailtemplate: datas,roleid :sess.roleid  });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    } 

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
});

// Add Plan 
app.get('/emailtemplateadd', function(req, res) {

sess = req.session;
const token = sess.token;
if(sess.companyname!="" && sess.token!=''){  
res.render('admin/emailtemplateadd', { person: sess.companyname,roleid :sess.roleid  });
res.end;
}
 //  res.render('users/login');
});

// Add Plan Post
app.post('/emailtemplateadd', urlencodedParser, (req, res) => {
sess = req.session;
const token = sess.token;
var body = req.body;

    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
        // this code will only run when time has ellapsed
        
            request.post({
            headers: {
                    'Authorization': `Bearer ${token}`
            },
             url: process.env.APP_URL + '/api/emailtemplate/emailtemplateaddservice',
             body: req.body,
             json: true
        },

        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
           
                req.flash("error", "Add Email template Error.Try Again Later");
                res.locals.messages = req.flash();
                res.redirect(process.env.APP_URL + '/emailtemplate');

            } else if (!error && response.statusCode == 200) {
                
            var data = response.body;
            var re = JSON.stringify(data);
            var test = JSON.parse(re);
         
            sess = req.session;
            req.flash("error", "Your emailtemplate has been added Successfully.");
            res.locals.messages = req.flash();
         
            res.render('admin/emailtemplate', { person: sess.companyname,emailtemplate: test,roleid :sess.roleid  });
           
            res.end;

            }else{

                //do something with error
                // res.redirect('/charge-error');
                //or
                res.sendStatus(500);
                return;


            }

        });
    }, 0000);
    }

});

    app.get('/emailtemplateedit/:id', urlencodedParser, function(req, res) {
        sess = req.session;
        id = req.params.id;
        const token = sess.token;
        if(id && sess.token!='') {
            setTimeout(function() {
             
        request.post({
                     headers: {
                     'Authorization': `Bearer ${token}`
                     },
                    url: process.env.APP_URL + '/api/emailtemplate/emailtemplateeditshow',
                    body: { "id": id },
                    json: true
                    },
                    function(error, response, body) {
                        if (response.statusCode == 500) {
                            var data = response.body;
    
                            req.flash("error", "Id not Found emailtemplate.Try Again Later");
                            res.locals.messages = req.flash();
                            res.redirect(process.env.APP_URL + '/emailtemplate');
                        } else if (!error && response.statusCode == 200) {
                            var data = response.body;
                            var re = JSON.stringify(data);
                            var test = JSON.parse(re);
                   
                           
                            sess = req.session;
                            if(test.data.id){
                           
                    sess = req.session;
                       
                    res.render('admin/emailtemplateedit', { person: sess.companyname, emailtemplate: test,roleid :sess.roleid  });
                            res.end;
    
                            }else{
                                req.flash("error", "Id not Found emailtemplate.Try Again Later");
                                res.locals.messages = req.flash();
                                res.redirect(process.env.APP_URL + '/emailtemplate');
                                res.end;
                            }
                        } else {
                            req.flash("error", "Id not Found emailtemplate.Try Again Later");
                res.locals.messages = req.flash();
                res.redirect(process.env.APP_URL + '/emailtemplate');
                            res.end;
    
    
                        }
    
                    });
    
            }, 0000);
    
    
        } else {
    
            res.render('users/login');
        }
    }); 
    





    
    // Edit Plan Post
    app.post('/emailtemplateedit', urlencodedParser, (req, res) => {
    sess = req.session;
    const token = sess.token;
    var body = req.body;
    if (sess.companyname && sess.token!='') {
            setTimeout(function() {
            // this code will only run when time has ellapsed
                request.post({
                headers: {
                'Authorization': `Bearer ${token}`
                },
                url: process.env.APP_URL + '/api/emailtemplate/emailtemplateeditservice',
                body: req.body,
                json: true
            },
    
            function(error, response, body) {
                if (response.statusCode == 500) {
                    var data = response.body;
               
                    req.flash("error", "Error While updated emailtemplate Successfully.");
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/emailtemplate');
    
                } else if (!error && response.statusCode == 200) {
                    
                var data = response.body;
                var re = JSON.stringify(data);
                var test = JSON.parse(re);
             
                sess = req.session;
                req.flash("error", "Your emailtemplate has been Updated Successfully.");
                res.locals.messages = req.flash();
                res.render('admin/emailtemplate', { person: sess.companyname,emailtemplate: test,roleid :sess.roleid  });
                
                res.end;
    
                }else{
    
                    //do something with error
                    // res.redirect('/charge-error');
                    //or
                    res.sendStatus(500);
                    return;
    
    
                }
    
            });
        }, 0000);
        }
    
    });
    

    app.get('/emailtemplateupdatestatus/:id/:name', urlencodedParser, function(req, res) {
        sess = req.session;
        ids = req.params.id;
        names = req.params.name;
       
        const token = sess.token;
        if (sess.token!='') {
            setTimeout(function() {
                // this code will only run when time has ellapsed
                request.post({
                    headers: {
                        'Authorization': `Bearer ${token}`
                      },
                        url: process.env.APP_URL + '/api/emailtemplate/emailtemplateupdatestatus',
                        body: {"id":ids,"name":names },
                        json: true
                    },
    
                    function(error, response, body) {
                        if (response.statusCode == 500) {
                            var data = response.body;
    
                                 
                    req.flash("error", "Error While updated emailtemplate Successfully.");
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/emailtemplate');
                        } else if (!error && response.statusCode == 200){
                            var data = response.body;
                            var re = JSON.stringify(data);
                            var test = JSON.parse(re);
                           
                           
                            sess = req.session;
                          //  console.log(sess);
    
                          req.flash("error", "Your emailtemplate Status has been Update Successfully.");
                          res.locals.messages = req.flash();
                          res.render('admin/emailtemplate', { person: sess.companyname,emailtemplate: test,roleid :sess.roleid  });
    
                          
                            res.end;
                        } else {
    
                            //do something with error
                            // res.redirect('/charge-error');
                            //or
                            res.sendStatus(500);
                            return;
    
    
                        }
    
                    });
    
            }, 0000);
    
    
        } else {
    
            res.render('users/login');
        }
    });
    
    // Delete User
    
    
    app.get('/emailtemplateupdatedelete/:id', urlencodedParser, function(req, res) {
        sess = req.session;
        ids = req.params.id;
        const token = sess.token;
        if (sess.token!='') {
            setTimeout(function() {
                // this code will only run when time has ellapsed
                request.post({
                    headers: {
                        'Authorization': `Bearer ${token}`
                      },
                        url: process.env.APP_URL + '/api/emailtemplate/emailtemplatedeletesuper',
                        body: {"id":ids },
                        json: true
                    },
    
                    function(error, response, body) {
                        if (response.statusCode == 500) {
                            var data = response.body;
    
                         
                            req.flash("error", "Error While updated emailtemplate Successfully.");
                            res.locals.messages = req.flash();
                            res.redirect(process.env.APP_URL + '/emailtemplate');
                        } else if (!error && response.statusCode == 200) {
                            var data = response.body;
                            var re = JSON.stringify(data);
                            var test = JSON.parse(re);
                            sess = req.session;
                            req.flash("error", "Your emailtemplate Detail Deleted Successfully.");
                            res.locals.messages = req.flash();
                            res.render('admin/emailtemplate', { person: sess.companyname,emailtemplate: test,roleid :sess.roleid  });
                            res.end;
                        } else {
    
                            //do something with error
                            // res.redirect('/charge-error');
                            //or
                            res.sendStatus(500);
                            return;
    
    
                        }
    
                    });
    
            }, 0000);
    
    
        } else {
    
            res.render('users/login');
        }
    });




// Static Pages Template



app.get('/staticpages', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/staticpages/staticpageslist',
                    body: { "companyname": sess.companyname },
                    json: true
                },
           function(error, response, body) {
console.log(error);
           if (response.statusCode == 500) {
                        var data = response.body;

                        req.flash("error", "Failed to log in user account: User account not found.");
                        res.locals.messages = req.flash();
                        res.render('users/login');
                    } else if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                        sess = req.session;
                      res.render('admin/staticpages', { person: sess.companyname, staticpages: datas,roleid :sess.roleid  });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    } 

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
});

// Add Plan 
app.get('/staticpagesadd', function(req, res) {

sess = req.session;
const token = sess.token;
if(sess.companyname!="" && sess.token!=''){  
res.render('admin/staticpagesadd', { person: sess.companyname,roleid :sess.roleid  });
res.end;
}
 //  res.render('users/login');
});

// Add Plan Post
app.post('/staticpagesadd', urlencodedParser, (req, res) => {
sess = req.session;
const token = sess.token;
var body = req.body;

    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
        // this code will only run when time has ellapsed
        
            request.post({
            headers: {
                    'Authorization': `Bearer ${token}`
            },
             url: process.env.APP_URL + '/api/staticpages/staticpagesaddservice',
             body: req.body,
             json: true
        },

        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
           
                req.flash("error", "Add staticpages Error.Try Again Later");
                res.locals.messages = req.flash();
                res.redirect(process.env.APP_URL + '/staticpages');

            } else if (!error && response.statusCode == 200) {
                
            var data = response.body;
            var re = JSON.stringify(data);
            var test = JSON.parse(re);
         
            sess = req.session;
            req.flash("error", "Your staticpages  has been added Successfully.");
            res.locals.messages = req.flash();
         
            res.render('admin/staticpages', { person: sess.companyname,staticpages: test,roleid :sess.roleid  });
           
            res.end;

            }else{

                //do something with error
                // res.redirect('/charge-error');
                //or
                res.sendStatus(500);
                return;


            }

        });
    }, 0000);
    }

});

    app.get('/staticpagesedit/:id', urlencodedParser, function(req, res) {
        sess = req.session;
        id = req.params.id;
        const token = sess.token;
        if(id && sess.token!='') {
            setTimeout(function() {
             
        request.post({
                     headers: {
                     'Authorization': `Bearer ${token}`
                     },
                    url: process.env.APP_URL + '/api/staticpages/staticpageseditshow',
                    body: { "id": id },
                    json: true
                    },
                    function(error, response, body) {
                        if (response.statusCode == 500) {
                            var data = response.body;
    
                            req.flash("error", "Id not Found staticpages.Try Again Later");
                            res.locals.messages = req.flash();
                            res.redirect(process.env.APP_URL + '/staticpages');
                        } else if (!error && response.statusCode == 200) {
                            var data = response.body;
                            var re = JSON.stringify(data);
                            var test = JSON.parse(re);
                   
                    
                            sess = req.session;
                           
                            console.log(test);     
                    sess = req.session;
                       
                    res.render('admin/staticpagesedit', { person: sess.companyname, staticpages: test,roleid :sess.roleid  });
                            res.end;
    
                           
                        } else {
                            req.flash("error", "Id not Found staticpages.Try Again Later");
                res.locals.messages = req.flash();
                res.redirect(process.env.APP_URL + '/staticpages');
                            res.end;
    
    
                        }
    
                    });
    
            }, 0000);
    
    
        } else {
    
            res.render('users/login');
        }
    }); 
    





    
    // Edit Plan Post
    app.post('/staticpagesedit', urlencodedParser, (req, res) => {
    sess = req.session;
    const token = sess.token;
    var body = req.body;
    if (sess.companyname && sess.token!='') {
            setTimeout(function() {
            // this code will only run when time has ellapsed
                request.post({
                headers: {
                'Authorization': `Bearer ${token}`
                },
                url: process.env.APP_URL + '/api/staticpages/staticpageseditservice',
                body: req.body,
                json: true
            },
    
            function(error, response, body) {
                if (response.statusCode == 500) {
                    var data = response.body;
               
                    req.flash("error", "Error While updated staticpages Successfully.");
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/staticpages');
    
                } else if (!error && response.statusCode == 200) {
                    
                var data = response.body;
                var re = JSON.stringify(data);
                var test = JSON.parse(re);
            
                sess = req.session;
                req.flash("error", "Your staticpages has been Updated Successfully.");
                res.locals.messages = req.flash();
                res.render('admin/staticpages', { person: sess.companyname,staticpages: test,roleid :sess.roleid  });
                
                res.end;
    
                }else{
    
                    //do something with error
                    // res.redirect('/charge-error');
                    //or
                    res.sendStatus(500);
                    return;
    
    
                }
    
            });
        }, 0000);
        }
    
    });
    

    app.get('/staticpagesupdatestatus/:id/:name', urlencodedParser, function(req, res) {
        sess = req.session;
        ids = req.params.id;
        names = req.params.name;
       
        const token = sess.token;
        if (sess.token!='') {
            setTimeout(function() {
                // this code will only run when time has ellapsed
                request.post({
                    headers: {
                        'Authorization': `Bearer ${token}`
                      },
                        url: process.env.APP_URL + '/api/staticpages/staticpagesupdatestatus',
                        body: {"id":ids,"name":names },
                        json: true
                    },
    
                    function(error, response, body) {
                        if (response.statusCode == 500) {
                            var data = response.body;
    
                                 
                    req.flash("error", "Error While updated staticpages Successfully.");
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/staticpages');
                        } else if (!error && response.statusCode == 200){
                            var data = response.body;
                            var re = JSON.stringify(data);
                            var test = JSON.parse(re);
                           
                           
                            sess = req.session;
                          //  console.log(sess);
    
                          req.flash("error", "Your staticpages Status has been Update Successfully.");
                          res.locals.messages = req.flash();
                          res.render('admin/staticpages', { person: sess.companyname,staticpages: test,roleid :sess.roleid  });
    
                          
                            res.end;
                        } else {
    
                            //do something with error
                            // res.redirect('/charge-error');
                            //or
                            res.sendStatus(500);
                            return;
    
    
                        }
    
                    });
    
            }, 0000);
    
    
        } else {
    
            res.render('users/login');
        }
    });
    
    // Delete User
    
    
    app.get('/staticpagesupdatedelete/:id', urlencodedParser, function(req, res) {
        sess = req.session;
        ids = req.params.id;
        const token = sess.token;
        if (sess.token!='') {
            setTimeout(function() {
                // this code will only run when time has ellapsed
                request.post({
                    headers: {
                        'Authorization': `Bearer ${token}`
                      },
                        url: process.env.APP_URL + '/api/staticpages/staticpagesdeletesuper',
                        body: {"id":ids },
                        json: true
                    },
    
                    function(error, response, body) {
                        if (response.statusCode == 500) {
                            var data = response.body;
    
                         
                            req.flash("error", "Error While updated staticpages Successfully.");
                            res.locals.messages = req.flash();
                            res.redirect(process.env.APP_URL + '/staticpages');
                        } else if (!error && response.statusCode == 200) {
                            var data = response.body;
                            var re = JSON.stringify(data);
                            var test = JSON.parse(re);
                            sess = req.session;
                            req.flash("error", "Your staticpages Detail Deleted Successfully.");
                            res.locals.messages = req.flash();
                            res.render('admin/staticpages', { person: sess.companyname,staticpages: test,roleid :sess.roleid  });
                            res.end;
                        } else {
    
                            //do something with error
                            // res.redirect('/charge-error');
                            //or
                            res.sendStatus(500);
                            return;
    
    
                        }
    
                    });
    
            }, 0000);
    
    
        } else {
    
            res.render('users/login');
        }
    });





    
// Activation Link Verification

app.get('/activationverified/:name', urlencodedParser, function(req, res) {
    sess = req.session;
    names = req.params.name;
   
  
    if (names!='') {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/activationverification',
                    body: {"name":names },
                    json: true
                },

                function(error, response, body) {
                    if (response.statusCode == 500) {
                        var data = response.body;

                        req.flash("error", "Failed to Verification Code Match for user account: User account not found.");
                        res.locals.messages = req.flash();
                        res.render('users/login');
                    } else if (!error && response.statusCode == 200){
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var test = JSON.parse(re);
                       
                        sess = req.session;
                      //  console.log(sess);
                      req.flash("error", "Company has been successfully Verified You can Login with given Credential.");
                      res.locals.messages = req.flash();
                      res.render('users/login');
                      res.end;

                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    }

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
});
// Add subscription 


app.get('/addsubscription', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    if(sess.token!='') {
        setTimeout(function() {
    request.post({
                 headers: {
                 'Authorization': `Bearer ${token}`
                 },
                url: process.env.APP_URL + '/api/plans/getplanlist',
                body: { "companyname": sess.companyname },
                json: true
                },
                function(error, response, body) {
                    if (response.statusCode == 500) {
                        var data = response.body;

                       // req.flash("error", "Id not Found Plan.Try Again Later");
                       // res.locals.messages = req.flash();
                        res.redirect(process.env.APP_URL + '/addsubscription');
                    } else if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var test = JSON.parse(re);
               
                       
                        sess = req.session;
                       
                 
                   
                res.render('admin/addsubscription', { person: sess.companyname, plan: test,roleid :sess.roleid  });
                        res.end;

                        
                    } else {
                       
            res.redirect(process.env.APP_URL + '/addsubscription');
                        res.end;


                    }

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
}); 


// Add Plan Post
app.post('/addsubscriptions', urlencodedParser, (req, res) => {
    sess = req.session;
    const token = sess.token;
    var body = req.body;

        if (sess.companyname && sess.token!='') {
            setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
            headers: {
            'Authorization': `Bearer ${token}`
            },
            url: process.env.APP_URL + '/api/users/addsubscriptions',
            body: req.body,
            json: true
            },
            function(error, response, body) {
                if (response.statusCode == 500) {
                    var data = response.body;

                    req.flash("error", "Add Subscription Error.Try Again Later");
                    res.locals.messages = req.flash();
                   
                    res.redirect(process.env.APP_URL + '/billingdetail');
                } else if (!error && response.statusCode == 200) {
                    
                var data = response.body;
                var re = JSON.stringify(data);
                var test = JSON.parse(re);
             
                sess = req.session;
                req.flash("error", "Company Invoice has been added Successfully.");
                res.locals.messages = req.flash();
             
                res.redirect(process.env.APP_URL + '/billingdetail');
               
                res.end;
    
                }else{
    
                    //do something with error
                    // res.redirect('/charge-error');
                    //or
                    res.sendStatus(500);
                    return;
    
    
                }
    
            });
        }, 0000);
        }
    
    });


// Get Invoice Detail


app.get('/getinvoice/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    id = req.params.id;
    const token = sess.token;
    if(id && sess.token!='') {

        const amount=200;

       
         


        setTimeout(function() {
         
    request.post({
                 headers: {
                 'Authorization': `Bearer ${token}`
                 },
                url: process.env.APP_URL + '/api/users/getsubscriptiondetail',
                body: { "id": id },
                json: true
                },
                function(error, response, body) {
                     if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var test = JSON.parse(re);
                       sess = req.session;
                       var orderids=test.data[0].order_id;
                      var amount=parseFloat(test.data[0].payment_detail)*100;
                       var options = {
                        amount: amount,  // amount in the smallest currency unit
                        currency: "INR",
                        receipt: orderids
                      };
                     
                       rzp.orders.create(options, function(err, order) {

                        res.render('admin/getinvoice', { person: sess.companyname, getinvoicedata: test,roleid :sess.roleid,order:order });  
                        console.log(order);
                      });
              

               
              
                        res.end;

                       
                    } 

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
}); 


// Get Invoice PDF



app.get("/pdf", async (req, res) => {
    const url = req.query.target;

    const browser = await puppeteer.launch({
        headless: true,
        slowMo: 1250
    });

    const webPage = await browser.newPage();

  
    await webPage.goto(url, {
        waitUntil: "networkidle0"
    });
    
    const pdf = await webPage.pdf({
        printBackground: true,
        format: "Letter",
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        }
    });

    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
})



// Update Profile


app.get('/editprofile', urlencodedParser, function(req, res) {
    sess = req.session;
    id = 1;
    const token = sess.token;
    if(id && sess.token!='') {
        setTimeout(function() {
         
    request.post({
                 headers: {
                 'Authorization': `Bearer ${token}`
                 },
                url: process.env.APP_URL + '/api/users/editprofile',
                body: { "id": id },
                json: true
                },
                function(error, response, body) {
                    if (response.statusCode == 500) {
                        var data = response.body;

                        req.flash("error", "Id not Found Plan.Try Again Later");
                        res.locals.messages = req.flash();
                        res.redirect(process.env.APP_URL + '/login');
                    } else if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var test = JSON.parse(re);

                        sess = req.session;
                
                     console.log(test);
                            res.render('admin/editprofile', { person: sess.companyname, user: test,roleid :sess.roleid  });
                        res.end;
                          
                   
              

                       
                    } else {
                        req.flash("error", "Id not Found Plan.Try Again Later");
            res.locals.messages = req.flash();
            res.redirect(process.env.APP_URL + '/plan');
                        res.end;


                    }

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
}); 
// Edir post Profile

  // Edit Plan Post
  app.post('/editprofile', urlencodedParser, (req, res) => {
    sess = req.session;
    const token = sess.token;
    var body = req.body;

   
    if (sess.companyname && sess.token!='') {
            setTimeout(function() {
            // this code will only run when time has ellapsed
                request.post({
                headers: {
                'Authorization': `Bearer ${token}`
                },
                url: process.env.APP_URL + '/api/users/usereditservice',
                body: req.body,
                json: true
            },
    
            function(error, response, body) {
                if (response.statusCode == 500) {
                    var data = response.body;
               
                    req.flash("error", "Error While updated Profile Successfully.");
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/editprofile');
    
                } else if (!error && response.statusCode == 200) {
                    
                var data = response.body;
                var re = JSON.stringify(data);
                var test = JSON.parse(re);
           
                sess = req.session;
                req.flash("error", test.detail);
                res.locals.messages = req.flash();
                res.render('admin/editprofile', { person: sess.companyname, user: test,roleid :sess.roleid  });
                res.end;

                }else{
    
                    //do something with error
                    // res.redirect('/charge-error');
                    //or
                    res.sendStatus(500);
                    return;
    
    
                }
    
            });
        }, 0000);
        }
    
    });


app.listen(process.env.APP_PORT || 4000, function() {
    console.log('now listen for new request', process.env.APP_PORT);
});
