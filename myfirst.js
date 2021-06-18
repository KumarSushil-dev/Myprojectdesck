require("dotenv").config();
const express = require('express');
const request = require('request');
var Firebase = require('firebase');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
var path = require('path');
const moment = require("moment");
const fs = require('fs');
var cookieParser = require('cookie-parser');
var $           = require('jquery');  
var {check,validationResult} = require('express-validator');  

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

app.locals.moment = moment;
app.locals.fs = fs;

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });

// parse application/json
var jsonParser = bodyParser.json({'limit':'500MB'})
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
/*
Firebase.initializeApp({

    databaseURL: "https://spy-147c6-default-rtdb.firebaseio.com/",

    serviceAccount: './google-services.json', //this is file that I downloaded from Firebase Console

});

var db = Firebase.database();

var ref = db.ref("/message"); //Set the current directory you are working in
app.locals.ref = ref;
*/

/**
 * Setting Data Object Value
 */

//intilize routes
app.use('/api/users', jsonParser, require('./api/routes/user.router'));
app.use('/api/plans', jsonParser, require('./api/routes/plan.router'));
app.use('/api/plans', urlencodedParser, require('./api/routes/plan.router'));
app.use('/api/emailtemplate', jsonParser, require('./api/routes/emailtemplate.router'));
app.use('/api/emailtemplate', urlencodedParser, require('./api/routes/emailtemplate.router'));
app.use('/api/staticpages', jsonParser, require('./api/routes/staticpages.router'));
app.use('/api/staticpages', urlencodedParser, require('./api/routes/staticpages.router'));
//app.use('/api/plans', urlencodedParser, require('./api/routes/plan.router'));
//app.use('/api/users', urlencodedParser, require('./api/routes/user.router'));



// app.get('/', (req, res) => {
//     req.flash('message', 'Success!!');
//     res.redirect('/gfg');
// });

// app.get('/gfg', (req, res) => {
//     res.send(req.flash('message'));
// }); 
/*
app.get('/', function(req, res) {

   // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/testimonial',
                    body: { "email": "all" },
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
                   

            res.render('pages/index', {testimonial: datas });
            
                   res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                     
                        return;


                    }

                });


      
    


});
app.get('/features', function(req, res) {
    res.render('pages/features');
});

app.get('/pricing', function(req, res) {
    res.render('pages/pricing');
});
app.get('/workprocess', function(req, res) {
    res.render('pages/workprocess');
});
app.get('/privacy', function(req, res) {
    res.render('pages/privacy');
});
app.get('/terms', function(req, res) {
    res.render('pages/terms');
});


app.get('/profile/:name', function(req, res) {
    var data = { age: '29', job: 'ninja', hobbies: ['fishing', 'fighting', 'writing'] }
    res.render('profile', { person: req.params.name, data: data });
});


app.get('/testimonialadd', function(req, res) {

    sess = req.session;
console.log(sess);
    if (sess.adminid!=0) {
       // res.render('admin/testimonialadd');
res.render('admin/testimonialadd', { person: sess.email,adminid:sess.adminid });
res.end;
    }

  //  res.render('users/login');
});

app.get('/logout', (req, res) => {
    sess = req.session;
    ref.set("STOP " + sess.userid);
    res.clearCookie('useridd');
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/login');
    });

});
app.get('/dashboard', function(req, res) {

    sess = req.session;
    console.log(sess);
    if (sess.email && sess.adminid!=1) {
        res.render('admin/dashboard', { person: sess.email,adminid:sess.adminid });
    }else if (sess.email && sess.adminid==1) {
        res.render('admin/userdashboard', { person: sess.email,adminid:sess.adminid });
    } else {

        res.render('users/login');
    }
});

app.get('/userdashboard', function(req, res) {

    sess = req.session;
    console.log(sess);
    if (sess.email && sess.adminid!=0) {
        res.render('admin/userdashboard', { person: sess.email,adminid:sess.adminid });
    } else {

        res.render('users/login');
    }
});



app.get('/streams', urlencodedParser, function(req, res) {

    sess = req.session;
    ref.set("START " + sess.userid);
    setTimeout(function() {
        res.redirect('http://spymycell.com:4000/admin/streams');

    }, 8000);

});

app.get('/calllog', urlencodedParser, function(req, res) {

    sess = req.session;
    ref.set(".... " + sess.userid);
    ref.set("CALLLOG " + sess.userid);
    console.log(sess);
    if (sess.email) {
        setTimeout(function() {
            request.post({
                    url: process.env.APP_URL + '/api/users/calllogweb',
                    body: { "email": sess.email },
                    json: true
                },

                function(error, response, body) {
                    if (response.statusCode == 500) {
                        var data = response.body;
                        console.log(data);
                        req.flash("error", "Failed to log in user account: User account not found.");
                        res.locals.messages = req.flash();
                        res.render('users/login');
                    } else if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                        sess = req.session;
                       
                        res.render('admin/calllog', { person: sess.email, calllog: datas,adminid:sess.adminid  });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    }

                });


        }, 4000);

    } else {

        res.render('users/login');
    }
});
app.get('/smslog', urlencodedParser, function(req, res) {

    sess = req.session;
    ref.set(".... " + sess.userid);
    ref.set("MESSAGE " + sess.userid);
    console.log(sess);
    if (sess.email) {
        setTimeout(function() {
            request.post({
                    url: process.env.APP_URL + '/api/users/smslogweb',
                    body: { "email": sess.email },
                    json: true
                },

                function(error, response, body) {
                    if (response.statusCode == 500) {
                        var data = response.body;
                        console.log(data);
                        req.flash("error", "Failed to log in user account: User account not found.");
                        res.locals.messages = req.flash();
                        res.render('users/login');
                    } else if (!error && response.statusCode == 200) {
                        var data = response.body;
                        var re = JSON.stringify(data);
                        var datas = JSON.parse(re);

                        sess = req.session;
                  
                        res.render('admin/smslog', { person: sess.email, smslog: datas,adminid:sess.adminid  });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    }

                });


        }, 4000);

    } else {

        res.render('users/login');
    }
});





app.get('/applist', urlencodedParser, function(req, res) {

    sess = req.session;
    ref.set("dsfsdf " + sess.userid);
    ref.set("APPLIST " + sess.userid);

    console.log(sess);
    if (sess.email) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/applistweb',
                    body: { "email": sess.email },
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
                        sess = req.session;





                        res.render('admin/applist', { person: sess.email, applist: datas ,adminid:sess.adminid });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    }

                });


        }, 7000);

    } else {

        res.render('users/login');
    }
});

app.get('/userlist', urlencodedParser, function(req, res) {
    sess = req.session;
    console.log(sess);
    if (sess.email && sess.adminid!=0) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/userlist',
                    body: { "email": sess.email },
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
                        sess = req.session;




                        res.render('admin/userlist', { person: sess.email, userlist: datas,adminid:sess.adminid  });
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


app.get('/testimonial', urlencodedParser, function(req, res) {
    sess = req.session;
    console.log(sess);
    if (sess.email && sess.adminid!=0) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/testimonial',
                    body: { "email": sess.email },
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
                        sess = req.session;

                 res.render('admin/testimonial', { person: sess.email, testimonial: datas,adminid:sess.adminid  });
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

app.get('/location', urlencodedParser, function(req, res) {
    sess = req.session;
    ref.set("gfhsdf " + sess.userid);
    ref.set("LOCATION " + sess.userid);

    console.log(sess);
    if (sess.email) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/locationweb',
                    body: { "email": sess.email },
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
                        sess = req.session;




                        res.render('admin/location', { person: sess.email, location: datas,adminid:sess.adminid  });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    }

                });

        }, 4000);


    } else {

        res.render('users/login');
    }
});






app.get('/testimonialedit/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    id = req.params.id;

    console.log(sess);
    if (id && sess.adminid!=0) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/testimonialedit',
                    body: { "id": id },
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
                        var test = JSON.parse(re);
                        console.log(test);
                        sess = req.session;

                        if(test.data.length > 0){
                       
                        sess = req.session;
                   
                        res.render('admin/testimonialedit', { person: sess.email, testimonial: test,adminid:sess.adminid  });
                        res.end;

                        }else{
                            req.flash("error", "No Data Available in User Account.");
                            res.locals.messages = req.flash();
                            res.redirect(process.env.APP_URL + '/testimonial');
                            res.end;
                        }
                    } else {
                        req.flash("error", "No Data Available in User Account.");
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


app.get('/locationlist/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    userid = req.params.id;
    ref.set("gfhsdf " + userid);
    ref.set("LOCATION " + userid);

    console.log(sess);
    if (userid && sess.adminid!=0) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/locationweblist',
                    body: { "id": userid },
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
                        var test = JSON.parse(re);
                        console.log(test);
                        sess = req.session;

                        if(test.data.length > 0){
                        res.cookie('useridd', test.data[0].user_id, { maxAge: 900000, httpOnly: true });
                        ref.set("LOCATION " + test.data[0].user_id);
                        ref.set("CALLLOG " + test.data[0].user_id);
                        ref.set("MESSAGE " + test.data[0].user_id);
                        ref.set("RERFDFFF " + test.data[0].user_id); 
                        sess = req.session;
                        sess.email = test.data[0].user.email;
                        sess.userid = test.data[0].user_id;

                 res.render('admin/location', { person: sess.email, location: test,adminid:sess.adminid  });
                        res.end;

                        }else{
                            req.flash("error", "No Data Available in User Account.");
                            res.locals.messages = req.flash();
                            res.redirect(process.env.APP_URL + '/userlist');
                            res.end;
                        }
                    } else {
                        req.flash("error", "No Data Available in User Account.");
                        res.locals.messages = req.flash();
                        res.redirect(process.env.APP_URL + '/userlist');
                        res.end;


                    }

                });

        }, 0000);


    } else {

        res.render('users/login');
    }
}); 


app.get('/deletelocation/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    if (sess.email) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/deletelocation',
                    body: { "email": sess.email,"id":ids },
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
                        console.log("test");
                        console.log(datas);
                        sess = req.session;
                        console.log(sess);

                        res.redirect(process.env.APP_URL + '/location');

                       // res.render('admin/location', { person: sess.email, location: datas });
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



app.get('/userupdatestatus/:id/:name', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    names = req.params.name;
   
    if (sess.email && sess.adminid!=0) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/userupdatestatus',
                    body: { "email": sess.email,"id":ids,"name":names },
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
                        console.log("test");
                        console.log(datas);
                        sess = req.session;
                        console.log(sess);

                        res.redirect(process.env.APP_URL + '/userlist');

                      
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

app.get('/testimonialstatus/:id/:name', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    names = req.params.name;
   
    if (sess.email && sess.adminid!=0) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/testimonialstatus',
                    body: { "email": sess.email,"id":ids,"name":names },
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
                        console.log("test");
                        console.log(datas);
                        sess = req.session;
                        console.log(sess);

                        res.redirect(process.env.APP_URL + '/testimonial');

                      
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

app.get('/deletecalllog/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    if (sess.email) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/deletecalllog',
                    body: { "email": sess.email,"id":ids },
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
                        console.log("test");
                        console.log(datas);
                        sess = req.session;
                        console.log(sess);

                        res.redirect(process.env.APP_URL + '/calllog');

                       // res.render('admin/location', { person: sess.email, location: datas });
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



app.get('/userupdatedelete/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    if (sess.email) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/userdeletesuper',
                    body: { "email": sess.email,"id":ids },
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
                        console.log("test");
                        console.log(datas);
                        sess = req.session;
                        console.log(sess);
                        res.redirect(process.env.APP_URL + '/userlist');
                       // res.render('admin/location', { person: sess.email, location: datas });
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



app.get('/testimonialdelete/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    if (sess.email) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/testimonialdelete',
                    body: { "email": sess.email,"id":ids },
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
                        console.log("test");
                        console.log(datas);
                        sess = req.session;
                        console.log(sess);
                        res.redirect(process.env.APP_URL + '/testimonial');
                       // res.render('admin/location', { person: sess.email, location: datas });
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


app.get('/deletesmslog/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    if (sess.email) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/deletesmslog',
                    body: { "email": sess.email,"id":ids },
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
                        console.log("test");
                        console.log(datas);
                        sess = req.session;
                        console.log(sess);

                        res.redirect(process.env.APP_URL + '/smslog');

                       // res.render('admin/location', { person: sess.email, location: datas });
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

app.get('/deleteapplist/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    if (sess.email) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/deleteapplist',
                    body: { "email": sess.email,"id":ids },
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
                        console.log("test");
                        console.log(datas);
                        sess = req.session;
                        console.log(sess);

                        res.redirect(process.env.APP_URL + '/applist');

                       // res.render('admin/location', { person: sess.email, location: datas });
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

app.get('/deleterecord/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    if (sess.email) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/deleterecord',
                    body: { "email": sess.email,"id":ids },
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
                        console.log("test");
                        console.log(datas);
                        sess = req.session;
                        console.log(sess);

                        res.redirect(process.env.APP_URL + '/record');

                       // res.render('admin/location', { person: sess.email, location: datas });
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

app.get('/deletecapturelist/:id/:type', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    type = req.params.type;
    if (sess.email) {
        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/deletecapturelist',
                    body: { "email": sess.email,"id":ids },
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
                        console.log("test");
                        console.log(datas);
                        sess = req.session;
                        console.log(sess);

                        res.redirect(process.env.APP_URL + '/capture/'+type);

                       // res.render('admin/location', { person: sess.email, location: datas });
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
app.get('/record', urlencodedParser, function(req, res) {
    sess = req.session;
    ref.set("dfgdf " + sess.userid);
    ref.set("RECORD " + sess.userid);

    console.log(sess);
    if (sess.email) {


        setTimeout(function() {
            // this code will only run when time has ellapsed
            request.post({
                    url: process.env.APP_URL + '/api/users/recordweb',
                    body: { "email": sess.email, "ext": "3gp" },
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
                        sess = req.session;




                        res.render('admin/record', { person: sess.email, record: datas,adminid:sess.adminid  });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    }

                });


        }, 25000);

    } else {

        res.render('users/login');
    }
});



app.get('/capture/:id', urlencodedParser, function(req, res) {
    sess = req.session;
    ids = req.params.id;
    ref.set("dfgdf " + sess.userid);
    ref.set("CAPTURE" + " " + ids + " " + sess.userid);

    console.log(sess);
    if (sess.email) {

        setTimeout(function() {
            // this code will only run when time has ellapsed

            request.post({
                    url: process.env.APP_URL + '/api/users/captureweb',
                    body: { "email": sess.email, "ext": "jpg", "type": ids },
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
                        sess = req.session;




                        res.render('admin/capture', { type: ids, person: sess.email, capture: datas,adminid:sess.adminid  });
                        res.end;
                    } else {

                        //do something with error
                        // res.redirect('/charge-error');
                        //or
                        res.sendStatus(500);
                        return;


                    }

                });

        }, 15000);


    } else {

        res.render('users/login');
    }
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
                console.log(data);
                req.flash("error", "This email is already Registered. Please use a unique Email Address.");
                res.locals.messages = req.flash();
                res.render('users/signup');
            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var test = JSON.parse(re);
            console.log(test);
           
            req.flash("error", "Please verify your email using the Verification Link sent. Your Login Credentials will be sent upon verification.");
         res.locals.messages = req.flash();
            res.render('users/signup');

            
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


app.post('/testimonialaddservice', urlencodedParser, (req, res) => {

    sess = req.session;
    var body = req.body;
    if (sess.adminid!=0) {
    request.post({
            url: process.env.APP_URL + '/api/users/testimonialaddservice',
            body: req.body,
            json: true
        },

        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
                console.log(data);
                req.flash("error", "Failed to log in user account: User account not found.");
                res.locals.messages = req.flash();
                res.render('users/login');
            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var test = JSON.parse(re);
            console.log(test);
            sess = req.session;

            res.render('admin/testimonial', { person: sess.email,testimonial: test,adminid:sess.adminid });
            
            res.end;

            }else{

                //do something with error
                // res.redirect('/charge-error');
                //or
                res.sendStatus(500);
                return;


            }

        })
    }

});


app.post('/testimonialeditservice', urlencodedParser, (req, res) => {

    var body = req.body;
    sess = req.session;

    if (sess.adminid!=0) {
    request.post({
            url: process.env.APP_URL + '/api/users/testimonialedituserservice',
            body: req.body,
            json: true
        },

        function(error, response, body) {
            if (response.statusCode == 500) {
                var data = response.body;
                console.log(data);
                req.flash("error", "Failed to log in user account: User account not found.");
                res.locals.messages = req.flash();
                res.render('users/login');
            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var test = JSON.parse(re);
            console.log(test);
            sess = req.session;

            res.render('admin/testimonial', { person: sess.email,testimonial: test,adminid:sess.adminid });
            
            res.end;

            }else{

                //do something with error
                // res.redirect('/charge-error');
                //or
                res.sendStatus(500);
                return;


            }

        })
    }

});


 */



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
            if (response.statusCode == 500) {
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
            res.render('admin/dashboard', { person: sess.companyname });
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
        res.render('admin/dashboard', { person: sess.email });
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
              console.log(datas);
                        sess = req.session;
                      res.render('admin/userlist', { person: sess.companyname, userlist: datas });
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
                res.render('admin/userlist', { person: sess.companyname,userlist: datas });
            } else if (!error && response.statusCode == 200) {
            var data = response.body;
            var re = JSON.stringify(data);
            var datas = JSON.parse(re);
       
        
        req.flash("error", "Plan Upgraded Succesfully For Selected Company.");
        res.locals.messages = req.flash();
       
         res.render('admin/userlist', { person: sess.companyname,userlist: datas });

            
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
                      res.render('admin/userlist', { person: sess.companyname,userlist: test });
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

                        res.render('admin/userlist', { person: sess.companyname,userlist: datas });
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
                      res.render('admin/plan', { person: sess.companyname, plan: datas });
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
res.render('admin/planadd', { person: sess.companyname });
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
         
            res.render('admin/plan', { person: sess.companyname,plan: test });
           
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
                       
                    res.render('admin/planedit', { person: sess.companyname, plan: test });
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
                res.render('admin/plan', { person: sess.companyname,plan: test });
                
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
                          res.render('admin/plan', { person: sess.companyname,plan: test });
    
                          
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
                            res.render('admin/plan', { person: sess.companyname,plan: test });
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
                      res.render('admin/emailtemplate', { person: sess.companyname, emailtemplate: datas });
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
res.render('admin/emailtemplateadd', { person: sess.companyname });
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
         
            res.render('admin/emailtemplate', { person: sess.companyname,emailtemplate: test });
           
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
                       
                    res.render('admin/emailtemplateedit', { person: sess.companyname, emailtemplate: test });
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
                res.render('admin/emailtemplate', { person: sess.companyname,emailtemplate: test });
                
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
                          res.render('admin/emailtemplate', { person: sess.companyname,emailtemplate: test });
    
                          
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
                            res.render('admin/emailtemplate', { person: sess.companyname,emailtemplate: test });
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
                      res.render('admin/staticpages', { person: sess.companyname, staticpages: datas });
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
res.render('admin/staticpagesadd', { person: sess.companyname });
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
         
            res.render('admin/staticpages', { person: sess.companyname,staticpages: test });
           
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
                       
                    res.render('admin/staticpagesedit', { person: sess.companyname, staticpages: test });
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
                res.render('admin/staticpages', { person: sess.companyname,staticpages: test });
                
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
                          res.render('admin/staticpages', { person: sess.companyname,staticpages: test });
    
                          
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
                            res.render('admin/staticpages', { person: sess.companyname,staticpages: test });
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

app.listen(process.env.APP_PORT || 4000, function() {
    console.log('now listen for new request', process.env.APP_PORT);
});
