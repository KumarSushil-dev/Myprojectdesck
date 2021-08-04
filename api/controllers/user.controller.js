const {getcountry,getstate,getSearchid,getstateselect,login,create,checkifemailexist,getuser,userupdatestatusbyid,userdeletesuperbyid,getemailtemplate,getcompanysettingsid,getemailtemplateone,saveuserpunch,savetaskstartid,savebreakstartid,savebreakstopid,savetaskstopid,saveuserpunchout,activationverificationid,getplan,getsubscriptionidcreated,planupgradesbyid,getDetailid,getsubscriptionid,getsubscriptiondetailid,addsubscriptionsid,getuserbiling,getadmin,editprofileid,viewdetailid,getsitesettings,useredit,sitesettingedit,passwordedit,getuserbilingcompany,getselectedcompanydetail,updatepaymentid,datatransferid,getproductivityinfo,getproductivityinfoweb,getproductivityinfototalweb,getusercompany,addcompanyuserid,checkemailexistid,getattendence,checkiftodaydateexistuserid,getcpaturescrreninterval,getsnapshotsinfo,breaklistget,tasklistget,activeactivityget,getapps,applisttransfer,getproductivityinfomonth,usereditprofile,activeactivitygetweb,activeactivitygetupdate,getuserfortimeline,getuserfortimelinesecond,gettimeline,companysettingsid,dailyattendanceget,getdailyattendancesearch,dailyattendancegetupdated,monthlyattendanceget,monthlyinoutget,getprojectsmain,getcompanytask,getprojectsmainadd,getcompanyprojects,gettaskview,getprojectsmainedit,projecttasklistget,activitytasklistget,getpriority,taskaddget,checkifdataexist,gettodayinfo,monthlyattendancegetnext,getapplist,gettodayproductivity,gettodayproductivityasc,getlatestsnapshot,getapplistusage,savetaskstopidmanually,gettodayproductivitytry,gettodayproductivitytrytotal,checksubscription,getuserfortotal,userupdatestatusteambyid,checksubscriptiontall,getproductivitysid,gettodayproductivitytrysearch,gettodayproductivitytrytotalsearch,getsnapshotsinfosearch,getsnapshotmoredetail,deletemultipleentry,getlastpunchin,monthlyattendancegetsearch,monthlyinoutgetsearch,gettimelinesearch ,getappssearch,getproductivityinfowebsearch,activeactivitygetwebsearch,getproductivityinfototalwebsearch} = require('../users/user.service');
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



// Add Planlist
companysettings: (req, res) => {
    const body = req.body;
    body.userid=req.decoded.result[0].id;
    companysettingsid(body, (err, results) => {
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
                detail: "Settings Not Added , Try Again later."

            });
        }

   
        return res.status(200).json({
            success: true,
            data: results,
            detail: ""
          });
       

    });

},
getproductivity: (req, res) => {
  
    const body = req.body;
    body.userid=req.decoded.result[0].id;

    body.startdate=moment(body.startdate).startOf('day').format('YYYY-MM-DD HH:mm:ss');  
    body.enddate=moment(body.enddate).endOf('day').format('YYYY-MM-DD HH:mm:ss');    
    
   var startdates=body.startdate;
   var enddates=body.enddate;
   console.log(body);
    gettodayproductivitytrysearch(body, (err, results) => {
        gettodayproductivitytrytotalsearch(body, (err, resultstotal) => {
        if (err) {
            console.log(err);
          return res.status(500).json({
                success: false,
                data: [],
                message: "Connection Error."
            });
        }

       
   
        return res.status(200).json({
            success: true,
            data: results,
            datatotal:resultstotal,
            startdates:startdates,
            enddates:enddates,
            detail: ""
          });
       
        });
    });


},

// Add Planlist
applicationusage: (req, res) => {
    const body = req.body;
    body.userid=req.decoded.result[0].id;
    getapplistusage(body, (err, results) => {
        if (err) {
            console.log(err);
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

// Add Planlist
gettodayproductivitytr: (req, res) => {
    const body = req.body;
    body.userid=req.decoded.result[0].id;
    gettodayproductivitytry(body, (err, results) => {
        gettodayproductivitytrytotal(body, (err, resultstotal) => {
        if (err) {
            console.log(err);
          return res.status(500).json({
                success: false,
                data: [],
                message: "Connection Error."
            });
        }

       
   
        return res.status(200).json({
            success: true,
            data: results,
            datatotal:resultstotal,
            detail: ""
          });
       
        });
    });

},

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
                  getattendence(body, (err, resultlogs) => {
                        getapps(body, (err, resultapps) => {
                         //   console.log(resultapps);
                        var twoHoursBefore = new Date();
                        twoHoursBefore.setHours(twoHoursBefore.getHours() - 2);
                     
                        var endHoursBefore = new Date();
                        endHoursBefore.setHours(endHoursBefore.getHours() + 1)
                        let x = 60; //minutes interval
                        let times = []; // time array
                        let tt=(twoHoursBefore.getHours())*60; // start time
                     let endt=endHoursBefore.getHours();
                 
                        //loop to increment the time and push results in array
                        for (let i=0;tt<endt*60; i++) {
                            let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
                            let sh=hh+1;
                            let mm = (tt%60); // getting minutes of the hour in 0-55 format
                          times[i] = ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00") + '-' + ("0" + (sh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00"); // pushing data in array in [00:00 - 12:00 AM/PM format]
                          tt = tt + x;
                        }
                     // console.log(times);

                        var new_arr = times.reverse();


                        body.times=new_arr;
                        const startdate = new Date();
                        body.startdate=moment(startdate).format('YYYY-MM-DD');
                   
            getsnapshotsinfo(body, (err, productivityresults) => {
             //   console.log(productivityresults);
  getproductivityinfoweb(body, (err, resultsweb) => {
    
    getproductivityinfototalweb(body, (err, resultstotalweb) => {
        getproductivityinfomonth(body, (err, resultstotalwebmonth) => {
            activeactivitygetweb(body, (err, resultsactiveactivityget) => {
 if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            logss:resultlogs,
            snapshotdata: productivityresults,
            appslist:resultapps,
            productivityinfoweb:resultsweb,
            totalwebresult:resultstotalweb,
            totalwebresultwebmonth:resultstotalwebmonth,
            activeactivitygetresult:resultsactiveactivityget,
            timesarr:new_arr
          });

        }else{

            return res.status(200).json({
            success: false,
            data: [],
            logss:resultlogs,
            snapshotdata: productivityresults,
            appslist:resultapps,
            productivityinfoweb:resultsweb,
            totalwebresult:resultstotalweb,
            totalwebresultwebmonth:resultstotalwebmonth,
            activeactivitygetresult:resultsactiveactivityget,
            timesarr:new_arr

            });

        }
    });
    });
    });
    });
    });
    });
    });
  
});

},


// Get Selected User Detail
getviewdetail:(req, res) => {
    const body = req.body;
    body.userid=body.id
    body.userids=body.id;
    
    var ids=body.id;
    body.startdate=moment(body.startdate).startOf('day').format('YYYY-MM-DD HH:mm:ss');  
         body.enddate=moment(body.enddate).endOf('day').format('YYYY-MM-DD HH:mm:ss');    
                                    
            var startdates=body.startdate;
           var enddates=body.enddate;
    
    viewdetailid(body, (err, results) => {
        if (err) {
          return res.status(500).json({
                success: false,
                data: [],
                detail: "Connection Error."
            });
        }
                  getattendence(body, (err, resultlogs) => {
                    getappssearch(body, (err, resultapps) => {
                         //   console.log(resultapps);
                        var twoHoursBefore = new Date();
                        twoHoursBefore.setHours(twoHoursBefore.getHours() - 2);
                     
                        var endHoursBefore = new Date();
                        endHoursBefore.setHours(endHoursBefore.getHours() + 1)
                        let x = 60; //minutes interval
                        let times = []; // time array
                        let tt=(twoHoursBefore.getHours())*60; // start time
                     let endt=endHoursBefore.getHours();
                 
                        //loop to increment the time and push results in array
                        for (let i=0;tt<endt*60; i++) {
                            let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
                            let sh=hh+1;
                            let mm = (tt%60); // getting minutes of the hour in 0-55 format
                          times[i] = ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00") + '-' + ("0" + (sh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00"); // pushing data in array in [00:00 - 12:00 AM/PM format]
                          tt = tt + x;
                        }
                     // console.log(times);

                        var new_arr = times.reverse();


                        body.times=new_arr;
                       
                   
                        getsnapshotsinfosearch(body, (err, productivityresults) => {
             //   console.log(productivityresults);
             getproductivityinfowebsearch(body, (err, resultsweb) => {
    
                getproductivityinfototalwebsearch(body, (err, resultstotalweb) => {
        getproductivityinfomonth(body, (err, resultstotalwebmonth) => {
            activeactivitygetwebsearch(body, (err, resultsactiveactivityget) => {
 if (results) {
        return res.status(200).json({
            success:true,
            data: results,
            logss:resultlogs,
            ids:ids,
            snapshotdata: productivityresults,
            appslist:resultapps,
            productivityinfoweb:resultsweb,
            totalwebresult:resultstotalweb,
            startdates:startdates,
            enddates:enddates,
            totalwebresultwebmonth:resultstotalwebmonth,
            activeactivitygetresult:resultsactiveactivityget,
            timesarr:new_arr
          });

        }else{

            return res.status(200).json({
            success: false,
            data: [],
            ids:ids,
            logss:resultlogs,
            snapshotdata: productivityresults,
            appslist:resultapps,
            productivityinfoweb:resultsweb,
            totalwebresult:resultstotalweb,
            startdates:startdates,
            enddates:enddates,
            totalwebresultwebmonth:resultstotalwebmonth,
            activeactivitygetresult:resultsactiveactivityget,
            timesarr:new_arr

            });

        }
    });
    });
    });
    });
    });
    });
    });
  
});

},

// Get Selected User Detail
snapshotdetail:(req, res) => {
    const body = req.body;
    body.userid=req.decoded.result[0].id;
   
    viewdetailid(body, (err, results) => {
       var twoHoursBefore = new Date();
        twoHoursBefore.setHours(twoHoursBefore.getHours() - 1);
        var endHoursBefore = new Date();
                        endHoursBefore.setHours(endHoursBefore.getHours() + 1)
                        let x = 60; //minutes interval
                        let times = []; // time array
                        let tt=(twoHoursBefore.getHours())*60; // start time
                     let endt=endHoursBefore.getHours();
                 
                        //loop to increment the time and push results in array
                        for (let i=0;tt<endt*60; i++) {
                            let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
                            let sh=hh+1;
                            let mm = (tt%60); // getting minutes of the hour in 0-55 format
                          times[i] = ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00") + '-' + ("0" + (sh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00"); // pushing data in array in [00:00 - 12:00 AM/PM format]
                          tt = tt + x;
                        }
                       // console.log(times);

                        var new_arr = times.reverse();
                      body.times=new_arr;
                        const startdate = new Date();
                        body.startdate=moment(startdate).format('YYYY-MM-DD');
                        getuserfortimeline(body, (err, resultss) => {
                            var ured = JSON.stringify(resultss);
                                        var utest = JSON.parse(ured);
                                        let uarray = [];  
                
                                    for (let s=0;s<utest.length; s++) {
                                        
                                    uarray[s]=utest[s].id+'_'+utest[s].firstname+' '+utest[s].lastname;
                                    } 
                                    body.userid=body.id
            getsnapshotsinfo(body, (err, productivityresults) => {
             var startdates=moment.unix(startdate).startOf('day').format('YYYY-MM-DD HH:mm:ss');  
              var enddates=moment.unix(startdate).endOf('day').format('YYYY-MM-DD HH:mm:ss');    
                                   
 if (productivityresults) {
        return res.status(200).json({
            success:true,
            data:results,
            snapshotdata: productivityresults,
            user: uarray,
            timesarr:new_arr,
            startdates:startdates,
            enddates:enddates,
            duration:1
          });

        }else{

            return res.status(200).json({
                success: false,
                data: results,
                snapshotdata: [],
                user:uarray,
                timesarr:new_arr,
                startdates:startdates,
                enddates:enddates,
                duration:1,
                detail: "No Data Listed."

            });

        }
  
   
    });
    });
    });
  
},


// Get Selected User Detail
snapshotmoredetail:(req, res) => {
    const body = req.body;
    body.userid=req.decoded.result[0].id;
    body.userids=body.id;
    
    var ids=body.id;
    var duration=body.duration;
    var startdateunix=body.startdateunix;
    var enddateunix=body.enddateunix;
    viewdetailid(body, (err, results) => {
    var twoHoursBefore = new Date();
    var sst=Number(duration)+Number(1);
    twoHoursBefore.setHours(twoHoursBefore.getHours() - sst);
    var endHoursBefore = new Date();
                        endHoursBefore.setHours(endHoursBefore.getHours() + 1)
                        let x = 60; //minutes interval
                        let times = []; // time array
                        let tt=(twoHoursBefore.getHours())*60; // start time
                     let endt=endHoursBefore.getHours();
                 
                        //loop to increment the time and push results in array
                        for (let i=0;tt<endt*60; i++) {
                            let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
                            let sh=hh+1;
                            let mm = (tt%60); // getting minutes of the hour in 0-55 format
                          times[i] = ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00") + '-' + ("0" + (sh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00"); // pushing data in array in [00:00 - 12:00 AM/PM format]
                          tt = tt + x;
                        }
                       // console.log(times);

                        var new_arr = times.reverse();
                      body.times=new_arr;
                  
                        getuserfortimeline(body, (err, resultss) => {
                            var ured = JSON.stringify(resultss);
                                        var utest = JSON.parse(ured);
                                        let uarray = [];  
                
                                    for (let s=0;s<utest.length; s++) {
                                        
                                    uarray[s]=utest[s].id+'_'+utest[s].firstname+' '+utest[s].lastname;
                                    } 
                                  

         body.startdate=moment.unix(startdateunix).startOf('day').format('YYYY-MM-DD HH:mm:ss');  
         body.enddate=moment.unix(enddateunix).endOf('day').format('YYYY-MM-DD HH:mm:ss');    
                                    
            var startdates=body.startdate;
           var enddates=body.enddate;
          console.log(body);
            getsnapshotsinfosearch(body, (err, productivityresults) => {
  
 if (productivityresults) {
        return res.status(200).json({
            success:true,
            data:results,
            snapshotdata: productivityresults,
            user: uarray,
            timesarr:new_arr,
            startdates:startdates,
            enddates:enddates,
            ids:ids,
           duration:duration
          });
         
        }else{

            return res.status(200).json({
                success: false,
                data: results,
                snapshotdata: [],
                user:uarray,
                timesarr:new_arr,
                startdates:startdates,
                enddates:enddates,
                ids:ids,
                duration:duration,
                detail: "No Data Listed."

            });

        }
  
   
    });
    });
    });
  
},
// Get Selected User Detail
getsnapshot:(req, res) => {
    const body = req.body;
    body.userid=req.decoded.result[0].id;
    body.userids=body.id;
    var ids=body.id;
    viewdetailid(body, (err, results) => {
    var twoHoursBefore = new Date();
    twoHoursBefore.setHours(twoHoursBefore.getHours() - 1);
    var endHoursBefore = new Date();
                        endHoursBefore.setHours(endHoursBefore.getHours() + 1)
                        let x = 60; //minutes interval
                        let times = []; // time array
                        let tt=(twoHoursBefore.getHours())*60; // start time
                     let endt=endHoursBefore.getHours();
                 
                        //loop to increment the time and push results in array
                        for (let i=0;tt<endt*60; i++) {
                            let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
                            let sh=hh+1;
                            let mm = (tt%60); // getting minutes of the hour in 0-55 format
                          times[i] = ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00") + '-' + ("0" + (sh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) + ':' +("00"); // pushing data in array in [00:00 - 12:00 AM/PM format]
                          tt = tt + x;
                        }
                       // console.log(times);

                        var new_arr = times.reverse();
                      body.times=new_arr;
                  
                        getuserfortimeline(body, (err, resultss) => {
                            var ured = JSON.stringify(resultss);
                                        var utest = JSON.parse(ured);
                                        let uarray = [];  
                
                                    for (let s=0;s<utest.length; s++) {
                                        
                                    uarray[s]=utest[s].id+'_'+utest[s].firstname+' '+utest[s].lastname;
                                    } 
                                  

         body.startdate=moment(body.startdate).startOf('day').format('YYYY-MM-DD HH:mm:ss');  
         body.enddate=moment(body.enddate).endOf('day').format('YYYY-MM-DD HH:mm:ss');    
                                    
            var startdates=body.startdate;
           var enddates=body.enddate;
            getsnapshotsinfosearch(body, (err, productivityresults) => {
  
 if (productivityresults) {
        return res.status(200).json({
            success:true,
            data:results,
            snapshotdata: productivityresults,
            user: uarray,
            timesarr:new_arr,
            startdates:startdates,
            enddates:enddates,
            ids:ids,
            duration:1,
          });

        }else{

            return res.status(200).json({
                success: false,
                data: results,
                snapshotdata: [],
                user:uarray,
                timesarr:new_arr,
                startdates:startdates,
                enddates:enddates,
                ids:ids,
                duration:1,
                detail: "No Data Listed."

            });

        }
  
   
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
  body.userid=req.decoded.result[0].id;
  body.payment_id=randomstring.generate(7);
  body.signature_razorpay=randomstring.generate();
  body.order_id=body.orderid;
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
                body.parent_id=test[0].parent_id;
                role_id=test[0].role_id;
              
                checksubscription(body, (err, resultschecksubscription) => {   
                    
                    if(role_id==3){ 
                    var ress = JSON.stringify(resultschecksubscription);
                    var testss = JSON.parse(ress);
                    var expiry_date = testss.expiry_date;
                    }else{
                        var expiry_date = "2021-12-09" 
                    }
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
     const jsontoken = sign({ result: results },process.env.TOKEN_SECRET, { expiresIn: '720h' });
        const planexpiry=moment(expiry_date).format('YYYY-MM-DD');

        var startdate =new Date();
      startdate = moment(startdate).format('YYYY-MM-DD');
      var checkexist = moment(startdate).isBefore(planexpiry);
if(checkexist==true){
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

    var firstname=test[0].firstname;
    if(test[0].lastname){
     firstname=test[0].firstname +' '+ test[0].lastname;
    }
    var obj = [];
    obj.push({ "token": null,"planExpiryDate":planexpiry });

                return res.status(401).json({
                    success: true,
                    data: [],
                    detail: "User Plan Expired, Contact To Adminstrator"
});



}
}else{

    return res.status(401).json({
        success: false,
        data: [],
        detail: "Invalid username or password."

    });
}

 });
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
       presence: (req, res) => {
       const body = req.body;
       body.userid=req.decoded.result[0].id;
       dailyattendanceget(body, (err, results) => {
        monthlyattendanceget(body, (err, monthresults) => {
       
       getuserfortimeline(body, (err, getuser) => {
            if (err) {
                console.log(err);
            }
         
                

                return res.status(200).json({
                    success: true,
                    data: results,
                    getuse:getuser,
                    monthlyu:monthresults
    
                });
    
    
    
         


   



        });
        });
        });

    },
    dashboards: (req, res) => {
       const body = req.body;
       body.userid=req.decoded.result[0].id;
       dailyattendanceget(body, (err, results) => {      
       getuserfortimeline(body, (err, getuser) => {
        getapplist(body, (err, getapplist) => {
            gettodayproductivity(body, (err, getproductivity) => {
                gettodayproductivityasc(body, (err, gettodayproductivityasc) => {
                     
                    getlatestsnapshot(body, (err, getlatestsnapshot) => {
                        tasklistget(body, (err, tasklistget) => {
            if (err) {
                console.log(err);
            }
            return res.status(200).json({
                    success: true,
                    data: results,
                    getuse:getuser,
                    appgroup:getapplist,
                    getproductivity:getproductivity,
                    getproductivityasc:gettodayproductivityasc,
                    getlatestsnapshot:getlatestsnapshot,
                    gettasklistget:tasklistget
    
                });
            });
        });
        });
    });
        });
     });
   
        });

    },
    projectsmain: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;
       getuserfortimelinesecond(body, (err, uarray) => {
        /*   var ured = JSON.stringify(resultss);
                                        var utest = JSON.parse(ured);
                                        let uarray = [];  
                
                                    for (let s=0;s<utest.length; s++) {
                                        
                                    uarray[s]=utest[s].id+'_'+utest[s].firstname+' '+utest[s].lastname;
                                    }  */
                                    
        getprojectsmain(body, (err, results) => {


            if (err) {

                console.log(err);
              
            }



            
            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:uarray,
                    detail: "No User Listed."

                });
            }


                

                return res.status(200).json({
                    success: true,
                    data: results,
                    user:uarray
    
    
                });
    
    
    
         


   



        });
        });

    },


    companytask: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;
       getuserfortimelinesecond(body, (err, uarray) => {
   
                                    
        getcompanytask(body, (err, results) => {

        getuserfortimeline(body, (err, getuser) => {
            if (err) {

                console.log(err);
              
            }



            
            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:uarray,
                    detail: "No User Listed."

                });
            }


                

                return res.status(200).json({
                    success: true,
                    data: results,
                    user:uarray,
                    getuse:getuser
    
    
                });
    
    
    
         


   



        });
        });
        });

    },
   
    companyprojects: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;
       getuserfortimelinesecond(body, (err, uarray) => {
       
        getcompanyprojects(body, (err, results) => {
    projecttasklistget(body, (err, resultsproject) => {
    getpriority(body, (err, resultspriority) => {
        getuserfortimeline(body, (err, getuser) => {

            if(err){
            console.log(err);
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:uarray,
                    detail: "No User Listed."

                });
            }



                return res.status(200).json({
                    success: true,
                    data: results,
                    user:uarray,
                    project:resultsproject,
                    priority:resultspriority,
                    getuse: getuser
                });
    
         });
         });
         });
        });
        });

    },
    taskview: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;
       getuserfortimelinesecond(body, (err, uarray) => {
       
        gettaskview(body, (err, results) => {
    activitytasklistget(body, (err, resultsproject) => {
   
        getuserfortimeline(body, (err, getuser) => {

            if(err){
            console.log(err);
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:uarray,
                    detail: "No User Listed."

                });
            }



                return res.status(200).json({
                    success: true,
                    data: results,
                    user:uarray,
                    task:resultsproject,
                    getuse: getuser
                });
    
         });
         });
       
        });
        });

    },
    projectsadd: (req, res) => {
        const body = req.body;
       body.userid=req.decoded.result[0].id;
       getuserfortimelinesecond(body, (err, uarray) => {
       getprojectsmainadd(body, (err, results) => {
    if(err){
    console.log(err);
            }
    if(results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:uarray,
                    detail: "No User Listed."

                });
            }


        return res.status(200).json({
                    success: true,
                    data: results,
                    user:uarray
           });
    
    
    
         


   



        });
        });

    },
    projectsedit: (req, res) => {
    const body = req.body;
       body.userid=req.decoded.result[0].id;
       getuserfortimelinesecond(body, (err, uarray) => {
       getprojectsmainedit(body, (err, results) => {
        projecttasklistget(body, (err, resultsproject) => {
            getpriority(body, (err, resultspriority) => {
                getuserfortimeline(body, (err, getuser) => {
    if(err){
    console.log(err);
            }
    if(results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:uarray,
                    detail: "No User Listed."

                });
            }


        return res.status(200).json({
                    success: true,
                    data: results,
                    user:uarray,
                    project:resultsproject,
                    priority:resultspriority,
                    getuse: getuser
           });
    
    
    
         


   



        });
        });
        });
        });
        });

    },
    taskadd: (req, res) => {
    const body = req.body;
       body.userid=req.decoded.result[0].id;
       getuserfortimelinesecond(body, (err, uarray) => {
        taskaddget(body, (err, results) => {
            body.id=body.projects_id;
        projecttasklistget(body, (err, resultsproject) => {
            getpriority(body, (err, resultspriority) => {
                getuserfortimeline(body, (err, getuser) => {
    if(err){
    console.log(err);
            }
    if(results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:uarray,
                    detail: "No User Listed."

                });
            }


        return res.status(200).json({
                    success: true,
                    data: results,
                    user:uarray,
                    project:resultsproject,
                    priority:resultspriority,
                    getuse: getuser
           });
    
    
    
         


   



        });
        });
        });
        });
        });

    },
    dailyattendance: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;
     
       dailyattendancegetupdated(body, (err, results) => {
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
    getdailyattendance: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;
       body.startdate=moment(body.startdate).startOf('day').format('YYYY-MM-DD HH:mm:ss');  
       body.enddate=moment(body.enddate).endOf('day').format('YYYY-MM-DD HH:mm:ss');    
       
      var startdates=body.startdate;
      var enddates=body.enddate;
       getdailyattendancesearch(body, (err, results) => {
            if (err) {

                console.log(err);
              
            }


            
            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    startdates:startdates,
            enddates:enddates,
                    detail: "No User Listed."

                });
            }


                

                return res.status(200).json({
                    success: true,
                    data: results,
                    startdates:startdates,
                  enddates:enddates,
    
    
                });
    
    
    
         


   



        });

    },
    monthlyattendance: (req, res) => {

        const body = req.body;

       body.userid=req.decoded.result[0].id;
       getuserfortimeline(body, (err, resultss) => {
        var ured = JSON.stringify(resultss);
                    var utest = JSON.parse(ured);
                    let uarray = [];  

                for (let s=0;s<utest.length; s++) {
                    
                uarray[s]=utest[s].id+'_'+utest[s].firstname+' '+utest[s].lastname;
                } 
       monthlyattendanceget(body, (err, results) => {
            if (err) {

                console.log(err);
              
            }


            
            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:uarray,
                    detail: "No User Listed."

                });
            }

          return res.status(200).json({
                    success: true,
                    user:uarray,
                    data: results
         });
         });
    
    
    
         


   



        });

    },
    getmonthlyattendance: (req, res) => {

        const body = req.body;

       body.userid=req.decoded.result[0].id;
      
      var startdates=body.startdate;
     console.log(body);
       getuserfortimeline(body, (err, resultss) => {
        var ured = JSON.stringify(resultss);
                    var utest = JSON.parse(ured);
                    let uarray = [];  

                for (let s=0;s<utest.length; s++) {
                    
                uarray[s]=utest[s].id+'_'+utest[s].firstname+' '+utest[s].lastname;
                } 
       monthlyattendancegetsearch(body, (err, results) => {
            if (err) {

                console.log(err);
              
            }


            
            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:uarray,
                    startdates:startdates,
                    detail: "No User Listed."

                });
            }

          return res.status(200).json({
                    success: true,
                    user:uarray,
                    startdates:startdates,
                    data: results
         });
         });
    
    
    
         


   



        });

    },
    monthlyinout: (req, res) => {

        const body = req.body;

       body.userid=req.decoded.result[0].id;
       getuserfortimeline(body, (err, resultss) => {
        var ured = JSON.stringify(resultss);
                    var utest = JSON.parse(ured);
                    let uarray = [];  

                for (let s=0;s<utest.length; s++) {
                    
                uarray[s]=utest[s].id+'_'+utest[s].firstname+' '+utest[s].lastname;
                } 
                monthlyinoutget(body, (err, results) => {
            if (err) {

                console.log(err);
              
            }


            
            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:uarray,
                    detail: "No User Listed."

                });
            }

          return res.status(200).json({
                    success: true,
                    user:uarray,
                    data: results
         });
         });
    
    
    
         


   



        });

    },
    getmonthlyinout: (req, res) => {

        const body = req.body;

       body.userid=req.decoded.result[0].id;
       var startdates=body.startdate;
       getuserfortimeline(body, (err, resultss) => {
        var ured = JSON.stringify(resultss);
                    var utest = JSON.parse(ured);
                    let uarray = [];  

                for (let s=0;s<utest.length; s++) {
                    
                uarray[s]=utest[s].id+'_'+utest[s].firstname+' '+utest[s].lastname;
                } 
                monthlyinoutgetsearch(body, (err, results) => {
            if (err) {

                console.log(err);
              
            }


            
            if (results.length === 0) {
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:uarray,
                    startdates:startdates,
                    detail: "No User Listed."

                });
            }

          return res.status(200).json({
                    success: true,
                    user:uarray,
                    startdates:startdates,
                    data: results
         });
         });
    
    
    
         


   



        });

    },
    getcompanysettings: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;
       getcompanysettingsid(body, (err, results) => {
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
    timeline: (req, res) => {
  
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
    
        getuserfortimeline(body, (err, resultss) => {
            var ured = JSON.stringify(resultss);
                        var utest = JSON.parse(ured);
                        let uarray = [];  

                    for (let s=0;s<utest.length; s++) {
                        
                    uarray[s]=utest[s].id+'_'+utest[s].firstname+' '+utest[s].lastname;
                    } 

        
        body.user=uarray;
        gettimeline(body, (err, results,productivetotal,idletotal) => {

           
            if (err) {
              
              return res.status(200).json({
                    success: false,
                    data: [],
                    detail: "Connection Error."
                });
            }
          
         
    
            if (results) {
    
               
            return res.status(200).json({
                success:true,
                data: results,
                user: uarray,
                detail: "Productivity Info"
              });
    
            }else{
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:[],
                    detail: "No Productivity Listed."
    
                });
    
            }
    
        });
        });

    },

    gettimelineport: (req, res) => {
  
        const body = req.body;
        body.userid=req.decoded.result[0].id;
        body.startdate=moment(body.startdate).startOf('day').format('YYYY-MM-DD');  
        body.enddate=moment(body.enddate).endOf('day').format('YYYY-MM-DD');    
        
       var startdates=body.startdate;
       var enddates=body.enddate;
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
      //  const startdate = new Date();
      //  body.startdate=moment(startdate).format('YYYY-MM-DD');
        getuserfortimeline(body, (err, resultss) => {
            var ured = JSON.stringify(resultss);
                        var utest = JSON.parse(ured);
                        let uarray = [];  

                    for (let s=0;s<utest.length; s++) {
                        
                    uarray[s]=utest[s].id+'_'+utest[s].firstname+' '+utest[s].lastname;
                    } 

        
        body.user=uarray;
        gettimelinesearch(body, (err, results,productivetotal,idletotal) => {

           
            if (err) {
              
              return res.status(200).json({
                    success: false,
                    data: [],
                    detail: "Connection Error."
                });
            }
          
         
    
            if (results) {
    
            return res.status(200).json({
                success:true,
                data: results,
                user: uarray,
                startdates:startdates,
                enddates:enddates,
                detail: "Timeline Info"
              });
    
            }else{
                return res.status(200).json({
                    success: false,
                    data: [],
                    user:[],
                    startdates:startdates,
                    enddates:enddates,
                    detail: "No Timeline Listed."
    
                });
    
            }
    
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

    userupdatestatusteam: (req, res) => {
        const body = req.body;

        body.userid=req.decoded.result[0].id;
if(body.name=='Y'){

    body.parent_id=body.userid;

    getuserfortotal(body, (err, getusertotal) => {

        var ressuser = JSON.stringify(getusertotal);
        var testssd = JSON.parse(ressuser);
        var totalcountuser = testssd[0].count;
 //console.log(totalcountuser);
checksubscription(body, (err, resultschecksubscriptions) => {
//console.log(resultschecksubscriptions);
       var ress = JSON.stringify(resultschecksubscriptions);
       var testssy = JSON.parse(ress);
     //  console.log(testss); 
        var totaluser = testssy.totaluser;
        if (totaluser =="") {
            getusercompany(body, (err, resultsd) => {
            return res.status(200).json({
                success: false,
                data: resultsd,
                detail: "According to Selected Plan, Plan Expired."
    
            });
        });
        }

        console.log(totalcountuser);
      console.log(totaluser);
        if(totalcountuser < totaluser){

            userupdatestatusteambyid(body, (err, results) => {
                if (err) {
                console.log(err);
                return;
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
                            plan:resultsf,
                         detail: "Employee Status has been Updated Successfully"
           
                        });
            
            
            
                    });
                  
                    
    
    
            
    
            }
    
            });
        }else{
            getusercompany(body, (err, resultsd) => {
            return res.status(200).json({
                success: false,
                data: resultsd,
                detail: "According to Selected Plan, Account has exceeded its Active user limit."
            });
            });

        }

    });

});
}else{
        userupdatestatusteambyid(body, (err, results) => {
            if (err) {
            console.log(err);
            return;
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
                        plan:resultsf,
                        detail: "Employee Status has been Updated Successfully"
           
        
                    });
        
        
        
                });
              
                


        

        }

        });

    }
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

    savepunchin: (req, res) => {

        const body = req.body;

       body.userid=req.decoded.result[0].id;

       body.punchInTime=moment(body.punchInTime).format('YYYY-MM-DD HH:mm:ss');
            


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
    obj.push({ "intime": intimee, "ScreenShortInterval": testgetscrren.screenshot_freq,"punchOutTimeMin": testgetscrren.idle_threshold,"logOutTimeMin": testgetscrren.idle_threshold_punchout,"is_auto_punchout":testgetscrren.is_auto_punchout});
            return res.status(200).json({
                success:true,
                data: obj
              });



        });
        });
       
      

    },
    // Save Employee Punch IN
    getinitialinfo: (req, res) => {

        const body = req.body;

       body.userid=req.decoded.result[0].id;


       checkiftodaydateexistuserid(body, (err, resultsd) => {


            if (resultsd) {

                
          var re = JSON.stringify(resultsd);
           var test = JSON.parse(re);
         
   // const intimee=test.punch_in;
const intimee=moment(test.punch_in).format('YYYY-MM-DD HH:mm:ss');
var  startdate = new Date();
var now  = moment(startdate).format('DD/MM/YYYY HH:mm:ss');
var then = moment(test.punch_in).format('DD/MM/YYYY HH:mm:ss');
var ms =  moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
    var obj = [];
    obj.push({ "intime": intimee, "duration":ms  });
            return res.status(200).json({
                success:true,
                data: obj,
                detail: "Punch In Listed."
              });
            }else{
              var obj = [];
              obj.push({ "intime": 0, "duration":0  });
              return res.status(200).json({
                  success: false,
                  data: obj,
                  detail: "No Punch In Listed."
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

// Save Break Stop
savetaskstop: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;

       body.endtime=moment(body.taskStopTime).format('YYYY-MM-DD HH:mm:ss');
       savetaskstopid(body, (err, results) => {
          
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
            var ms =  moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss");
         
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
       body.endtimes=moment(body.breakStartTime).format('YYYY-MM-DD HH:mm:ss');
       savetaskstopidmanually(body, (err, resultsmanu) => {

       savebreakstartid(body, (err, results) => {
    
            if (err) {
                //console.log(err);
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
    });


        
      

    },
    savetaskstart: (req, res) => {

        const body = req.body;

       body.userid=req.decoded.result[0].id;

       body.starttime=moment(body.taskStartTime).format('YYYY-MM-DD HH:mm:ss');
       body.endtimes=moment(body.taskStartTime).format('YYYY-MM-DD HH:mm:ss');
       savetaskstopidmanually(body, (err, resultsmanu) => {



       savetaskstartid(body, (err, results) => {
    
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
                detail: "Save Task Log Succesfully."
              });



  
        });
      
    });

        
      

    },
     // Save Employee Punch IN
     savepunchout: (req, res) => {

        
        const body = req.body;

       body.userid=req.decoded.result[0].id;

       body.puchOutTime=moment(body.puchOutTime).format('YYYY-MM-DD HH:mm:ss');
       getlastpunchin(body, (err, testresult) => {

        var ress = JSON.stringify(testresult);
        var testss = JSON.parse(ress);
        var punch_in = testss.punch_in;
     
    punch_in= moment(punch_in).format('YYYY-MM-DD HH:mm:ss');
    
      var trr2= moment(body.puchOutTime).format('X');
      var trr1=  moment(punch_in).format('X');
   
body.duration=Math.abs(trr2)-Math.abs(trr1);


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
  
if(body.firstname){

    usereditprofile(body, (err, results) => {
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
 body.userId=req.decoded.result[0].id;
var productivitycnt=body.productivityCount;
var applist=body.applist;
//body.applist=JSON.stringify(applist);
//console.log(applist.length);
body.capturetime=moment(body.capturetime).format('YYYY-MM-DD HH:mm:ss')
           
checkifdataexist(body, (err, resultschek) => {
    var re = JSON.stringify(resultschek);
    var test = JSON.parse(re);
 if(test.length === 0 && applist !="[]") {
 datatransferid(body, (err, results) => {
                body.applist= JSON.parse(body.applist);
                applisttransfer(body, (err, resultstranfer) => {
                   // console.log(resultstranfer);
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
    });
}else{

    var obj = [];
    obj.push({ "productivityCount": 0 });
    return res.status(200).json({
        success: true,
        data: obj,
        detail: "Data Already Inserted"

    });


}

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
tasklist: (req, res) => {
  
    const body = req.body;
    body.userid=req.decoded.result[0].id;

    tasklistget(body, (err, results) => {
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
    let times = [];
    const currentMoment = moment().subtract(4, 'days');
    const endMoment = moment().add(1, 'days');
    var i=0;
    while (currentMoment.isBefore(endMoment, 'day')) {
     // console.log(`Loop at ${currentMoment.format('YYYY-MM-DD')}`);
      times[i]=currentMoment.format('YYYY-MM-DD');
      currentMoment.add(1, 'days');
      i++;
    }
   // console.log(times);
    body.times=times;
    activeactivitygetupdate(body, (err, results) => {
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
todayinfo: (req, res) => {
  
    const body = req.body;
    body.userid=req.decoded.result[0].id;
    const startdate = new Date();
    body.startdate=moment(startdate).format('YYYY-MM-DD');
  
    gettodayinfo(body, (err, results) => {
        if (err) {
          return res.status(500).json({
                success: false,
                data: [],
                detail: "Connection Error."
            });
        }
        //console.log(results);
        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                data: [],
                detail: "No Activity Break Found."
            });
        }


var re = JSON.stringify(results);
var test = JSON.parse(re);
var objs=[];
var obj=[];
     
for (let hd = 0; hd < test.length; hd++) {


 if(results[hd].endtime !== null){
    objs.push({ "id":results[hd].id, "activityType": results[hd].name,"starttime": moment(results[hd].starttime).format('DD-MM-YYYY HH:mm:ss'),"endtime": moment(results[hd].endtime).format('DD-MM-YYYY HH:mm:ss'),"type":results[hd].type,"status":"Y" });
 }else{
    objs.push({ "id":results[hd].id, "activityType": results[hd].name,"starttime": moment(results[hd].starttime).format('DD-MM-YYYY HH:mm:ss'),"endtime":null,"type":results[hd].type,"status":"N"  });


 }
}

const startdater = new Date();
var dti=moment(startdater).format('DD-MM-YYYY');
//obj.push({"date": dti,"activitylist":objs});

       return res.status(200).json({
            success:true,
            date:dti,
            activitylist: objs,
            detail: "Activity Break List"
          });
 });

},

attendancerecord: (req, res) => {
  
    const body = req.body;
    body.userid=req.decoded.result[0].id;
    const startdate = new Date();
    body.startdate=moment(startdate).format('YYYY-MM-DD');
  
    monthlyattendancegetnext(body, (err, results) => {
        if (err) {
          return res.status(500).json({
                success: false,
                data: [],
                detail: "Connection Error."
            });
        }
        //console.log(results);
        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                data: [],
                detail: "No Attendance Record Found."
            });
        }


var re = JSON.stringify(results);
var test = JSON.parse(re);
var objs=[];
var obj=[];
     
for (let hd = 0; hd < test.length; hd++) {


 if(results[hd].punch_out){


  
    var duration = moment.utc(results[hd].duration*1000).format("HH:mm");
    
    objs.push({ "date": moment(results[hd].punch_in).format('DD-MM-YYYY'),"punchIn": moment(results[hd].punch_in).format('DD-MM-YYYY HH:mm:ss'),"punchOut": moment(results[hd].punch_out).format('DD-MM-YYYY HH:mm:ss'),"duration":duration });
 }else{

    var startdater = new Date();
    var now  = moment(startdater).format('DD/MM/YYYY HH:mm:ss');
    var then = moment(results[hd].punch_in).format('DD/MM/YYYY HH:mm:ss');
    var ms =  moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm"); 
    objs.push({ "date": moment(results[hd].punch_in).format('DD-MM-YYYY'),"punchIn": moment(results[hd].punch_in).format('DD-MM-YYYY HH:mm:ss'),"punchOut": "--","duration":ms });


 }
}


//obj.push({"date": dti,"activitylist":objs});

       
        return res.status(200).json({
            success:true,
            attedancerecord: objs,
            detail: "Attendance Record List"
          });

        

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



            var re = JSON.stringify(results);
            var test = JSON.parse(re);
            
            var obj=[];
             
            var arrt=[];
            for (let i = 0; i < times.length; i++) {
               var string = times[i].split('-');
               if(test.length > 0){
                   var s=1; 
                   for (let s = 0; s < test.length; s++) {
            
            
            if(string[0]==test[s][0].starttime){
                
          
               var objs=[];
    objs.push({ "starttime": test[s][0].starttime,"endtime": test[s][0].endtime,"idletime": test[s][0].idletime,"productivitytime":test[s][0].productivitytime,"productivitypercentage":test[s][0].productivitypercentage });
    obj.push(objs);
            }
                   }
               }
            }
                 


            if(totalproductinfo){
                
                var mstotalworkings = Math.floor(totalproductinfo % 3600 / 60);
                var mstotalworkingDisplays = mstotalworkings > 0 ? (mstotalworkings > 9 ? mstotalworkings : "0"+mstotalworkings) + (mstotalworkings == 1 ? "" : "") : "00";
              

            dtotalproductinfo = Number(totalproductinfo);
             var htotalproductinfo = Math.floor(dtotalproductinfo / 3600);
            var mtotalproductinfo = Math.floor(dtotalproductinfo % 3600 / 60);
                
            var totalproductinfoDisplay = htotalproductinfo > 0 ? (htotalproductinfo > 9 ? htotalproductinfo : "0"+htotalproductinfo) + (htotalproductinfo == 1 ? "" : "") : "00";
            var mtotalproductinfoDisplay = mtotalproductinfo > 0 ? (mtotalproductinfo > 9 ? mtotalproductinfo : "0"+mtotalproductinfo) + (mtotalproductinfo == 1 ? "" : "") : "00";
 



               var totalworking=totalproductinfo+totalidle;
               dtotalworking = totalworking;
              
               var htotalworking = Math.floor(dtotalworking / 3600);
            
               var mtotalworking = Math.floor(dtotalworking % 3600 / 60);
               
               var totalworkingDisplay = htotalworking > 0 ? (htotalworking > 9 ? htotalworking : "0"+htotalworking) + (htotalworking == 1 ? "" : "") : "00";
             
               var mtotalworkingDisplay = mtotalworking > 0 ? (mtotalworking > 9 ? mtotalworking : "0"+mtotalworking) + (mtotalworking == 1 ? "" : "") : "00";

               var percentagef=(Number(dtotalproductinfo)*100)/Number(dtotalworking);

               
               dtotalidle = Number(totalidle);
               var htotalidle = Math.floor(dtotalidle / 3600);
               var mtotalidle = Math.floor(dtotalidle % 3600 / 60);
               
    var totalidleDisplay = htotalidle > 0 ? htotalidle + (htotalidle == 1 ? "" : "") : "00";
    var mtotalidleDisplay = mtotalidle > 0 ? (mtotalidle > 9 ? mtotalidle : "0"+mtotalidle) + (mtotalidle == 1 ? "" : "") : "00";





            }else{
                var totalworking="";
                var totalworkingDisplay="00";
                var mtotalworkingDisplay="00";
                var percentagef="0";
            }

          var  percentagef=Math.round(percentagef);
if(percentagef >100){
    percentagef="100";
    }








        return res.status(200).json({
            success:true,
            data: obj,
            totalproductivity: totalproductinfoDisplay+':'+mtotalproductinfoDisplay,
            totalidle: totalidleDisplay+':'+mtotalidleDisplay,
            totalworking: totalworkingDisplay+':'+mtotalworkingDisplay,
            totalproductivitypercentage: percentagef+' %',
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

                getuserfortotal(body, (err, getusertotal) => {
        
            var ressuser = JSON.stringify(getusertotal);
            var testssd = JSON.parse(ressuser);
            var totalcountuser = testssd[0].count;
       //  console.log(totalcountuser);
                checksubscription(body, (err, resultschecksubscription) => {    
                    var ress = JSON.stringify(resultschecksubscription);
                    var testss = JSON.parse(ress);
                    var totaluser = testss.totaluser;

                    if (totaluser =="") {
                        return res.status(200).json({
                            success: false,
                            data: resultsd,
                            detail: "According to Selected Plan, Plan Expired."
                
                        });
                    }
                //    console.log(totaluser);
                    if(totalcountuser < totaluser){
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
                return res.status(200).json({
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


                    res.status(200).json({ detail: "Company New User has been added Successfully", message_id: info.messageId,   data: resultsd });
                });
    
    
    
            });
            });

        }

        });

    }else{


        body.lid=3;
       
            getusercompany(body, (err, resultsd) => {


        return res.status(200).json({
            success: false,
            data: resultsd,
            detail: "According to Selected Plan, Account has exceeded its user limit."

        });
    });
    }

          });
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