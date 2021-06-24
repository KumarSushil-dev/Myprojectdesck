module.exports=(sequelize,DataTypes)=>{
const Usersnapshots=sequelize.define('users_snapshotscapture',{

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
     },
  productivityCount: {
      type: DataTypes.STRING,
     // allowNull: false
       },
       screenshot: {
        type: DataTypes.STRING,
       // allowNull: false
         },
         totalIdleMinutes: {
          type: DataTypes.INTEGER,
        //  allowNull: false
           }, 
           totalKeypressCount: {
            type: DataTypes.INTEGER,
          //  allowNull: false
             }, 
             totalMouseMovement: {
              type: DataTypes.INTEGER,
            //  allowNull: false
               }, 
               totalClicks: {
                type: DataTypes.INTEGER,
              //  allowNull: false
                 }, 
                 capturetime: {
                  type: DataTypes.DATE,
                //  allowNull: false
                   }, 
                   applist: {
                    type: DataTypes.STRING,
                  //  allowNull: false
                     }
      
 });
 return Usersnapshots;
}