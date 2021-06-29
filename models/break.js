module.exports=(sequelize,DataTypes)=>{
const Break=sequelize.define('breaks',{
   
  name: {
      type: DataTypes.STRING,
      allowNull: false
       }, 
       userId: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
      },
      status: {
        type: DataTypes.ENUM('Y', 'N')
        // allowNull defaults to true
      }
      
 });
 return Break;
}