const pool = require("../../config/database");
const { User,Country, State,Plan,Userattendancelog,Emailtemplate,Subscriptions,Op } = require('../../sequelize');
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
        const NOW = new Date();
        const expired= NOW.setDate(NOW.getDate() + 7);
        const startdate = new Date();
        await User.findOne({
            where: {activation_key:data.name},
            order:[['id','DESC']] 
        }).then(function(createdUser){
        User.update({status: data.status,activation_key:''},{
            where: {id: createdUser.id}
        }).then(function(){
    Subscriptions.create({plan_id:data.plan_id,userId:createdUser.id,created:startdate,expiry_date: expired,status:data.status}).then(notes => callBack(null,notes));                      
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
            where: {employee_id: data.userid,punch_in:data.punchInTime}
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
    }



 
};
