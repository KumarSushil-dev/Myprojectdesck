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
const { encrypt, decrypt } = require("./api/middleware/crpyto.js");
var daterangepicker = require("daterangepicker");
var in_array = require('in_array');
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


app.locals.encrypt = encrypt;
app.locals.decrypt = decrypt;
app.locals.in_array = in_array;
app.locals.moment = moment;
app.locals.daterangepicker = daterangepicker;
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
app.use('/api/plans', jsonParser, require('./api/routes/plan.router'));
app.use('/api/plans', urlencodedParser, require('./api/routes/plan.router'));
app.use('/api/emailtemplate', jsonParser, require('./api/routes/emailtemplate.router'));
app.use('/api/emailtemplate', urlencodedParser, require('./api/routes/emailtemplate.router'));
app.use('/api/staticpages', jsonParser, require('./api/routes/staticpages.router'));
app.use('/api/staticpages', urlencodedParser, require('./api/routes/staticpages.router'));






app.get('/bookademo', function(req, res) {

    res.redirect('/signup');
});

app.get('/createuser', function(req, res) {

    res.render('users/createpassword',{  createuser: 0  });
});

app.get('/forgotpassword', function(req, res) {

    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('users/forgotpassword',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);



});

app.get('/', function(req, res) {
    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/index',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);


    
});
       
// Login 


app.get('/login', function(req, res) {

    sess = req.session;

    if (sess.email) {
        res.redirect('/dashboard');
    }

    res.render('users/login');
});


app.get('/features', function(req, res) {

    
    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/features',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);

});


app.get('/aboutus', function(req, res) {

    
    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/aboutus',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);

});

app.get('/faq', function(req, res) {

    
    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/faq',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);
});

app.get('/reseller', function(req, res) {

    
    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/reseller',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);

    
});

app.get('/securitycompliance', function(req, res) {

    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/securitycompliance',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);
});

app.get('/becomeaffiliate', function(req, res) {

    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/becomeaffiliate',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);
   
});

app.get('/industries', function(req, res) {

    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/industries',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);
});
app.get('/priceplan', function(req, res) {

    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/priceplan',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);
});

app.get('/measureemployeeproductivity', function(req, res) {


    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/measureemployeeproductivity',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);

});

app.get('/timetracking', function(req, res) {



    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/timetracking',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);


});

app.get('/automatedattendence', function(req, res) {



    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/automatedattendence',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);


});

app.get('/projecttracking', function(req, res) {


    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/projecttracking',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);

});

app.get('/automatedscreenshots', function(req, res) {



    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/automatedscreenshots',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);

   
});

app.get('/engagementtracking', function(req, res) {




    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/engagementtracking',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);

   


});

app.get('/bidashboard', function(req, res) {




    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/bidashboard',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);

   



   
});

app.get('/kanbantaskmanagment', function(req, res) {



    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/kanbantaskmanagment',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);

   
});

app.get('/vsactivtrack', function(req, res) {



    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/vsactivtrack',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);

});

app.get('/vshubstaff', function(req, res) {




    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/vshubstaff',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);


});

app.get('/vsdesktime', function(req, res) {




    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/vsdesktime',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);



});

app.get('/vstimedoctor', function(req, res) {




    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/vstimedoctor',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);

});

app.get('/privacy', function(req, res) {




    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/privacy',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);


});

app.get('/termsandconditions', function(req, res) {



    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    
    setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                
                    url: process.env.APP_URL + '/api/plans/gettestimonial',
                    body: { "companyname": "test" },
                    json: true
                },
           function(error, response, body) {

          
                   if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                  
                    res.render('pages/termsandconditions',{page: req.url,testimonial:datas,userfound:userfound});
                    res.end;
                    } 

                });

        }, 0000);



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
            }else if (response.statusCode == 500) {
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
            if(test.roleid==2){
                res.redirect('/presence');
                }else if(test.roleid==1){
                res.redirect('/userlist');  
                }else{
                    req.flash("error", "Failed to log in user account: User account not found.");
                    res.locals.messages = req.flash();
                    req.session.destroy((err) => {
                        if (err) {
                            return console.log(err);
                        }
                      
                        res.render('users/login');
                    });

                }
            res.end;
            }else{
            res.sendStatus(500);
                return;
               }

        })

});


// Dashboard
app.get('/dashboard', urlencodedParser, function(req, res) {

    sess = req.session;
const token = sess.token;
if(sess.companyname && sess.token!='') {
  setTimeout(function() {
      // this code will only run when time has ellapsed
      request.post({
          headers: {
              'Authorization': `Bearer ${token}`
            },
              url: process.env.APP_URL + '/api/users/dashboards',
              body: { "companyname": sess.companyname },
              json: true
          },
     function(error, response, body) {

    
       if (!error && response.statusCode == 200) {
                  var data = response.body;
                  var re = JSON.stringify(data);
                  var datas = JSON.parse(re);
 
          var sess = req.session;
          res.render('admin/dashboard', { person: sess.companyname,companytask:datas,roleid :sess.roleid });
          res.end;
              } else {

                  //do something with error
                  // res.redirect('/charge-error');
                  //or
                  res.render('users/login');
                  res.end;
                  return;


              } 

          });

  }, 0000);


} else {

  res.render('users/login');
}


});




app.get('/companytask', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/companytask',
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

                     //   console.log(datas);
                        var sess = req.session;
                res.render('admin/companytask', { person: sess.companyname, companytask: datas,roleid :sess.roleid  });
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



// companyprojects
app.get('/companytaskdetail', function(req, res) {

    sess = req.session;
    if (sess.companyname && sess.token!='') {
        res.render('admin/companytaskdetail', { person: sess.companyname,roleid :sess.roleid });
    } else {

        res.render('users/login');
    }
});

// presence
app.get('/presence', function(req, res) {

    sess = req.session;
    const token = sess.token;
    if(sess.companyname && sess.token!='') {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/presence',
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

                     // console.log(datas);
                        var sess = req.session;
                res.render('admin/presence', { person: sess.companyname, companytask: datas,roleid :sess.roleid  });
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

// leaves
app.get('/leaves', function(req, res) {

    sess = req.session;
    if (sess.companyname && sess.token!='') {
        res.render('admin/leaves', { person: sess.companyname,roleid :sess.roleid });
    } else {

        res.render('users/login');
    }
});



app.get('/productivity', urlencodedParser, function(req, res) {

    sess = req.session;
const token = sess.token;
if(sess.companyname && sess.token!='') {
  setTimeout(function() {
      // this code will only run when time has ellapsed
      request.post({
          headers: {
              'Authorization': `Bearer ${token}`
            },
              url: process.env.APP_URL + '/api/users/gettodayproductivitytr',
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

          var sess = req.session;
          res.render('admin/productivity', { person: sess.companyname,companytask:datas,roleid :sess.roleid });
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

app.get('/timesheet', function(req, res) {

    sess = req.session;
    if (sess.companyname && sess.token!='') {
        res.render('admin/timesheet', { person: sess.companyname,roleid :sess.roleid });
    } else {
        res.render('users/login');
    }
});

app.get('/applicationusage', function(req, res) {


    
    sess = req.session;
    const token = sess.token;
    
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/applicationusage',
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
                     //   console.log(datas);
                        sess = req.session;
                      res.render('admin/applicationusage', { person: sess.companyname, applicationusage: datas,roleid :sess.roleid  });
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
// reports
app.get('/reports', function(req, res) {

    sess = req.session;
    if (sess.companyname && sess.token!='') {
        res.render('admin/reports', { person: sess.companyname,roleid :sess.roleid });
    } else {

        res.render('users/login');
    }
});






app.get('/companysettings', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/getcompanysettings',
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
                      //  console.log(datas);
                        sess = req.session;
                      res.render('admin/companysettings', { person: sess.companyname, csettings: datas,roleid :sess.roleid  });
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


// companysettings
app.get('/timeline', function(req, res) {
    sess = req.session;
    const token = sess.token;
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/timeline',
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
                     //  console.log(datas.data);
                      
                        sess = req.session;
res.render('admin/timeline', { person: sess.companyname, companyuser: datas,roleid :sess.roleid  });
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

app.post('/getproductivity', urlencodedParser, (req, res) => {
    var body = req.body;
    sess = req.session;
    const token = sess.token;
    console.log(body);
    if (sess.companyname && sess.token!='') {
    
    request.post({
        headers: {
            'Authorization': `Bearer ${token}`
          },
            url: process.env.APP_URL + '/api/users/getproductivity',
            body: req.body,
            json: true
        },
        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
             
            req.flash("error", "Productivity Cannot Upgarded ,Please Try Again.");
            res.locals.messages = req.flash();
              
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                        var sess = req.session;
            res.render('admin/getproductivity', { person: sess.companyname,companytask:datas,roleid :sess.roleid,startdates:datas.startdates,enddates:datas.enddatess  });

            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var datas = JSON.parse(re);
       console.log(datas.startdates);
            var sess = req.session;
res.render('admin/getproductivity', { person: sess.companyname,companytask:datas,roleid :sess.roleid,startdates:datas.startdates,enddates:datas.enddates });

            
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


app.post('/gettimeline', urlencodedParser, (req, res) => {
    var body = req.body;
    sess = req.session;
    const token = sess.token;
    console.log(body);
    if (sess.companyname && sess.token!='') {
    
    request.post({
        headers: {
            'Authorization': `Bearer ${token}`
          },
            url: process.env.APP_URL + '/api/users/gettimeline',
            body: req.body,
            json: true
        },
        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
             
            req.flash("error", "Timeline Cannot Upgarded ,Please Try Again.");
            res.locals.messages = req.flash();
              
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                        var sess = req.session;


            res.render('admin/gettimeline', { person: sess.companyname,companyuser:datas,roleid :sess.roleid,startdates:datas.startdates,enddates:datas.enddates });

            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var datas = JSON.parse(re);
       console.log(datas.startdates);
            var sess = req.session;
      res.render('admin/gettimeline', {person: sess.companyname,companyuser:datas,roleid :sess.roleid,startdates:datas.startdates,enddates:datas.enddates });


            
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



app.post('/getviewdetail', urlencodedParser, (req, res) => {
    var body = req.body;
    sess = req.session;
    const token = sess.token;
    console.log(body);
    if (sess.companyname && sess.token!='') {
    
    request.post({
        headers: {
            'Authorization': `Bearer ${token}`
          },
            url: process.env.APP_URL + '/api/users/getviewdetail',
            body: req.body,
            json: true
        },
        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
             
            req.flash("error", "Timeline Cannot Upgarded ,Please Try Again.");
            res.locals.messages = req.flash();
              
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                        var sess = req.session;


          
        res.render('admin/getviewdetail', { person: sess.companyname, user: datas,roleid :sess.roleid,uid:datas.ids,startdates:datas.startdates,enddates:datas.enddates });
            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var datas = JSON.parse(re);
       //console.log(datas.startdates);
            var sess = req.session;
        res.render('admin/getviewdetail', { person: sess.companyname, user: datas,roleid :sess.roleid,uid:datas.ids,startdates:datas.startdates,enddates:datas.enddates });


            
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

app.post('/getsnapshot', urlencodedParser, (req, res) => {
    var body = req.body;
    sess = req.session;
    const token = sess.token;
    console.log(body);
    if (sess.companyname && sess.token!='') {
    
    request.post({
        headers: {
            'Authorization': `Bearer ${token}`
          },
            url: process.env.APP_URL + '/api/users/getsnapshot',
            body: req.body,
            json: true
        },
        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
             
            req.flash("error", "Productivity Cannot Upgarded ,Please Try Again.");
            res.locals.messages = req.flash();
              
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                        var sess = req.session;
            res.render('admin/getsnapshot', { person: sess.companyname,user: datas,roleid :sess.roleid,startdates:startdates,enddates:enddates,uid:datas.ids });

            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var datas = JSON.parse(re);
            console.log(datas.startdates);
            console.log(datas.enddates);
            var sess = req.session;
res.render('admin/getsnapshot', { person: sess.companyname, user: datas,roleid :sess.roleid,startdates:datas.startdates,enddates:datas.enddates,uid:datas.ids });

            
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



app.get('/userupdatestatusteam/:id/:name', urlencodedParser, function(req, res) {
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
                    url: process.env.APP_URL + '/api/users/userupdatestatusteam',
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
                      req.flash("error", test.detail);
                   
                      res.locals.messages = req.flash();
                      res.render('admin/companyuser', { person: sess.companyname,companyuser: test,roleid :sess.roleid  });
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

app.get('/companysettingupdatestatus/:id/:name', urlencodedParser, function(req, res) {
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
                    url: process.env.APP_URL + '/api/users/companysettingupdatestatus',
                    body: {"id":ids,"name":names },
                    json: true
                },

                function(error, response, body) {
                    if (!error && response.statusCode == 200){
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                       
                        sess = req.session;
                      //  console.log(sess);
                      req.flash("error", datas.detail);
                   
                      res.locals.messages = req.flash();
                     
                      res.render('admin/companysettings', { person: sess.companyname, csettings: datas,roleid :sess.roleid  });
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

app.get('/companyprojects/:id', urlencodedParser, function(req, res) {
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
                url: process.env.APP_URL + '/api/users/companyprojects',
                body: {"id":ids },
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
                   //console.log(test.getuse);
                      
        res.render('admin/companyprojects', { person: sess.companyname,userlist: test,roleid :sess.roleid });
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

app.get('/taskview/:id', urlencodedParser, function(req, res) {
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
                url: process.env.APP_URL + '/api/users/taskview',
                body: {"id":ids },
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
                  //console.log(test);
                      
        res.render('admin/taskview', { person: sess.companyname,userlist: test,roleid :sess.roleid });
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

app.post('/forgot', urlencodedParser, (req, res) => {
    var body = req.body;
    request.post({
            url: process.env.APP_URL + '/api/users/forgotweb',
            body: req.body,
            json: true
        },
        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
             
    req.flash("error", "This Email is not registered. Please use a unique Email Address.");
                res.locals.messages = req.flash();
                var re = JSON.stringify(data);
                var countrylist = JSON.parse(re);
               res.render('users/forgotpassword');
            } else if (!error && response.statusCode == 200) {
            var data = response.body;

       req.flash("error", "The instructions to Reset your Password were sent to your Registered Email Address. Please also check your Spam Folder.");
          
         res.locals.messages = req.flash();
         
        res.render('users/forgotpassword');

            
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

app.post('/resetpasswords', urlencodedParser, (req, res) => {
    var body = req.body;
    request.post({
            url: process.env.APP_URL + '/api/users/forgotsuccessful',
            body: req.body,
            json: true
        },
        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
             
    req.flash("error", "Reset Password Update Failed due to incorrect password, Please try Again Later.");
    res.locals.messages = req.flash();
              
               res.render('users/login');
            } else if (!error && response.statusCode == 200) {
           

req.flash("error", "Reset Password Successfully ,You can Login with New Credential Detail.");
          
         res.locals.messages = req.flash();
         
        res.render('users/login');

            
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




app.get('/testimonial', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/plans/testimoniallist',
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
        res.render('admin/testimonial', { person: sess.companyname, testimonial: datas,roleid :sess.roleid  });
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
app.get('/testimonialadd', function(req, res) {
sess = req.session;
const token = sess.token;
if(sess.companyname!="" && sess.token!=''){  
res.render('admin/testimonialadd', { person: sess.companyname,roleid :sess.roleid  });
res.end;
}
 //  res.render('users/login');
});

// Add Plan Post
app.post('/testimonialadd', urlencodedParser, (req, res) => {
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
             url: process.env.APP_URL + '/api/plans/testimonialaddservice',
             body: req.body,
             json: true
        },

        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
           
                req.flash("error", "Add Plan Error.Try Again Later");
                res.locals.messages = req.flash();
                res.redirect(process.env.APP_URL + '/testimonial');

            } else if (!error && response.statusCode == 200) {
                
            var data = response.body;
            var re = JSON.stringify(data);
            var test = JSON.parse(re);
         
            sess = req.session;
            req.flash("error", "Your testimonial has been added Successfully.");
            res.locals.messages = req.flash();
         
            res.render('admin/testimonial', { person: sess.companyname,testimonial: test,roleid :sess.roleid  });
           
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






// Add Plan Post
app.post('/companysettings', urlencodedParser, (req, res) => {
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
             url: process.env.APP_URL + '/api/users/companysettings',
             body: req.body,
             json: true
        },

        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
           
                req.flash("error", "Add Plan Error.Try Again Later");
                res.locals.messages = req.flash();
                res.redirect(process.env.APP_URL + '/companysettings');

            } else if (!error && response.statusCode == 200) {
                
            var data = response.body;
            var re = JSON.stringify(data);
            var test = JSON.parse(re);
         
            sess = req.session;
            req.flash("error", "Your Company Settings has been added Successfully.");
            res.locals.messages = req.flash();
         
            res.render('admin/companysettings', { person: sess.companyname,csettings: test,roleid :sess.roleid  });
           
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
    

    app.get('/testimonialedit/:id', urlencodedParser, function(req, res) {
        sess = req.session;
        id = req.params.id;
        const token = sess.token;
        if(id && sess.token!='') {
            setTimeout(function() {
             
        request.post({
                     headers: {
                     'Authorization': `Bearer ${token}`
                     },
                    url: process.env.APP_URL + '/api/plans/testimonialeditshow',
                    body: { "id": id },
                    json: true
                    },
                    function(error, response, body) {
                        if (response.statusCode == 500) {
                            var data = response.body;
    
                            req.flash("error", "Id not Found Plan.Try Again Later");
                            res.locals.messages = req.flash();
                            res.redirect(process.env.APP_URL + '/testimonial');
                        } else if (!error && response.statusCode == 200) {
                            var data = response.body;
                            var re = JSON.stringify(data);
                            var test = JSON.parse(re);
                   
                           
                            sess = req.session;
                            if(test.data.id){
                           
                    sess = req.session;
                       
                    res.render('admin/testimonialedit', { person: sess.companyname, testimonial: test,roleid :sess.roleid  });
                            res.end;
    
                            }else{
                                req.flash("error", "Id not Found testimonial.Try Again Later");
                                res.locals.messages = req.flash();
                                res.redirect(process.env.APP_URL + '/testimonial');
                                res.end;
                            }
                        } else {
                            req.flash("error", "Id not Found testimonial.Try Again Later");
                res.locals.messages = req.flash();
                res.redirect(process.env.APP_URL + '/testimonial');
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
    app.post('/testimonialedit', urlencodedParser, (req, res) => {
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
                url: process.env.APP_URL + '/api/plans/testimonialeditservice',
                body: req.body,
                json: true
            },
    
            function(error, response, body) {
                if (response.statusCode == 500) {
                    var data = response.body;
               
                    req.flash("error", "Error While updated testimonial Successfully.");
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/testimonial');
    
                } else if (!error && response.statusCode == 200) {
                    
                var data = response.body;
                var re = JSON.stringify(data);
                var test = JSON.parse(re);
             
                sess = req.session;
                req.flash("error", "Your testimonial has been Updated Successfully.");
                res.locals.messages = req.flash();
                res.render('admin/testimonial', { person: sess.companyname,testimonial: test,roleid :sess.roleid  });
                
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
    
    app.get('/testimonialupdatestatus/:id/:name', urlencodedParser, function(req, res) {
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
                        url: process.env.APP_URL + '/api/plans/testimonialupdatestatus',
                        body: {"id":ids,"name":names },
                        json: true
                    },
    
                    function(error, response, body) {
                        if (response.statusCode == 500) {
                            var data = response.body;
    
                                 
                    req.flash("error", "Error While updated testimonial Successfully.");
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/testimonial');
                        } else if (!error && response.statusCode == 200){
                            var data = response.body;
                            var re = JSON.stringify(data);
                            var test = JSON.parse(re);
                           
                           
                            sess = req.session;
                          //  console.log(sess);
    
                          req.flash("error", "Your testimonial Status has been Update Successfully.");
                          res.locals.messages = req.flash();
                res.render('admin/testimonial', { person: sess.companyname,testimonial: test,roleid :sess.roleid  });
    
                          
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

    
    app.get('/testimonialupdatedelete/:id', urlencodedParser, function(req, res) {
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
                        url: process.env.APP_URL + '/api/plans/testimonialdeletesuper',
                        body: {"id":ids },
                        json: true
                    },
    
                    function(error, response, body) {
                        if (response.statusCode == 500) {
                            var data = response.body;
    
                         
                            req.flash("error", "Error While updated testimonial Successfully.");
                            res.locals.messages = req.flash();
                            res.redirect(process.env.APP_URL + '/testimonial');
                        } else if (!error && response.statusCode == 200) {
                            var data = response.body;
                            var re = JSON.stringify(data);
                            var test = JSON.parse(re);
                            sess = req.session;
                            req.flash("error", "Your testimonial Detail Deleted Successfully.");
                            res.locals.messages = req.flash();
                            res.render('admin/testimonial', { person: sess.companyname,plan: test,roleid :sess.roleid  });
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



// Add Plan 
app.post('/updatepayment',urlencodedParser, function(req, res) {
    
     
    sess = req.session;
    const token = sess.token;
    var body = req.body;
    if(sess.companyname !="" && sess.token!='') {
    setTimeout(function() {
         
    request.post({
                 headers: {
                 'Authorization': `Bearer ${token}`
                 },
                url: process.env.APP_URL + '/api/users/updatepaymente',
                body: req.body,
                json: true
                },
                function(error, response, body) {
                    if (response.statusCode == 500) {
                        var data = response.body;

                        req.flash("error", "Id not Found updatepayment.Try Again Later");
                        res.locals.messages = req.flash();
                        res.redirect(process.env.APP_URL + '/orderinvoice?userfound=2');
                    } else if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var test = JSON.parse(re);
               
                
                        sess = req.session;
                       
                          
                sess = req.session;
                   
                res.redirect(process.env.APP_URL + '/orderinvoice?userfound=1');
                        res.end;

                       
                    } else {
                        req.flash("error", "Id not Found updatepayment.Try Again Later");
            res.locals.messages = req.flash();
            res.redirect(process.env.APP_URL + '/orderinvoice?userfound=2');
                        res.end;


                    }

                });

        }, 0000);


    } else {

        res.render('users/login');
    }




     //  res.render('users/login');
    });

// Add Plan 
app.post('/sendmessage',urlencodedParser, function(req, res) {
    
    sess = req.session;
    const token = sess.token;
    var body = req.body;
    if(sess.companyname !="" && sess.token!='') {
    setTimeout(function() {
         
    request.post({
                 headers: {
                 'Authorization': `Bearer ${token}`
                 },
                url: process.env.APP_URL + '/api/users/sendmessages',
                body: req.body,
                json: true
                },
                function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var test = JSON.parse(re);
               
                
                     
                sess = req.session;
                   
                res.redirect(process.env.APP_URL + '/?userfound=1');
                        res.end;
                       
                    }

                });

        }, 0000);


    } else {

        res.render('users/login');
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
    
// Activation Link Verification

app.get('/resetpasswordverified/:name', urlencodedParser, function(req, res) {
    sess = req.session;
    names = req.params.name;
   
  
    if (names!='') {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/resetpasswordverification',
                    body: {"name":names },
                    json: true
                },

                function(error, response, body) {
                    if (response.statusCode == 500) {
                        var data = response.body;

                req.flash("error", "Failed to Verification Code Match for user account: User account not found. Try Again !");
                res.locals.messages = req.flash();
                res.render('users/forgotpassword');
                    } else if (!error && response.statusCode == 200){
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var test = JSON.parse(re);
                          
                   
                      req.flash("error", "Change your Password.");
                      res.locals.messages = req.flash();
                      res.render('users/createpassword',{  createuser: test  });
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
                       // console.log(order);
                      //  console.log(test);
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

app.get('/viewdetail/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    const token = sess.token;
    if(ids && sess.token!='') {
        setTimeout(function() {
         
    request.post({
                 headers: {
                 'Authorization': `Bearer ${token}`
                 },
                url: process.env.APP_URL + '/api/users/viewdetail',
                body: { "id": ids },
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
                    //console.log(test.timesarr);
                        if(userfound==1){
                            req.flash("error", "User Profile has been succesfully updated.");
                            res.locals.messages = req.flash();
                        }else if(userfound==2){
                            req.flash("error", "Change password succesfully updated for user!");
                            res.locals.messages = req.flash();
                        }
              // console.log(test);
res.render('admin/viewdetail', { person: sess.companyname, user: test,roleid :sess.roleid,uid:ids });
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



app.get('/snapshot/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    const token = sess.token;
    if(ids && sess.token!='') {
        setTimeout(function() {
         
    request.post({
                 headers: {
                 'Authorization': `Bearer ${token}`
                 },
                url: process.env.APP_URL + '/api/users/snapshotdetail',
                body: { "id": ids },
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
                     //  console.log(test.snapshotdata[0][0].image);
                        if(userfound==1){
                            req.flash("error", "User Profile has been succesfully updated.");
                            res.locals.messages = req.flash();
                        }else if(userfound==2){
                            req.flash("error", "Change password succesfully updated for user!");
                            res.locals.messages = req.flash();
                        }
              // console.log(test);
    res.render('admin/snapshot', { person: sess.companyname, user: test,roleid :sess.roleid,uid:ids  });
    res.end;
                          
                     } else {
                        req.flash("error", "Id not Found Plan.Try Again Later");
            res.locals.messages = req.flash();
            res.redirect(process.env.APP_URL + '/snapshot');
                        res.end;


                    }

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
}); 

app.get('/snapshotmore/:id/:duration/:startdate/:enddate', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    duration = req.params.duration;
    startdateunix = req.params.startdate;
    enddateunix = req.params.enddate;
    if(req.query.userfound){
        var userfound = req.query.userfound;
    }else{
        var userfound=0;
    }
    const token = sess.token;
    if(ids && sess.token!='') {
        setTimeout(function() {
         
    request.post({
                 headers: {
                 'Authorization': `Bearer ${token}`
                 },
                url: process.env.APP_URL + '/api/users/snapshotmoredetail',
                body: { "id": ids,"duration":duration,"startdateunix":startdateunix,"enddateunix":enddateunix },
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
                     //  console.log(test.snapshotdata[0][0].image);
                        if(userfound==1){
                            req.flash("error", "User Profile has been succesfully updated.");
                            res.locals.messages = req.flash();
                        }else if(userfound==2){
                            req.flash("error", "Change password succesfully updated for user!");
                            res.locals.messages = req.flash();
                        }
             console.log(test.startdates);
              res.render('admin/getsnapshot', { person: sess.companyname, user: test,roleid :sess.roleid,startdates:test.startdates,enddates:test.enddates,uid:test.ids });

    res.end;
                          
                     } else {
                        req.flash("error", "Id not Found Plan.Try Again Later");
            res.locals.messages = req.flash();
            res.redirect(process.env.APP_URL + '/dashboard');
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





  // Edit Plan Post
  app.post('/viewdetailprofile', urlencodedParser, (req, res) => {
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
                url: process.env.APP_URL + '/api/users/viewdetailprofileservice',
                body: req.body,
                json: true
            },
    
            function(error, response, body) {
                if (response.statusCode == 500) {
                    var data = response.body;
               
                    req.flash("error", "Error While updated Profile Successfully.");
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/viewdetail/');
    
                } else if (!error && response.statusCode == 200) {
                    
                var data = response.body;
                var re = JSON.stringify(data);
                var test = JSON.parse(re);
          
                sess = req.session;
                req.flash("error", test.detail);
                res.locals.messages = req.flash();
                res.redirect(process.env.APP_URL + '/viewdetail/'+test.id);
               // res.render('admin/viewdetail/:'+test.id, { person: sess.companyname, user: test,roleid :sess.roleid  });
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

// company users list


app.get('/companyuser', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/companyuser',
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
                   //    console.log(datas);
                        sess = req.session;
res.render('admin/companyuser', { person: sess.companyname, companyuser: datas,roleid :sess.roleid  });
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

app.get('/projectsmain', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/projectsmain',
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
res.render('admin/projectsmain', { person: sess.companyname, projects: datas,roleid :sess.roleid  });
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


app.get('/dailyattendance', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/dailyattendance',
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
res.render('admin/dailyattendance', { person: sess.companyname, dailyattendance: datas,roleid :sess.roleid  });
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


app.post('/getdailyattendance', urlencodedParser, (req, res) => {
    var body = req.body;
    sess = req.session;
    const token = sess.token;
   // console.log(body);
    if (sess.companyname && sess.token!='') {
    
    request.post({
        headers: {
            'Authorization': `Bearer ${token}`
          },
            url: process.env.APP_URL + '/api/users/getdailyattendance',
            body: req.body,
            json: true
        },
        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
             
            req.flash("error", "dailyattendance Cannot Upgarded ,Please Try Again.");
            res.locals.messages = req.flash();
              
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                        var sess = req.session;
            res.render('admin/getdailyattendance', { person: sess.companyname,dailyattendance:datas,roleid :sess.roleid,startdates:startdates,enddates:enddates  });

            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var datas = JSON.parse(re);
       console.log(datas.startdates);
            var sess = req.session;
res.render('admin/getdailyattendance', { person: sess.companyname,dailyattendance:datas,roleid :sess.roleid,startdates:datas.startdates,enddates:datas.enddates });

            
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

app.post('/getmonthlyattendance', urlencodedParser, (req, res) => {
    var body = req.body;
    sess = req.session;
    const token = sess.token;
   // console.log(body);
    if (sess.companyname && sess.token!='') {
    
    request.post({
        headers: {
            'Authorization': `Bearer ${token}`
          },
            url: process.env.APP_URL + '/api/users/getmonthlyattendance',
            body: req.body,
            json: true
        },
        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
             
            req.flash("error", "Monthlyattendance Cannot Upgarded ,Please Try Again.");
            res.locals.messages = req.flash();
              
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                        var sess = req.session;
            res.render('admin/getmonthlyattendance', { person: sess.companyname,monthlyattendance:datas,roleid :sess.roleid,startdates:startdates });

            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var datas = JSON.parse(re);
       console.log(datas.startdates);
            var sess = req.session;
res.render('admin/getmonthlyattendance', { person: sess.companyname,monthlyattendance:datas,roleid :sess.roleid,startdates:datas.startdates });

            
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




app.get('/monthlyattendance', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/monthlyattendance',
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
res.render('admin/monthlyattendance', { person: sess.companyname, monthlyattendance: datas,roleid :sess.roleid  });
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

app.get('/monthlyinout', urlencodedParser, function(req, res) {
    sess = req.session;
    const token = sess.token;
    if (sess.companyname && sess.token!='') {
        setTimeout(function() {
         
            // this code will only run when time has ellapsed
            request.post({
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                    url: process.env.APP_URL + '/api/users/monthlyinout',
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
res.render('admin/monthlyinout', { person: sess.companyname, monthlyattendance: datas,roleid :sess.roleid  });
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


app.post('/getmonthlyinout', urlencodedParser, (req, res) => {
    var body = req.body;
    sess = req.session;
    const token = sess.token;
   // console.log(body);
    if (sess.companyname && sess.token!='') {
    
    request.post({
        headers: {
            'Authorization': `Bearer ${token}`
          },
            url: process.env.APP_URL + '/api/users/getmonthlyinout',
            body: req.body,
            json: true
        },
        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
             
            req.flash("error", "Monthly In out attendance Cannot Upgarded ,Please Try Again.");
            res.locals.messages = req.flash();
              
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);
                        var sess = req.session;
            res.render('admin/getmonthlyinout', { person: sess.companyname,monthlyattendance:datas,roleid :sess.roleid,startdates:startdates });

            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var datas = JSON.parse(re);
       console.log(datas.startdates);
            var sess = req.session;
res.render('admin/getmonthlyinout', { person: sess.companyname,monthlyattendance:datas,roleid :sess.roleid,startdates:datas.startdates });

            
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



// Add User

app.get('/addcompanyuser', function(req, res) {

sess = req.session;
const token = sess.token;
if(sess.companyname!="" && sess.token!=''){  
res.render('admin/addcompanyuser', { person: sess.companyname,roleid :sess.roleid  });
res.end;
}
 //  res.render('users/login');
});


// Add Company User
app.post('/addcompanyuser', urlencodedParser, (req, res) => {
    sess = req.session;
    const token = sess.token;
    var body = req.body;
    body.companyname=sess.companyname;
   // console.log(body);
if(sess.companyname && sess.token!='') {
    setTimeout(function() {
            // this code will only run when time has ellapsed
            
        request.post({
                headers: {
                        'Authorization': `Bearer ${token}`
                },
                 url: process.env.APP_URL + '/api/users/addcompanyuser',
                 body: req.body,
                 json: true
            },
    
            function(error, response, body) {
                if (response.statusCode == 500) {
                    var data = response.body;
                    var resave = JSON.stringify(data);
                    var tests = JSON.parse(resave);
                    
                    req.flash("error", tests.detail);
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/companyuser');
    
                } else if (!error && response.statusCode == 200) {
                    
                var data = response.body;
                var re = JSON.stringify(data);
                var test = JSON.parse(re);
             
                sess = req.session;
                req.flash("error", test.detail);
                res.locals.messages = req.flash();
             
         res.render('admin/companyuser', { person: sess.companyname,companyuser: test,roleid :sess.roleid  });
               
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

// Add Company User
app.post('/projectsadd', urlencodedParser, (req, res) => {
    sess = req.session;
    const token = sess.token;
    var body = req.body;
    body.companyname=sess.companyname;
  //  console.log(body);
if(sess.companyname && sess.token!='') {
    setTimeout(function() {
            // this code will only run when time has ellapsed
            
        request.post({
                headers: {
                        'Authorization': `Bearer ${token}`
                },
                 url: process.env.APP_URL + '/api/users/projectsadd',
                 body: req.body,
                 json: true
            },
    
            function(error, response, body) {
                if (response.statusCode == 500) {
                    var data = response.body;
                    var resave = JSON.stringify(data);
                    var tests = JSON.parse(resave);
                    
                    req.flash("error", tests.detail);
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/projectsadd');
    
                } else if (!error && response.statusCode == 200) {
                    
                var data = response.body;
                var re = JSON.stringify(data);
                var test = JSON.parse(re);
             
                sess = req.session;
                req.flash("error", "Project has been added Successfully.");
                res.locals.messages = req.flash();
             
                res.render('admin/projectsmain', { person: sess.companyname, projects: test,roleid :sess.roleid  });
               
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

// Add Company User
app.post('/taskadd', urlencodedParser, (req, res) => {
    sess = req.session;
    const token = sess.token;
    var body = req.body;
    body.companyname=sess.companyname;
 //   console.log(body);
if(sess.companyname && sess.token!='') {
    setTimeout(function() {
            // this code will only run when time has ellapsed
            
        request.post({
                headers: {
                        'Authorization': `Bearer ${token}`
                },
                 url: process.env.APP_URL + '/api/users/taskadd',
                 body: req.body,
                 json: true
            },
    
            function(error, response, body) {
                if (response.statusCode == 500) {
                    var data = response.body;
                    var resave = JSON.stringify(data);
                    var tests = JSON.parse(resave);
                    
                    req.flash("error", tests.detail);
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/taskadd');
    
                } else if (!error && response.statusCode == 200) {
                    
                var data = response.body;
                var re = JSON.stringify(data);
                var test = JSON.parse(re);
             
                sess = req.session;
                req.flash("error", "Task has been added Successfully.");
                res.locals.messages = req.flash();
             
                res.render('admin/companyprojects', { person: sess.companyname, userlist: test,roleid :sess.roleid  });
               
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


// Add Company User
app.post('/projectsedit', urlencodedParser, (req, res) => {
    sess = req.session;
    const token = sess.token;
    var body = req.body;
    body.companyname=sess.companyname;
  
if(sess.companyname && sess.token!='') {
    setTimeout(function() {
            // this code will only run when time has ellapsed
            
        request.post({
                headers: {
                        'Authorization': `Bearer ${token}`
                },
                 url: process.env.APP_URL + '/api/users/projectsedit',
                 body: req.body,
                 json: true
            },
    
            function(error, response, body) {
                if (response.statusCode == 500) {
                    var data = response.body;
                    var resave = JSON.stringify(data);
                    var tests = JSON.parse(resave);
                    
                    req.flash("error", tests.detail);
                    res.locals.messages = req.flash();
                    res.redirect(process.env.APP_URL + '/projectsedit');
    
                } else if (!error && response.statusCode == 200) {
                    
                var data = response.body;
                var re = JSON.stringify(data);
                var test = JSON.parse(re);
             //console.log(test);
                sess = req.session;
                req.flash("error", "Project has been update Successfully.");
                res.locals.messages = req.flash();
             
                res.render('admin/companyprojects', { person: sess.companyname, userlist: test,roleid :sess.roleid  });
               
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



https
  .createServer(
    {
      key: fs.readFileSync('/etc/letsencrypt/live/myproject-desk.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/myproject-desk.com/cert.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/myproject-desk.com/fullchain.pem'),
    },
    app
  )
  .listen(443, () => {
    console.log('Listening...')
  })



