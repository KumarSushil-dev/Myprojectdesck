module.exports=(sequelize,DataTypes)=>{

const State=sequelize.define('states',{
   
     name: {
      type: DataTypes.STRING,
      allowNull: false
       }, 
     
      status: {
        type: DataTypes.ENUM('Y', 'N')
        // allowNull defaults to true
      }
      
 });
 return State;
}