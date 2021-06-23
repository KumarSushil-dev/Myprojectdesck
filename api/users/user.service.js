const pool = require("../../config/database");
const { User,Country, State,Plan,Userattendancelog,Emailtemplate,Subscriptions,Sitesettings,Op } = require('../../sequelize');
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
    create: async(data, callBack) => {                
        statusdata='N';
       
        
        await User.create({companyname:data.companyname,firstname:data.firstname,lastname:data.lastname,email: data.email,password:data.passwords,activation_key:data.activationkey,country_id:data.country_id,state_id:data.state_id,mobile:data.mobile,status:statusdata,role_id: data.role_id,plan_id: data.plan_id}).then(createlist => callBack(null, createlist)).catch(function (err) {
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

    editprofileid: async(data, callBack) => {

      await User.findOne({
            where: {id:data.userid},
            order:[['id','DESC']]
            }).then(getuserlist => callBack(null, getuserlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getuserbiling: async(data, callBack) => {

      await Subscriptions.findAll({
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
        
       
          }).then(getsubscriptions => callBack(null, getsubscriptions)).catch(function (err) {
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
                    }).then(notes => callBack(null,notes));                      
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
    getstateselect: async(data, callBack) => {
        await State.findAll({
            where: {status: 'Y',country_id:data.task}
        }).then(getstatelist => callBack(null, getstatelist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    saveuserpunch: async(data, callBack) => {


       
        await Userattendancelog.create({punch_in:data.punchInTime,employee_id:data.userid }).then(attendancelog => callBack(null, attendancelog)).catch(function (err) {
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
        User.update({status: data.status,activation_key:''},{
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


       
        await Userattendancelog.update({punch_out: data.puchOutTime},{
            where: {employee_id: data.userid},
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
    }



 
};
