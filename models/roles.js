module.exports=(sequelize,DataTypes)=>{
    const Roles=sequelize.define('roles',{
       
      name: {
          type: DataTypes.STRING,
          allowNull: false
           }, 
         
          status: {
            type: DataTypes.ENUM('Y', 'N')
            // allowNull defaults to true
          }
          
     });
     return Roles;
    }