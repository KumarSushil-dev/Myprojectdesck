module.exports=(sequelize,DataTypes)=>{
const Projects=sequelize.define('projects',{
   
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
     }, 
     name: {
      type: DataTypes.STRING,
      allowNull: false
       },
       description: {
      type: DataTypes.STRING,
      allowNull: false
       }, 
        status: {
        type: DataTypes.ENUM('Y', 'N')
        // allowNull defaults to true
      }
      
 });
 return Projects;
}