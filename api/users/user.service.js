const pool = require("../../config/database");
const { User,Country, State,Plan,Userattendancelog,Emailtemplate,Subscriptions,Sitesettings,Usersnapshots,Roles,Op } = require('../../sequelize');
var p;

module.exports = {
    login: async(data, callBack) => {
        await User.findAll({
            where: {email: data.email,status:'Y'}
        }).then(loginsuccess => callBack(null, loginsuccess)).catch(function (err) {
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
    checkiftodaydateexistuserid: async(data, callBack) => {
        const TODAY_START = new Date().setHours(0, 0, 0, 0);
var NOW = new Date();
NOW=NOW.setHours(22);
        await Userattendancelog.findAll({
            where: {
                punch_in: { 
                  [Op.gt]: TODAY_START,
                  [Op.lt]: NOW
                },
                userId :data.userid
              },
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
    datatransferid: async(data, callBack) => {
        await Usersnapshots.create({userId:data.userId,productivityCount:data.productivityCount,productivitytime:data.productivitytime,screenshot:data.screenshot,totalIdleMinutes: data.totalIdleMinutes,totalKeypressCount:data.totalKeypressCount,totalMouseMovement:data.totalMouseMovement,totalClicks:data.totalClicks,capturetime:data.capturetime,applist:data.applist}).then(emailexist => callBack(null, emailexist)).catch(function (err) {

            return callBack(err);
          }); 
    },
    getproductivityinfo: async(data, callBack) => {
      
      let startdate = data.startdate;
      let pending = data.times.length;
      let promises = [];
      let productivetotal =0;
      let idletotal =0;
     
        for (let i = 0; i < data.times.length; i++) {
          const  string = data.times[i].split('-');

          await pool.query('SELECT SUM(totalIdleMinutes) as idletime,SUM(productivitytime) as productivitytime,SUM(productivityCount) as productivitypercentage FROM `users_snapshotscaptures` WHERE `userId`=? AND DATE(`capturetime`)=? AND cast(`capturetime` as time) >= ? AND cast(`capturetime` as time) <= ?', [
                data.userid,
                startdate,
                string[0],
                string[1]
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
    getsnapshotsinfo: async(data, callBack) => {
      
      let startdate = data.startdate;
      let pending = data.times.length;
      let promises = [];
      let productivetotal =0;
      let idletotal =0;
     
        for (let i = 0; i < data.times.length; i++) {
          const  string = data.times[i].split('-');

          await pool.query('SELECT screenshot FROM `users_snapshotscaptures` WHERE `userId`=? AND DATE(`capturetime`)=? AND cast(`capturetime` as time) >= ? AND cast(`capturetime` as time) <= ?', [
                data.userid,
                startdate,
                string[0],
                string[1]
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
    objs.push({ "img": results[hd].screenshot });
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
          ],  
          order: [[{model: Usersnapshots}, 'id', 'desc']]   
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

        const TODAY_START = new Date().setHours(0, 0, 0, 0);
        var NOW = new Date();
        NOW=NOW.setHours(22);
       
        await Userattendancelog.update({punch_out: data.puchOutTime},{
            where: {punch_in: { 
                [Op.gt]: TODAY_START,
                [Op.lt]: NOW
              },userId: data.userid},
            order:[['id','DESC']],
        }).then(attendancelog => callBack(null, attendancelog)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    }, 
    getattendence: async(data, callBack) => {

        await Userattendancelog.findAll({
            where: {userId: data.id},
            order:[['id','DESC']],
        }).then(attendancelog => callBack(null, attendancelog)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    }, getplan: async(data, callBack) => {
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
            where: {id:data.userid,status: 'Y'}
        }).then(getcountrylist => callBack(null, getcountrylist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    }



 
};
