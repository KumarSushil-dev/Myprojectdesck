module.exports=(sequelize,DataTypes)=>{

const Sendmessage=sequelize.define('sendmessage',{
   
         name: {
         type: DataTypes.STRING,
         allowNull: false
         }, 
         email: {
        type: DataTypes.STRING,
         allowNull: false
            }, 
        subject: {
        type: DataTypes.STRING,
         allowNull: false
         },
        phone: {
         type: DataTypes.STRING,
         allowNull: false
           },
         description: {
         type: DataTypes.STRING,
         allowNull: false
         }
      
 });
 return Sendmessage;
}