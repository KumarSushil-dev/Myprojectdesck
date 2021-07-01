module.exports=(sequelize,DataTypes)=>{
const Userapplist=sequelize.define('users_applistcaptures',{

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
     },
     idleTime: {
      type: DataTypes.INTEGER,
     // allowNull: false
       },
       count: {
      type: DataTypes.INTEGER,
     // allowNull: false
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
 return Userapplist;
}