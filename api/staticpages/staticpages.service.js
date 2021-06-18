const { Static,Op } = require('../../sequelize');
var p;

module.exports = {
    getstaticpages: async(data, callBack) => {
        await Static.findAll({
           
        }).then(getstaticpageslist => callBack(null, getstaticpageslist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    addstaticpages: async(data, callBack) => {
     
        await Static.create({name:data.name,description:data.description}).then(function(){
            Static.findAll({
               
            }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    editstaticpages: async(data, callBack) => {
     
        await Static.update({name:data.name,description:data.description},{
            where: {id: data.id}
        }).then(function(){
            Static.findAll({
               
            }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    editshows: async(data, callBack) => {
     
        await Static.findByPk(data.id).then(notes => callBack(null,notes)).
        catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    staticpagesupdatestatusbyid: async(data, callBack) => {
   
        
        await Static.update({status: data.name},{
            where: {id: data.id}
        }).then(function(){
            Static.findAll({
               
            }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 

     

    },

    
    staticpagesdeletesuperbyid: async(data, callBack) => {
await Static.destroy({
    where: {id: data.id}
}).then(function(){
    Static.findAll({
       
    }).then(notes => callBack(null,notes));                      
     }).catch(function (err) {
    // handle error;
    return callBack(err);
  }); 
},
};
