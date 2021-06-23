const { Plan,Op } = require('../../sequelize');
var p;

module.exports = {
    getplan: async(data, callBack) => {
        await Plan.findAll({
           
        }).then(getplanlist => callBack(null, getplanlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    getplanforselect: async(data, callBack) => {
        await Plan.findAll({
            where: {status:'Y',id: {[Op.notIn]:[5]}},
            order:[['id','ASC']],
        }).then(getplanlist => callBack(null, getplanlist)).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    addplan: async(data, callBack) => {
     
        await Plan.create({name:data.name,price:data.price}).then(function(){
            Plan.findAll({
               
            }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    editplan: async(data, callBack) => {
     
        await Plan.update({name: data.name,price:data.price},{
            where: {id: data.id}
        }).then(function(){
            Plan.findAll({
               
            }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    editshows: async(data, callBack) => {
     
        await Plan.findByPk(data.id).then(notes => callBack(null,notes)).
        catch(function (err) {
            // handle error;
            return callBack(err);
          }); 
    },
    planupdatestatusbyid: async(data, callBack) => {
   
        
        await Plan.update({status: data.name},{
            where: {id: data.id}
        }).then(function(){
            Plan.findAll({
               
            }).then(notes => callBack(null,notes));                      
             }).catch(function (err) {
            // handle error;
            return callBack(err);
          }); 

     

    },

    
    plandeletesuperbyid: async(data, callBack) => {
await Plan.destroy({
    where: {id: data.id}
}).then(function(){
    Plan.findAll({
       
    }).then(notes => callBack(null,notes));                      
     }).catch(function (err) {
    // handle error;
    return callBack(err);
  }); 
},
};
