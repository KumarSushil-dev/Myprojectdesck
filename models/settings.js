module.exports=(sequelize,DataTypes)=>{
const Settings=sequelize.define('settings',{
   
  name: {
      type: DataTypes.STRING,
      allowNull: false
       }, 
       userId: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
      },
      type: {
        type: DataTypes.ENUM('L', 'D', 'B', 'TP')
        // allowNull defaults to true
      },      
      status: {
        type: DataTypes.ENUM('Y', 'N')
        // allowNull defaults to true
      }
      
 });
 return Settings;
}