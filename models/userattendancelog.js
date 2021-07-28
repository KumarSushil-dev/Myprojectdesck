module.exports=(sequelize,DataTypes)=>{
    const Userattendancelog=sequelize.define('users_attendancelogs',{
       
      userId: {
          type: DataTypes.INTEGER,
          allowNull: false
           }, 
           punch_in: {
          type: DataTypes.DATE,
          allowNull: false
          },
          punch_out: {
           type: DataTypes.DATE,
         //  allowNull: false
          },
          duration : {
            type: DataTypes.INTEGER,
            //allowNull: false

          }
          
     });
     return Userattendancelog;
    }