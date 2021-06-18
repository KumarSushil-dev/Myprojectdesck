module.exports=(sequelize,DataTypes)=>{
const Plan=sequelize.define('plans',{
   
  name: {
      type: DataTypes.STRING,
      allowNull: false
       }, 
       price: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      status: {
        type: DataTypes.ENUM('Y', 'N')
        // allowNull defaults to true
      }
      
 });
 return Plan;
}