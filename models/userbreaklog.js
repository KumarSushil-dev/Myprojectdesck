module.exports=(sequelize,DataTypes)=>{
    const Usersbreakslogs=sequelize.define('users_breakslogs',{
       
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false
           }, 
           breaks_id: {
          type: DataTypes.INTEGER,
          allowNull: false
           }, 
           starttime: {
          type: DataTypes.DATE,
          allowNull: false
          },
          endtime: {
           type: DataTypes.DATE,
         //  allowNull: false
          }
          
     });
     return Usersbreakslogs;
    }