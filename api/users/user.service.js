const pool = require("../../config/database");
const { User,Country, State,Plan,Userattendancelog,Emailtemplate,Subscriptions,Sitesettings,Usersnapshots,Roles,Break,Usersbreakslogs,Userapplist,Task,Tasksactivities,Projects,Settings,Op,sequelize } = require('../../sequelize');
var p;
const moment = require("moment");

module.exports = {
    login: async(data, callBack) => {
        await User.findAll({
            where: {email: data.email,status:'Y'}
        }).then(loginsuccess => callBack(null, loginsuccess)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    checksubscription: async(data, callBack) => {
        await Subscriptions.findOne({
            where: {userId: data.parent_id,status:'Y'}, order:[['id','DESC']]
        }).then(loginsuccessr => callBack(null, loginsuccessr)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    checkifemailexist: async(data, callBack) => {
        await User.findAll({
            where: {email: data.email}
        }).then(emailexist => callBack(null, emailexist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    checkifdataexist: async(data, callBack) => {
        await Usersnapshots.findAll({
            where: {capturetime: data.capturetime,userId:data.userId}
        }).then(emailexist => callBack(null, emailexist)).catch(function (err) {
            return callBack(err);

          }); 
    },
    checkiftodaydateexistuserid: async(data, callBack) => {
        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        
        NOW=NOW.setDate(NOW.getDate() + 1);
        await Userattendancelog.findOne({
            where: {
                punch_in: { 
                  [Op.gt]: TODAY_START,
                  [Op.lte]: NOW
                }, punch_out:null,
                userId :data.userid
              }, order:[['id','DESC']]
        }).then(emailexist => callBack(null, emailexist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    checkemailexistid: async(data, callBack) => {
        await User.findAll({
            where: {email: data.email}
        }).then(emailexist => callBack(null, emailexist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getcompanysettingsid: async(data, callBack) => {
        await Settings.findAll({
            where: {userId: data.userid}
        }).then(emailexist => callBack(null, emailexist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getpriority: async(data, callBack) => {
        await Settings.findAll({
            where: {userId: data.userid,type:'TP',status:'Y'}, order:[['id','ASC']]
        }).then(emailexist => callBack(null, emailexist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    datatransferid: async(data, callBack) => {
        await Usersnapshots.create({userId:data.userId,productivityCount:data.productivityCount,productivitytime:data.productivitytime,screenshot:data.screenshot,totalIdleMinutes: data.totalIdleMinutes,totalKeypressCount:data.totalKeypressCount,totalMouseMovement:data.totalMouseMovement,totalClicks:data.totalClicks,capturetime:data.capturetime,applist:data.applist}).then(emailexist => callBack(null, emailexist)).catch(function (err) {

            return callBack(err);
          }); 
    },
    companysettingsid: async(data, callBack) => {
      data.status='Y';
        await Settings.create({userId:data.userid,name:data.name,type:data.type,status:data.status}).then(function(){
          Settings.findall({
              where: {userId: data.userid,status:data.status},
              order:[['id','DESC']]}).then(notes => callBack(null,notes));                      
           }).catch(function (err) {

            return callBack(err);
          }); 
    },
    applisttransfer: async(data, callBack) => {

/*
    let results = [];
    for (let i = 0; i < myParams.length; i++) {
        let x = await User.findByPk(myParams[i].id).then(async (u) => {
            if (u != null) {
                await u.update({ sal : u.sal + myParams[i].sal});
            } else {
                await User.create({id: myParams[i].id, sal: myParams[i].sal});                    
            }
        });
        results.push(x);
    }
    return results; */
  let resultst = [];
  let pending = data.applist.length;
 
 for (let i = 0; i < data.applist.length; i++) {
  
    data.applist[i].idleTime=0;
   
let x = await Userapplist.create({userId:data.userId, idleTime: data.applist[i].idleTime,count: data.applist[i].count,capturetime:data.capturetime,windowclass:data.applist[i].windowClass,applist: data.applist[i].windowName});                    


resultst.push(x);


        if (0 === --pending) {
            return callBack(null, resultst); 
            }
    }
   
   
    },
    getproductivityinfo: async(data, callBack) => {
      
      let startdate = data.startdate;
      let pending = data.times.length;
      let promises = [];
      let productivetotal =0;
      let idletotal =0;
     
        for (let i = 0; i < data.times.length; i++) {
        const  string = data.times[i].split('-');

        await  pool.query('SELECT SUM(totalIdleMinutes) as idletime,SUM(productivitytime) as productivitytime,SUM(productivityCount) as productivitypercentage FROM `users_snapshotscaptures` WHERE `userId`=? AND DATE(`capturetime`)=? AND cast(`capturetime` as time) >= ? AND cast(`capturetime` as time) <= ?', [
                data.userid,
                startdate,
                string[0],
                string[1]
            ],(error, results, fields) => {
         if (error) {
          console.log("test");
                    }
              
                 if (results.length == 0) {
                  var obj = [];
                  obj.push({ "starttime": string[0],"endtime":string[1],"idletime":0,"productivitytime":0,"productivitypercentage":"0 %" });
                        
                  promises.push(obj);
                    } else {

                if(results[0].productivitytime!== null){

                results[0].productivitytime=Number(results[0].productivitytime);
                results[0].productivitytime=Math.floor(results[0].productivitytime / 1000);
                results[0].idletime=Math.floor(results[0].idletime / 1000);
                        var obj = [];
                        productivetotal +=results[0].productivitytime;
                        idletotal+=results[0].idletime;
if(results[0].idletime){
                        didletime = Number(results[0].idletime);
                        var hidletime = Math.floor(didletime / 3600);
                        var midletime = Math.floor(didletime % 3600 / 60);
                        var sidletime = Math.floor(didletime % 3600 % 60);
                        var idletimeDisplay = hidletime > 0 ? (hidletime > 9 ? hidletime : "0"+hidletime) + (hidletime == 1 ? "" : "") : "00";
                        var midletimeDisplay = midletime > 0 ? (midletime > 9 ? midletime : "0"+midletime) + (midletime == 1 ? "" : "") : "00";
                        var sidletimeDisplay = sidletime > 0 ? (sidletime > 9 ? sidletime : "0"+sidletime) + (sidletime == 1 ? "" : "") : "00";
                      

   var idletime=idletimeDisplay+':'+midletimeDisplay+':'+sidletimeDisplay;


}else{
    var idletime ="00:00";
   
}

if(results[0].productivitytime){

    var today = new Date();
   var getHours=today.getHours()% 12;
   getHours=(getHours > 9 ? getHours : "0"+getHours);
   var getstrhr = string[0].split(':');
   var getstrhrs = string[1].split(':');
   var percentage='';
if(getHours == getstrhr[0] && getHours < getstrhrs[0]){
 
   var getMinutes=today.getMinutes();
   getMinutes=(getMinutes > 9 ? getMinutes : "0"+getMinutes);
   var mstotalworking = Math.floor(results[0].productivitytime % 3600 / 60);
   var mstotalworkingDisplay = mstotalworking > 0 ? (mstotalworking > 9 ? mstotalworking : "0"+mstotalworking) + (mstotalworking == 1 ? "" : "") : "00";
   var percentage=(Number(mstotalworkingDisplay)*100)/getMinutes;
    }else{
  var mstotalworking = Math.floor(results[0].productivitytime % 3600 / 60);
   var mstotalworkingDisplay = mstotalworking > 0 ? (mstotalworking > 9 ? mstotalworking : "0"+mstotalworking) + (mstotalworking == 1 ? "" : "") : "00";
    var percentage=(Number(mstotalworkingDisplay)*100)/60;
    }

    var percentage=Math.round(percentage);
    if(percentage >100){
      percentage="100";
      }
    dproductivitytime = Number(results[0].productivitytime);
    var hproductivitytime = Math.floor(dproductivitytime / 3600);
    var mproductivitytime = Math.floor(dproductivitytime % 3600 / 60);
    var sproductivitytime = Math.floor(dproductivitytime % 3600 % 60);
    var productivitytimeDisplay = hproductivitytime > 0 ? (hproductivitytime > 9 ? hproductivitytime : "0"+hproductivitytime) + (hproductivitytime == 1 ? "" : "") : "00";
    var mproductivitytimeDisplay = mproductivitytime > 0 ? (mproductivitytime > 9 ? mproductivitytime : "0"+mproductivitytime) + (mproductivitytime == 1 ? "" : "") : "00";
    var sproductivitytimeDisplay = sproductivitytime > 0 ? (sproductivitytime > 9 ? sproductivitytime : "0"+sproductivitytime) + (sproductivitytime == 1 ? "" : "") : "00";
  var productivitytime=productivitytimeDisplay+':'+mproductivitytimeDisplay+':'+sproductivitytimeDisplay;


}else{
    var productivitytime ="00:00";
    var percentage="0 %";
    
}


     obj.push({ "starttime": string[0],"endtime":string[1],"idletime":idletime,"productivitytime":productivitytime,"productivitypercentage":percentage+" %" });
                        
         promises.push(obj);

                        }
                    }

                    if (0 === --pending) {
                       
                       return callBack(null, promises,productivetotal,idletotal); //callback if all queries are processed
                    }

                });
        }

      
       
    },
    gettimeline: async(data, callBack) => {
      
      let startdate = data.startdate;
      let pending = data.times.length*data.user.length;
      let promisestotal = [];
      let productivetotal =0;
      let idletotal =0;
      for (let k=0;k<data.user.length; k++) {
        let promises = [];
    for (let i = 0; i < data.times.length; i++) {
      const string = data.times[i].split('-');
      const userstring = data.user[k].split('_');
    
   await pool.query('SELECT SUM(totalIdleMinutes) as idletime,SUM(productivitytime) as productivitytime,SUM(productivityCount) as productivitypercentage FROM `users_snapshotscaptures` WHERE `userId`=? AND DATE(`capturetime`)=? AND cast(`capturetime` as time) >= ? AND cast(`capturetime` as time) <= ?', [
            userstring[0],
                startdate,
                string[0],
                string[1]
            ],(error, results, fields) => {
         if (error) {
          console.log("test");
                    }

                   
                  
                 if (results.length == 0) {
                 
                  //console.log(userstring[1]);
                 
                    } else {
                      var obj = [];
                        if(results[0].productivitytime!== null){

                        results[0].productivitytime=Number(results[0].productivitytime);
                      results[0].productivitytime=Math.floor(results[0].productivitytime / 1000);
                      results[0].idletime=Math.floor(results[0].idletime / 1000);
                        productivetotal+=results[0].productivitytime;
                        idletotal+=results[0].idletime;
if(results[0].idletime){
                        didletime = Number(results[0].idletime);
                        var hidletime = Math.floor(didletime / 3600);
                        var midletime = Math.floor(didletime % 3600 / 60);
                        var sidletime = Math.floor(didletime % 3600 % 60);
                        var idletimeDisplay = hidletime > 0 ? (hidletime > 9 ? hidletime : "0"+hidletime) + (hidletime == 1 ? "" : "") : "00";
                        var midletimeDisplay = midletime > 0 ? (midletime > 9 ? midletime : "0"+midletime) + (midletime == 1 ? "" : "") : "00";
                        var sidletimeDisplay = sidletime > 0 ? (sidletime > 9 ? sidletime : "0"+sidletime) + (sidletime == 1 ? "" : "") : "00";
                      

   var idletime=idletimeDisplay+':'+midletimeDisplay+':'+sidletimeDisplay;


}else{
    var idletime ="00:00";
   
}

if(results[0].productivitytime){

    var today = new Date();
   var getHours=today.getHours()% 12;
   getHours=(getHours > 9 ? getHours : "0"+getHours);
   var getstrhr = string[0].split(':');
   var getstrhrs = string[1].split(':');

if(getHours == getstrhr[0] && getHours < getstrhrs[0]){
 
   var getMinutes=today.getMinutes();
   getMinutes=(getMinutes > 9 ? getMinutes : "0"+getMinutes);
   var mstotalworking = Math.floor(results[0].productivitytime % 3600 / 60);
   var mstotalworkingDisplay = mstotalworking > 0 ? (mstotalworking > 9 ? mstotalworking : "0"+mstotalworking) + (mstotalworking == 1 ? "" : "") : "00";
   var percentage=(Number(mstotalworkingDisplay)*100)/getMinutes;
    }else{
  var mstotalworking = Math.floor(results[0].productivitytime % 3600 / 60);
   var mstotalworkingDisplay = mstotalworking > 0 ? (mstotalworking > 9 ? mstotalworking : "0"+mstotalworking) + (mstotalworking == 1 ? "" : "") : "00";
    var percentage=(Number(mstotalworkingDisplay)*100)/60;
    }

    percentage=Math.round(percentage);
    if(percentage >100){
      percentage="100";
      }
    dproductivitytime = Number(results[0].productivitytime);
    var hproductivitytime = Math.floor(dproductivitytime / 3600);
    var mproductivitytime = Math.floor(dproductivitytime % 3600 / 60);
    var sproductivitytime = Math.floor(dproductivitytime % 3600 % 60);
    var productivitytimeDisplay = hproductivitytime > 0 ? (hproductivitytime > 9 ? hproductivitytime : "0"+hproductivitytime) + (hproductivitytime == 1 ? "" : "") : "00";
    var mproductivitytimeDisplay = mproductivitytime > 0 ? (mproductivitytime > 9 ? mproductivitytime : "0"+mproductivitytime) + (mproductivitytime == 1 ? "" : "") : "00";
    var sproductivitytimeDisplay = sproductivitytime > 0 ? (sproductivitytime > 9 ? sproductivitytime : "0"+sproductivitytime) + (sproductivitytime == 1 ? "" : "") : "00";
  var productivitytime=productivitytimeDisplay+':'+mproductivitytimeDisplay+':'+sproductivitytimeDisplay;


}else{
    var productivitytime ="00:00";
    var percentage="0";
    
}


     obj.push({ "userid":userstring[0],"username":userstring[1],"starttime": string[0],"endtime":string[1],"idletime":results[0].idletime,"productivitytime":results[0].productivitytime,"productivitypercentage":percentage });
                        
         promises.push(obj);
         promisestotal.push(obj);
                        }else{
                         // obj.push({ "username":userstring[1],"starttime": string[0],"endtime":string[1],"idletime":"","productivitytime":"","productivitypercentage":"0 %" });
                         // promises.push(obj);

                        }
                    }

                    if (0 === --pending) {
                       
                       return callBack(null, promisestotal,productivetotal,idletotal); //callback if all queries are processed
                    }

                });
        }

    }
       
    },
   

    getproductivityinfomonth: async(data, callBack) => {
      
 
        let pending = 12;
        let promises = [];
      
        for (let i = 1; i <= 12; i++) {
           
   await pool.query('SELECT SUM(productivitytime) as productivitytime FROM `users_snapshotscaptures` WHERE `userId`=? AND MONTH(`capturetime`)=?', [
                  data.userid,
                  i
                 ],(error, results, fields) => {
           if (error) {
            console.log("test");
                      }
                
                   if (results.length == 0) {
                         // promises.push(0);
                      } else {
  
                          if(results[0].productivitytime!== null){
  
                          results[0].productivitytime=Number(results[0].productivitytime);
                          results[0].productivitytime=Math.floor(results[0].productivitytime / 1000);
                          
                          var obj = [];
  
  
  if(results[0].productivitytime){
  

    var mstotalworking = Math.floor(results[0].productivitytime % 3600 / 60);
     var mstotalworkingDisplay = mstotalworking > 0 ? (mstotalworking > 9 ? mstotalworking : "0"+mstotalworking) + (mstotalworking == 1 ? "" : "") : "00";
      var percentage=(Number(mstotalworkingDisplay)*100)/60;
      

      percentage=Math.round(percentage);
      if(percentage >100){
        percentage="100";
        }
     
  
  }else{
    
      var percentage="0";
      
  }
  
  
       obj.push({ "date": i,"amount":percentage });
                          
           promises.push(obj);
                          }
                      }
  
                      if (0 === --pending) {
                         
                         return callBack(null, promises); //callback if all queries are processed
                      }
  
                  });
          }
  
        
         
      },
  
  
      
    
    getproductivityinfoweb: (data, callBack) => {
      
        let startdate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
          });
          var dt = new Date(startdate);
        let fromDateMonth=dt.getMonth()+1;
        //console.log(fromDateMonth);
        let fromDateyear=dt.getFullYear();

           pool.query('SELECT id,capturetime,SUM(totalIdleMinutes) as idletime,SUM(productivitytime) as productivitytime,SUM(productivityCount) as productivitypercentage,SUM(totalKeypressCount) as totalKeypressCount,SUM(totalMouseMovement) as totalMouseMovement,SUM(totalClicks) as totalClicks FROM `users_snapshotscaptures` WHERE `userId`=? AND MONTH(`capturetime`)=? AND YEAR(`capturetime`)=? GROUP BY DATE(`capturetime`) ORDER BY DATE(`capturetime`) DESC', [
                  data.userid,
                  fromDateMonth,
                  fromDateyear                
              ],(error, results, fields) => {
           if (error) {
            console.log(error);
                      }
                
                   return callBack(null, results); //callback if all queries are processed
                  }
                  );
      },
      getproductivityinfototalweb: (data, callBack) => {
      
        let startdate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
          });
          var dt = new Date(startdate);
        let fromDateyear=dt.getFullYear();

           pool.query('SELECT SUM(totalIdleMinutes) as idletimeyear,SUM(productivitytime) as productivitytimeyear,SUM(productivityCount) as productivitypercentageyear FROM `users_snapshotscaptures` WHERE `userId`=? AND YEAR(`capturetime`)=? GROUP BY YEAR(`capturetime`)', [
                  data.userid,
                  fromDateyear                  
              ],(error, results, fields) => {
           if (error) {
            console.log(error);
                      }
                
                   return callBack(null, results); //callback if all queries are processed
                  }
                  );
      },
    getsnapshotsinfo: async(data, callBack) => {
      
      let startdate = data.startdate;
      let pending = data.times.length;
      let promises = [];
      let productivetotal =0;
      let idletotal =0;
    
        for (let i = 0; i < data.times.length; i++) {
          const  string = data.times[i].split('-');

          await pool.query('SELECT * FROM `users_snapshotscaptures` WHERE `userId`=? AND DATE(`capturetime`)=? AND cast(`capturetime` as time) >= ? AND cast(`capturetime` as time) <= ? ORDER BY id ASC LIMIT 0,12', [
                data.userid,
                startdate,
                string[0],
                string[1]
            ],(error, results, fields) => {
         if (error) {
          console.log("test");
                    }
              
                 if (results.length == 0) {

               var obj=[];
                  var objs=[];
                  obj.push({ "starttime": string[0],"endtime":string[1],"image":objs });
                        
         promises.push(obj); 
                   //   promises.push(0);
                    } else {
var obj=[];
var objs=[];

for (let hd = 0; hd < results.length; hd++) {
  var totalproductinfot=results[hd].productivitytime;
var totalproductinfo= Math.floor(totalproductinfot / 1000);
var mstotalworkings = Math.floor(totalproductinfo % 3600 / 60);
var mstotalworkingDisplays = mstotalworkings > 0 ? (mstotalworkings > 9 ? mstotalworkings : "0"+mstotalworkings) + (mstotalworkings == 1 ? "" : "") : "00";
 var percentage=(Number(mstotalworkingDisplays)*100)/60;
 var percentage=Math.round(percentage);
 if(percentage >100){
  percentage="100";
  }
 var applist = JSON.stringify(results[hd].applist);

    objs.push({"snap": results[hd].screenshot,"duration":results[hd].productivitytime,"keypress":results[hd].totalKeypressCount,"totalMouseclick":results[hd].totalClicks,"totalMouseMovement":results[hd].totalMouseMovement,"productivityCount":results[hd].productivityCount,"applist":results[hd].applist,"date":results[hd].capturetime  });

}


obj.push({ "starttime": string[0],"endtime":string[1],"image":objs });
                        
         promises.push(obj);
                        
                    }

                    if (0 === --pending) {
                       
                       return callBack(null, promises); //callback if all queries are processed
                    }

                });
        }

      
       
    },
    create: async(data, callBack) => {                
        statusdata='N';
       
        
        await User.create({companyname:data.companyname,firstname:data.firstname,lastname:data.lastname,email: data.email,password:data.passwords,activation_key:data.activationkey,country_id:data.country_id,state_id:data.state_id,mobile:data.mobile,status:statusdata,role_id: data.role_id,plan_id: data.plan_id}).then(createlist => callBack(null, createlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 

     

    },
    addcompanyuserid: async(data, callBack) => {                
        statusdata='Y';
        data.activationkey='';
        await User.create({companyname:data.companyname,firstname:data.firstname,lastname:data.lastname,email: data.email,password:data.passwords,activation_key:data.activationkey,country_id:data.country_id,state_id:data.state_id,mobile:data.mobile,status:statusdata,role_id: data.role_id,plan_id: data.plan_id,parent_id: data.parent_id,is_screenshot:data.is_screenshot}).then(createlist => callBack(null, createlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
 },
    getuser: async(data, callBack) => {

      
       
        await User.findAll({
            where: {role_id:2},
            order:[['id','DESC']],
            include: [{
              model: Subscriptions,
              attributes: ['created','expiry_date','payment_detail']
           
            }, {
                model: Plan,
                attributes: ['name','price']
            },
        ],
            order: [[{model: Subscriptions}, 'id', 'desc']]
        
       
          }).then(getuserlist => callBack(null, getuserlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getusercompany: async(data, callBack) => {

      await User.findAll({
            where: { 
                role_id: {
                [Op.or]: [2, 3]
              },
              parent_id: data.userid},   
              include: [ {
                  model: Roles,
                  attributes: ['name']
              },
              {
                model: Usersnapshots,
                attributes: ['capturetime']
            },
            {
                model: Userattendancelog,
                attributes: ['punch_in']
            },
          ],  
          order: [['firstname','ASC']]   
          }).then(getuserlist => callBack(null, getuserlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getuserfortimeline: async(data, callBack) => {

      await User.findAll({
        attributes: ['id','firstname','lastname'],
            where: { 
                role_id: {
                [Op.or]: [2, 3]
              },status:'Y',
              parent_id: data.userid},
              order:[['firstname','ASC']],   
          }).then(getuserlist => callBack(null, getuserlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getuserfortotal: async(data, callBack) => {

      await User.findAll({
        attributes: [[sequelize.fn('count', sequelize.col('id')), 'count']],
            where: { 
              role_id: 2,
              parent_id: data.parent_id},
              order:[['firstname','ASC']],   
          }).then(getuserlist => callBack(null, getuserlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getuserfortimelinesecond: async(data, callBack) => {

      await User.findAll({
        attributes: ['id','firstname','lastname'],
            where: { 
                role_id: {
                [Op.or]: [2, 3]
              },status:'Y',
              id: data.userid},
              order:[['id','DESC']],   
          }).then(getuserlist => callBack(null, getuserlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    editprofileid: async(data, callBack) => {

      await User.findOne({
            where: {id:data.userid},
            include: [ {
                model: Roles,
                attributes: ['name']
            },
        ], order:[['id','DESC']]
            }).then(getuserlist => callBack(null, getuserlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    viewdetailid: async(data, callBack) => {

      await User.findOne({
            where: {id:data.id},
            include: [ {
                model: Roles,
                attributes: ['name']
            },
        ], order:[['id','DESC']]
            }).then(getuserlist => callBack(null, getuserlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getuserbiling: async(data, callBack) => {

      await Subscriptions.findAll({
        where: {plan_id: {[Op.notIn]:[5]}},
        order:[['id','DESC']],
            include: [{
              model: User,
              attributes: ['companyname','email'],
              where: {role_id:2,status:'Y'}
            }, {
                model: Plan,
                attributes: ['id','name','price']
            },
        ]
        
       
          }).then(getsubscriptions => callBack(null, getsubscriptions)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getuserbilingcompany: async(data, callBack) => {

      await Subscriptions.findAll({
        where: {plan_id: {[Op.notIn]:[5]}},
        order:[['id','DESC']],
            include: [{
              model: User,
              attributes: ['companyname','email'],
              where: {role_id:2,id:data.userid,status:'Y'}
            }, {
                model: Plan,
                attributes: ['id','name','price']
            },
        ]
          }).then(getsubscriptions => callBack(null, getsubscriptions))
          .catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getsitesettings: async(data, callBack) => {

      await Sitesettings.findAll({
        order:[['id','DESC']],
            include: [{
              model: User,
              where: {id:data.userid},
              attributes: ['companyname','email']
            }
        ]
        
       
          }).then(getsubscriptions => callBack(null, getsubscriptions)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },

    breaklistget: async(data, callBack) => {
      await User.findOne({
        where: {id:data.userid},
        order:[['id','DESC']]
        }).then(function(createduser){
          Task.findAll({
            where: {userId:createduser.parent_id,projects_id:0},
            attributes: ['id','name'],
          order:[['id','ASC']],
            }).then(notes => callBack(null,notes));                      
         }).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },
      tasklistget: async(data, callBack) => {

        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date(); 
        NOW=NOW.setDate(NOW.getDate() + 1);
           
      
        await User.findOne({
          where: {id:data.userid},
          order:[['id','DESC']]
          }).then(function(createduser){
            Task.findAll({
              where: {userId:createduser.parent_id,projects_id: {
                [Op.ne]: 0
              }},
              attributes: ['id','name','startdate'],
          
            include: [{
              model: User,
              where: {id:createduser.parent_id},
              attributes: ['firstname','lastname']
            }, {
              model: Tasksactivities,
              where: { userId:data.userid,starttime: { 
                [Op.gt]: TODAY_START,
                [Op.lte]: NOW
              }}, required: false,
              attributes: ['starttime','endtime','status'],
             
            }],   
            order:[[Tasksactivities, 'id', 'DESC' ]],
              }).then(notes => callBack(null,notes));                      
           }).catch(function (err) {
                // handle error;
                return callBack(err);
              }); 
        
      },
      getcompanytask: async(data, callBack) => {

        await Task.findAll({
        where: {userId:data.userid,projects_id: {
                [Op.ne]: 0
              }},
          attributes: ['id','name','startdate','assignmultipleuser','enddate','priority'],
          order:[['id','ASC']],
          include: [{
            model: User,
            where: {id:data.userid},
            attributes: ['firstname','lastname']
          },{
            model: Projects,
            attributes: ['name']
        }]
      }).then(getsubscriptions => callBack(null, getsubscriptions)).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },
      projecttasklistget: async(data, callBack) => {

        await Task.findAll({
            where: {userId:data.userid,projects_id:data.id },
            attributes: ['id','name','startdate'],
          order:[['id','ASC']],
          include: [{
            model: User,
            where: {id:data.userid},
            attributes: ['firstname','lastname']
          }]
            }).then(getsubscriptions => callBack(null, getsubscriptions)).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },
      activitytasklistget: async(data, callBack) => {

      await Tasksactivities.findAll({
      where: {tasks_id:data.id},
      attributes: ['keypress','mouseclicked','mousemoved','starttime','endtime','manuallyend_time'],
      include: [ {
                  model: Task,
                  attributes: ['name']
                
              },
              {
                model: User,
                attributes: ['firstname','lastname']
              }
          ],
           order:[['id','DESC']],
          }).then(getsubscriptions => callBack(null, getsubscriptions)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
              
      },
      activeactivityget: async(data, callBack) => {
        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        
        NOW=NOW.setDate(NOW.getDate() + 1);
           
        await Usersbreakslogs.findAll({
            where: {starttime: { 
                [Op.gt]: TODAY_START,
                [Op.lte]: NOW
              },userId:data.userid},
            attributes: ['starttime'],
            include: [ {
                    model: Break,
                    attributes: ['name']
                },
            ],

          order:[['id','ASC']],
            }).then(getsubscriptions => callBack(null, getsubscriptions)).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },
      activeactivitygetupdate: async(data, callBack) => {
      let pending = data.times.length;
            let promises = [];
            
         
              for (let i = 0; i <= data.times.length; i++) {
               
       pool.query('SELECT `tasks`.`name` as `name`,`tasks_activities`.`starttime` as `starttime`,`tasks_activities`.`endtime` as `endtime` FROM `tasks_activities` INNER JOIN `tasks` AS `tasks` ON `tasks_activities`.`tasks_id` = `tasks`.`id` WHERE `tasks_activities`.`userId`=? and DATE(`tasks_activities`.`starttime`)=?  ORDER BY `tasks_activities`.`id` ASC', 
      [ data.userid,
         data.times[i]
                  ],(error, results, fields) => {
               if (error) {
                console.log("test");
                          }
                          if (results.length == 0) {
                            // promises.push(0);
                         } else {
                            var obj=[];
     var objs=[];
     
     for (let hd = 0; hd < results.length; hd++) {
      
         objs.push({ "activityType": results[hd].name,"starttime": moment(results[hd].starttime).format('DD-MM-YYYY HH:mm:ss'),"endtime": moment(results[hd].endtime).format('DD-MM-YYYY HH:mm:ss') });
     
     }
     
     
      obj.push({ "date": data.times[i],"activitylist":objs });
                             
     promises.push(obj);
                             
                         }
                    
                          if (0 === --pending) {
                             
                             return callBack(null, promises); //callback if all queries are processed
                          }
      
                      });
              }
      





 /*
            let startdate = new Date();
            let fromDateMonth=startdate.getMonth();
            let fromDateyear=startdate.getFullYear();
    
               pool.query('SELECT * FROM `users_breakslogs` INNER JOIN `breaks` AS `breaks` ON `users_breakslogs`.`breaks_id` = `breaks`.`id` WHERE `userId`=? AND MONTH(`capturetime`)=? AND YEAR(`capturetime`)=? GROUP BY DATE(`capturetime`) ORDER BY DATE(`capturetime`) DESC', [
                      data.userid,
                      fromDateMonth,
                      fromDateyear                
                  ],(error, results, fields) => {
               if (error) {
                console.log(error);
                          }
                    
                       return callBack(null, results); //callback if all queries are processed
                      }
                      );
*/


      },
      gettodayinfo: async(data, callBack) => {
     let startdate = data.startdate;
   
        pool.query('SELECT `tasks`.`id` as `id`,`tasks`.`projects_id` as `type`,`tasks`.`name` as `name`,`tasks_activities`.`starttime` as `starttime`,`tasks_activities`.`endtime` as `endtime` FROM `tasks_activities` INNER JOIN `tasks` AS `tasks` ON `tasks_activities`.`tasks_id` = `tasks`.`id` WHERE `tasks_activities`.`userId`=?  and DATE(`tasks_activities`.`starttime`)=?  ORDER BY `tasks_activities`.`id` DESC', 
        [data.userid,
          startdate],(error, results, fields) => {
                 if (error) {
                  console.log("test");
                            }
                          
    return callBack(null, results);
                               
                           
                           
                        });
                
        },
      activeactivitygetweb: async(data, callBack) => {
        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        
        NOW=NOW.setDate(NOW.getDate() + 1);
        
        await Tasksactivities.findAll({
            where: {userId:data.userid},
            attributes: ['starttime','endtime'],
            include: [ {
                    model: Task,
                    attributes: ['name','projects_id'],
                    include: [ {
                      model: Projects,
                      attributes: ['name']
                  },
              ]
                },
            ],
             order:[['id','DESC']],
            }).then(getsubscriptions => callBack(null, getsubscriptions)).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },
      getapplist: async(data, callBack) => {
      
        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        NOW=NOW.setDate(NOW.getDate() + 1);
    await Userapplist.findAll({
      where: {capturetime: { 
        [Op.gt]: TODAY_START,
        [Op.lte]: NOW
      }},
    attributes: ['windowclass',[sequelize.fn('sum', sequelize.col('count')), 'count']],
    group: ['windowclass'],
      include: [{
      model: User,
      where: {parent_id:data.userid},
      attributes: ['id']
            }
        ],
            
        order: [[sequelize.literal('count'), 'DESC']]
            }).then(getuserapplist => callBack(null, getuserapplist)).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },
      getapplistusage: async(data, callBack) => {
    await Userapplist.findAll({
    attributes: ['windowclass',[sequelize.fn('sum', sequelize.col('count')), 'count']],
    group: ['windowclass'],
      include: [{
      model: User,
      where: {parent_id:data.userid},
      attributes: ['id']
            }
        ],
            
        order: [[sequelize.literal('count'), 'DESC']]
            }).then(getuserapplist => callBack(null, getuserapplist)).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },

      gettodayproductivityasc: async(data, callBack) => {
      
        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        NOW=NOW.setDate(NOW.getDate() + 1);
    await Usersnapshots.findAll({
      limit: 5,
      where: {capturetime: { 
        [Op.gt]: TODAY_START,
        [Op.lte]: NOW
      }},
    attributes: [[sequelize.fn('sum', sequelize.col('productivitytime')), 'productivitytime'],[sequelize.fn('sum', sequelize.col('totalIdleMinutes')), 'totalIdleMinutes']],
    group: ['userId'],
      include: [{
      model: User,
      where: {parent_id:data.userid},
      attributes: ['id','firstname','lastname']
            }
        ],
            
        order: [[sequelize.literal('productivitytime'), 'ASC']]
            }).then(getuserapplist => callBack(null, getuserapplist)).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },
      gettodayproductivity: async(data, callBack) => {
      
        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        NOW=NOW.setDate(NOW.getDate() + 1);
    await Usersnapshots.findAll({
      limit: 5,
      where: {capturetime: { 
        [Op.gt]: TODAY_START,
        [Op.lte]: NOW
      }},
    attributes: [[sequelize.fn('sum', sequelize.col('productivitytime')), 'productivitytime'],[sequelize.fn('sum', sequelize.col('totalIdleMinutes')), 'totalIdleMinutes']],
    group: ['userId'],
      include: [{
      model: User,
      where: {parent_id:data.userid},
      attributes: ['id','firstname','lastname']
            }
        ],
            
        order: [[sequelize.literal('productivitytime'), 'DESC']]
            }).then(getuserapplist => callBack(null, getuserapplist)).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },
      gettodayproductivitytrytotal: async(data, callBack) => {
      
        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        NOW=NOW.setDate(NOW.getDate() + 1);
    await Usersnapshots.findAll({
    
      where: {capturetime: { 
        [Op.gt]: TODAY_START,
        [Op.lte]: NOW
      }},
    attributes: [[sequelize.fn('sum', sequelize.col('productivitytime')), 'productivitytime'],[sequelize.fn('sum', sequelize.col('totalIdleMinutes')), 'totalIdleMinutes']],
                
        order: [[sequelize.literal('productivitytime'), 'DESC']]
            }).then(getuserapplist => callBack(null, getuserapplist)).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },

      gettodayproductivitytry: async(data, callBack) => {
      
        let startdate = new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Calcutta'
        });

        const TODAY_START = new Date().setHours(5, 0, 0, 0);
        var NOW = new Date();
        NOW=NOW.setDate(NOW.getDate() + 1);
    await Usersnapshots.findAll({
    
      where: {capturetime: { 
        [Op.gt]: TODAY_START,
        [Op.lte]: NOW
      }},
    attributes: [[sequelize.fn('sum', sequelize.col('productivitytime')), 'productivitytime'],[sequelize.fn('sum', sequelize.col('totalIdleMinutes')), 'totalIdleMinutes'],[sequelize.fn('sum', sequelize.col('totalKeypressCount')), 'totalKeypressCount'],[sequelize.fn('sum', sequelize.col('totalMouseMovement')), 'totalMouseMovement'],[sequelize.fn('sum', sequelize.col('totalClicks')), 'totalClicks']],
    group: ['userId'],
      include: [{
      model: User,
      where: {parent_id:data.userid},
      attributes: ['id','firstname','lastname']
            }
        ],
            
        order: [[sequelize.literal('productivitytime'), 'DESC']]
            }).then(getuserapplist => callBack(null, getuserapplist)).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },
      getlatestsnapshot: async(data, callBack) => {
      
        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        NOW=NOW.setDate(NOW.getDate() + 1);
    await Usersnapshots.findAll({
      limit: 5,
      where: {capturetime: { 
        [Op.gt]: TODAY_START,
        [Op.lte]: NOW
      }},
    attributes: ['id','productivityCount','productivitytime','screenshot','totalIdleMinutes','totalKeypressCount','totalMouseMovement','totalClicks','applist','capturetime'],
      include: [{
      model: User,
      where: {parent_id:data.userid},
      attributes: ['id','firstname','lastname']
            }
        ],
            
        order: [['id', 'DESC']]
            }).then(getuserapplist => callBack(null, getuserapplist)).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },
      getapps: async(data, callBack) => {
        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        NOW=NOW.setDate(NOW.getDate() + 1);
       // NOW=NOW.setHours(05, 0, 0, 0);

        await Userapplist.findAll({
            where: {userId:data.userid},
            attributes: ['id','applist','windowclass','capturetime',[sequelize.fn('sum', sequelize.col('count')), 'count']],
            group: ['windowclass'],
            
            order: [['id', 'desc'],[sequelize.literal('count'), 'DESC']
            ]
            }).then(getuserapplist => callBack(null, getuserapplist)).catch(function (err) {
              // handle error;
              return callBack(err);
            }); 
      },
    useredit: async(data, callBack) => {
     
        await User.update({firstname: data.firstname,mobile: data.mobile,companyname: data.companyname,country_id: data.country_id,state_id: data.state_id,city: data.city,address: data.address,address: data.address,zipcode:data.zipcode},{
            where: {id: data.userid}
        }).then(function(){
            User.findOne({
                where: {id:data.userid},
                 include: [ {
                    model: Roles,
                    attributes: ['name']
                },
            ],

                order:[['id','DESC']]
                }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    usereditprofile: async(data, callBack) => {
     
        await User.update({firstname: data.firstname,lastname: data.lastname,mobile: data.mobile,email: data.email},{
            where: {id: data.userid}
        }).then(function(){
            User.findOne({
                where: {id:data.userid},
                 include: [ {
                    model: Roles,
                    attributes: ['name']
                },
            ],

                order:[['id','DESC']]
                }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    passwordedit: async(data, callBack) => {
     
        await User.update({password: data.passwords},{
            where: {id: data.userid}
        }).then(function(){
            User.findOne({
                where: {id:data.userid},
                include: [ {
                    model: Roles,
                    attributes: ['name']
                },
            ],
                order:[['id','DESC']]
                }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getcpaturescrreninterval: async(data, callBack) => {
     
        await User.findOne({
            where: {id:data.userid},
            order:[['id','DESC']]
            }).then(function(createduser){
                Sitesettings.findOne({
                where: {userId:createduser.parent_id},
                order:[['id','DESC']]
                }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    sitesettingedit: async(data, callBack) => {
     
        await Sitesettings.update({screenshot_freq:data.screenshot_freq,user_logintime:data.user_logintime,idle_threshold:data.idle_threshold,idle_threshold_punchout:data.idle_threshold_punchout,is_auto_punchout:'Y',punchout_time:data.punchout_time},{
            where: {userId: data.userid}
        }).then(function(){
            User.findOne({
                where: {id:data.userid},
                include: [ {
                    model: Roles,
                    attributes: ['name']
                },
            ],
             order:[['id','DESC']]
                }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    userupdatestatusbyid: async(data, callBack) => {
   
        
                await User.update({status: data.name,password:data.passwords},{
                    where: {id: data.id}
                }).then(function(){
                    User.findAll({
                        where: {role_id:2},
                        order:[['id','DESC']],
                        include: [{
                            model: Subscriptions,
                            attributes: ['created','expiry_date','payment_detail']
                         
                          }, {
                              model: Plan,
                              attributes: ['name','price']
                          }],
                          order: [[{model: Subscriptions}, 'id', 'desc']]
                    }).then(notes => callBack(null,notes));                      
                     }).catch(function (err) {
                    // handle error;
                    return callBack(err);
                  }); 
        
             
        
            },
            updatepaymentid: async(data, callBack) => {
   
        
                await Subscriptions.update({payment_id: data.payment_id,signature_razorpay:data.signature_razorpay,status:'Y'},{
                    where: {id: data.id,order_id: data.order_id}
                }).then(function(){
                    User.update({plan_id: data.plan_id},{
                        where: {id: data.user_id}
                    }).then(function(){
                        Subscriptions.findOne({
                            where: {id: data.id},
                            order:[['id','DESC']],
                                include: [{
                                  model: User,
                                  attributes: ['companyname','email'],
                                  where: {role_id:2,id:data.user_id,status:'Y'}
                                }, {
                                    model: Plan,
                                    attributes: ['id','name','price']
                                },
                            ]
                            
                           
                              }).then(notes => callBack(null,notes));                      
                         })                      
                     }).catch(function (err) {
                    // handle error;
                    return callBack(err);
                  }); 
        
             
        
            },

            
            userdeletesuperbyid: async(data, callBack) => {
        await User.destroy({
            where: {id: data.id}
        }).then(function(){
            User.findAll({
                where: {role_id:2},
                order:[['id','DESC']],
                include: [{
                    model: Subscriptions,
                    attributes: ['created','expiry_date','payment_detail']
                  }, {
                      model: Plan,
                      attributes: ['name','price']
                  }],
                  order: [[{model: Subscriptions}, 'id', 'desc']]
            }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
            
    getcountry: async(data, callBack) => {
        await Country.findAll({
            where: {status: 'Y'}
        }).then(getcountrylist => callBack(null, getcountrylist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getstate: async(data, callBack) => {
        await State.findAll({
            where: {status: 'Y'}
        }).then(getstatelist => callBack(null, getstatelist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getprojectsmain: async(data, callBack) => {
        await Projects.findAll({
            where: {userId: data.userid},
            include: [{
              model: User,
              attributes: ['firstname','lastname']
            }],
            order:[['id','DESC']]
        }).then(getstatelist => callBack(null, getstatelist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getcompanyprojects: async(data, callBack) => {
        await Projects.findOne({
            where: {id: data.id},
            include: [{
              model: User,
              attributes: ['firstname','lastname']
            }],
            order:[['id','DESC']]
        }).then(getstatelist => callBack(null, getstatelist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    gettaskview: async(data, callBack) => {
        await Task.findOne({
            where: {id: data.id},
            include: [{
              model: Projects,
              attributes: ['name']
          },{
              model: User,
              attributes: ['firstname','lastname']
            }],
            order:[['id','DESC']]
        }).then(getstatelist => callBack(null, getstatelist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getprojectsmainadd: async(data, callBack) => {

     await Projects.create({name: data.name,userId:data.uid,description:data.description,status:'Y'}).then(function(){
       Projects.findAll({
        where: {userId: data.userid},
        include: [{
            model: User,
            attributes: ['firstname','lastname']
          }],
          order:[['id','DESC']]
      }).then(notes => callBack(null,notes));                      
         }).catch(function (err) {
        // handle error;
        return callBack(err);
      }); 
   },
   taskaddget: async(data, callBack) => {
data.startdate=moment(data.startdate).format('YYYY-MM-DD HH:mm:ss');
data.enddate=moment(data.enddate).format('YYYY-MM-DD HH:mm:ss');
var colorsCSV = data.assignmultipleuser.join(",");
     await Task.create({startdate: data.startdate,assignmultipleuser:colorsCSV,priority: data.priority,name: data.name,projects_id: data.projects_id,userId:data.userid,enddate:data.enddate,status:'Y'}).then(function(){
       Projects.findOne({
        where: {id: data.projects_id},
        include: [{
            model: User,
            attributes: ['firstname','lastname']
          }],
          order:[['id','DESC']]
      }).then(notes => callBack(null,notes));                      
         }).catch(function (err) {
        // handle error;
        return callBack(err);
      }); 
   },
   getprojectsmainedit: async(data, callBack) => {
  await Projects.update({name: data.name,userId:data.uid,description:data.description,status:'Y'},{  where: {id: data.id} 
}).then(function(){
       Projects.findOne({
        where: {id: data.id},
        include: [{
            model: User,
            attributes: ['firstname','lastname']
          }],
          order:[['id','DESC']]
      }).then(notes => callBack(null,notes));                      
         }).catch(function (err) {
        // handle error;
        return callBack(err);
      }); 
   },
    getemailtemplate: async(data, callBack) => {
        await Emailtemplate.findAll({
            where: {id: data.lid}
        }).then(emailtemplate => callBack(null, emailtemplate)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getemailtemplateone: async(data, callBack) => {
        await Emailtemplate.findOne({
            where: {id: data.lid}
        }).then(emailtemplate => callBack(null, emailtemplate)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getstateselect: async(data, callBack) => {
        await State.findAll({
            where: {status: 'Y',country_id:data.task}
        }).then(getstatelist => callBack(null, getstatelist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    saveuserpunch: async(data, callBack) => {


       
        await Userattendancelog.create({punch_in:data.punchInTime,userId:data.userid }).then(attendancelog => callBack(null, attendancelog)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    savebreakstartid: async(data, callBack) => {


       
        await Tasksactivities.create({tasks_id:data.type,starttime:data.starttime,userId:data.userid }).then(attendancelog => callBack(null, attendancelog)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    savetaskstartid: async(data, callBack) => {


       
        await Tasksactivities.create({tasks_id:data.type,starttime:data.starttime,userId:data.userid }).then(attendancelog => callBack(null, attendancelog)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    activationverificationid: async(data, callBack) => {

        data.status='Y';
        data.plan_id=5;
        data.totaluser=5;

        const NOW = new Date();
        const expired= NOW.setDate(NOW.getDate() + 7);
        const startdate = new Date();
        await User.findOne({
            where: {activation_key:data.name},
            order:[['id','DESC']] 
        }).then(function(createdUser){
        User.update({status: data.status,activation_key:'',parent_id:createdUser.id},{
            where: {id: createdUser.id}
        }).then(function(createdUser){
    Sitesettings.create({userId:createdUser.id,is_screenshot_enable:'Y',screenshot_freq:'12',user_logintime:'9',idle_threshold:'60',idle_threshold_punchout:'15',is_auto_punchout:'Y',punchout_time:'10'}).then(function(){

    Subscriptions.create({plan_id:data.plan_id,totaluser:data.totaluser,userId:createdUser.id,created:startdate,expiry_date: expired,status:data.status,order_id:data.orderid}).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
                // handle error;
                return callBack(err);
              })})}).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    addsubscriptionsid: async(data, callBack) => {

        data.status='N';
        const NOW = new Date();
       
    if(data.plan_id==1){
        const pl=1;
        expireds= NOW.setMonth(NOW.getMonth() + +pl);
    }else if(data.plan_id==2){
        const pl=3;
         expireds= NOW.setMonth(NOW.getMonth() + +pl);
    }else if(data.plan_id==3){
        const pl=6;
         expireds= NOW.setMonth(NOW.getMonth() + +pl);
    }else if(data.plan_id==4){
        const pl=12;
         expireds= NOW.setMonth(NOW.getMonth() + +pl);
    }
     const startdate = new Date();
        await User.findOne({
            where: {id:data.uid},
            order:[['id','DESC']] 
        }).then(function(createdUser){
        User.update({companyname: data.name,mobile:data.mobile,address:data.address,zipcode:data.zipcode},{
            where: {id: createdUser.id}
        }).then(function(){
 Subscriptions.create({plan_id:data.plan_id,totaluser:data.noOfRoom,discount:data.discount,plantotalprice:data.plantotalprice,taxprice:data.taxprice,payment_detail:data.total,userId:createdUser.id,created:startdate,expiry_date: expireds,status:data.status,order_id:data.orderid}).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
                // handle error;
                return callBack(err);
              })}).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
 
    planupgradesbyid: async(data, callBack) => {
        const NOW = new Date();

        data.status='Y';
    if(data.plan_id==1){
        const pl=1;

         expireds= NOW.setMonth(NOW.getMonth() + +pl);
    }else if(data.plan_id==2){
        const pl=3;
         expireds= NOW.setMonth(NOW.getMonth() + +pl);
    }else if(data.plan_id==3){
        const pl=6;
         expireds= NOW.setMonth(NOW.getMonth() + +pl);
    }else if(data.plan_id==4){
        const pl=12;
         expireds= NOW.setMonth(NOW.getMonth() + +pl);
    }else if(data.plan_id==5){
     
        expireds= NOW.setDate(NOW.getDate() + 7);
    
    }

      
        
        const startdate = new Date();
        await User.findOne({
            where: {id:data.planselectuser},
            order:[['id','DESC']] 
        }).then(function(createdUser){
     User.update({plan_id: data.plan_id},{where: {id: createdUser.id}
        }).then(function(){
    Subscriptions.create({plan_id:data.plan_id,userId:createdUser.id,created:startdate,expiry_date: expireds,status:data.status,payment_detail:data.payment_detail})
    .then(function(){
        User.findAll({
            where: {role_id:2},
            order:[['id','DESC']],
            include: [{
                model: Subscriptions,
                attributes: ['created','expiry_date','payment_detail']
              }, {
                  model: Plan,
                  attributes: ['name','price']
              }],
              order: [[{model: Subscriptions}, 'id', 'desc']]
        }).then(notes => callBack(null,notes));                      
         }) }).catch(function (err) {
                // handle error;
                return callBack(err);
              })  }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    saveuserpunchout: async(data, callBack) => {

        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        
        NOW=NOW.setDate(NOW.getDate() + 1);
       
        await Userattendancelog.update({punch_out: data.puchOutTime},{
            where: {punch_in: { 
                [Op.gt]: TODAY_START,
                [Op.lte]: NOW
              },userId: data.userid},
            order:[['id','DESC']],
        }).then(attendancelog => callBack(null, attendancelog)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    }, 
    savebreakstopid: async(data, callBack) => {

        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        data.status='Y';
        NOW=NOW.setDate(NOW.getDate() + 1);
       
        await Tasksactivities.update({endtime: data.endtime,status:data.status},{
            limit: 1,
            where: {starttime: { 
                [Op.gt]: TODAY_START,
                [Op.lte]: NOW
              },userId: data.userid,tasks_id:data.type,status:'N'},
            order:[['id','DESC']],
        }).then(function(){
            Tasksactivities.findOne({
                where: {starttime: { 
                    [Op.gt]: TODAY_START,
                    [Op.lte]: NOW
                  },userId: data.userid,tasks_id:data.type},
                order:[['id','DESC']]}).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    }, 
    savetaskstopid: async(data, callBack) => {

        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        
        NOW=NOW.setDate(NOW.getDate() + 1);
        data.status='Y';
        await Tasksactivities.update({endtime: data.endtime,status:data.status},{
            limit: 1,
            where: {starttime: { 
                [Op.gt]: TODAY_START,
                [Op.lte]: NOW
              },userId: data.userid,tasks_id:data.type,status:'N'},
            order:[['id','DESC']],
        }).then(function(){
            Tasksactivities.findOne({
                where: {starttime: { 
                    [Op.gt]: TODAY_START,
                    [Op.lte]: NOW
                  },userId: data.userid,tasks_id:data.type},
                order:[['id','DESC']]}).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    }, 
    savetaskstopidmanually: async(data, callBack) => {

        const TODAY_START = new Date().setHours(05, 0, 0, 0);
        var NOW = new Date();
        
        NOW=NOW.setDate(NOW.getDate() + 1);
        data.status='Y';

        await Tasksactivities.findOne({
          where: {starttime: { 
              [Op.gt]: TODAY_START,
              [Op.lte]: NOW
            },userId: data.userid,endtime:null,status:'N'},
          order:[['id','DESC']]}).then(function(createdUser){
    
          Tasksactivities.update({endtime: data.endtimes,status:data.status},{
            limit: 1,
            where: {starttime: { 
                [Op.gt]: TODAY_START,
                [Op.lte]: NOW
              },userId: data.userid,id:createdUser.id,endtime:null,status:'N'},
            order:[['id','DESC']],
        }).then(notes => callBack(null,notes)); }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    }, 
    getattendence: async(data, callBack) => {

        await Userattendancelog.findAll({
            where: {userId: data.userid},
            order:[['id','DESC']],
        }).then(attendancelog => callBack(null, attendancelog)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },dailyattendanceget: async(data, callBack) => {

      const TODAY_START = new Date().setHours(05, 0, 0, 0);
      var NOW = new Date();
      
      NOW=NOW.setDate(NOW.getDate() + 1);
      await Userattendancelog.findAll({
          where: {
              punch_in: { 
                [Op.gt]: TODAY_START,
                [Op.lte]: NOW
              } },  group: ['userId'], include: [{
            model: User,
            where: {parent_id:data.userid},
            attributes: ['id','firstname','lastname']
          }
      ], order:[[{model: User},'firstname','ASC']],
      }).then(attendancelog => callBack(null, attendancelog)).catch(function (err) {
          // handle error;
          return callBack(err);
        }); 
  },
  monthlyattendanceget: async(data, callBack) => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    await Userattendancelog.findAll({
      where: {punch_in: { 
        [Op.gte]: firstDay,
        [Op.lte]: lastDay
      }},
        include: [{
          model: User,
          where: {parent_id:data.userid},
          attributes: ['id','firstname','lastname']
        }
    ], order:[[{model: User},'firstname','ASC']],
    }).then(attendancelog => callBack(null, attendancelog)).catch(function (err) {
        // handle error;
        return callBack(err);
      }); 
},monthlyattendancegetnext: async(data, callBack) => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  await Userattendancelog.findAll({
    where: {punch_in: { 
      [Op.gte]: firstDay,
      [Op.lte]: lastDay
    }},
      include: [{
        model: User,
        where: {id:data.userid},
        attributes: ['id','firstname','lastname']
      }
  ], order:[[{model: User},'firstname','ASC']],
  }).then(attendancelog => callBack(null, attendancelog)).catch(function (err) {
      // handle error;
      return callBack(err);
    }); 
},
monthlyinoutget: async(data, callBack) => {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  await Userattendancelog.findAll({
    where: {punch_in: { 
      [Op.gte]: firstDay,
      [Op.lte]: lastDay
    }},
      include: [{
        model: User,
        where: {parent_id:data.userid},
        attributes: ['id','firstname','lastname']
      }
  ], order:[[{model: User},'firstname','ASC']],
  }).then(attendancelog => callBack(null, attendancelog)).catch(function (err) {
      // handle error;
      return callBack(err);
    }); 
},
   getplan: async(data, callBack) => {
        await Plan.findAll({
            where: {status: 'Y'}
        }).then(planlist => callBack(null, planlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    }, getSearchid: async(data, callBack) => {
        await User.findAll({
            attributes: ['id','companyname'],
            where: {role_id:2,status: 'Y',companyname: {
                [Op.like]: '%'+data.search+'%'
              }}
        }).then(getcountrylist => callBack(null, getcountrylist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getDetailid: async(data, callBack) => {
        await User.findAll({
            attributes: ['id','email','address','zipcode','mobile'],
            where: {role_id:2,status: 'Y',id: data.userid}
        }).then(getcountrylist => callBack(null, getcountrylist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getsubscriptionid: async(data, callBack) => {
        await Subscriptions.findAll({
            attributes: ['id'],
            where: {status: 'N',userId: data.userid},
            order:[['id','DESC']],
            include: [{
                model: User,
                attributes: ['companyname','email']
              }],

        }).then(getcountrylist => callBack(null, getcountrylist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getsubscriptionidcreated: async(data, callBack) => {
        await Subscriptions.findAll({
            where: {status: 'Y',userId: data.userid,plan_id: {[Op.in]:[5]}},
            order:[['id','DESC']],
            include: [{
                model: User,
                attributes: ['companyname','email']
              }],

        }).then(getcountrylist => callBack(null, getcountrylist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getsubscriptiondetailid: async(data, callBack) => {
        await Subscriptions.findAll({
            where: {id: data.id},
            order:[['id','DESC']],
            include: [{
                model: User,
                attributes: ['companyname','email','address','zipcode','mobile']
              }],

        }).then(getcountrylist => callBack(null, getcountrylist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getadmin: async(data, callBack) => {
        await User.findOne({
            attributes: ['companyname','address','zipcode'],
            where: {role_id:1,status: 'Y'}
        }).then(getcountrylist => callBack(null, getcountrylist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getselectedcompanydetail: async(data, callBack) => {
        await User.findOne({
            attributes: ['plan_id','country_id','state_id'],
            where: {id:data.userid,status: 'Y'},
            order:[['firstname','ASC']],
        }).then(getcountrylist => callBack(null, getcountrylist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    }



 
};
