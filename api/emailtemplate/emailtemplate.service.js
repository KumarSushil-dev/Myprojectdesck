const { Emailtemplate,Op } = require('../../sequelize');
var p;

module.exports = {
    getemailtemplate: async(data, callBack) => {
        await Emailtemplate.findAll({
           
        }).then(getemailtemplatelist => callBack(null, getemailtemplatelist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    addemailtemplate: async(data, callBack) => {
     
        await Emailtemplate.create({title:data.title,subject:data.subject,format:data.format}).then(function(){
            Emailtemplate.findAll({
               
            }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    editemailtemplate: async(data, callBack) => {
     
        await Emailtemplate.update({title:data.title,subject:data.subject,format:data.format},{
            where: {id: data.id}
        }).then(function(){
            Emailtemplate.findAll({
               
            }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    editshows: async(data, callBack) => {
     
        await Emailtemplate.findByPk(data.id).then(notes => callBack(null,notes)).
        catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    emailtemplateupdatestatusbyid: async(data, callBack) => {
   
        
        await Emailtemplate.update({status: data.name},{
            where: {id: data.id}
        }).then(function(){
            Emailtemplate.findAll({
               
            }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 

     

    },

    
    emailtemplatedeletesuperbyid: async(data, callBack) => {
await Emailtemplate.destroy({
    where: {id: data.id}
}).then(function(){
    Emailtemplate.findAll({
       
    }).then(notes => callBack(null,notes));                      
     }).catch(function (err) {
    // handle error;
    return callBack(err);
  }); 
},
};
