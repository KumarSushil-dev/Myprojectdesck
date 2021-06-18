module.exports=(sequelize,DataTypes)=>{
const Country=sequelize.define('countries',{
   
  name: {
      type: DataTypes.STRING,
      allowNull: false
       }, 
     
      status: {
        type: DataTypes.ENUM('Y', 'N')
        // allowNull defaults to true
      }
      
 });
 return Country;
}