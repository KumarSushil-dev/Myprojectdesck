module.exports=(sequelize,DataTypes)=>{
const Emailtemplate=sequelize.define('emailtemplates',{
   
  title: {
      type: DataTypes.STRING,
      allowNull: false
       }, 
       subject: {
      type: DataTypes.STRING,
      allowNull: false
       }, 
       format: {
        type: DataTypes.STRING,
        allowNull: false
         }, 
     
      status: {
        type: DataTypes.ENUM('Y', 'N')
        // allowNull defaults to true
      }
      
 });
 return Emailtemplate;
}