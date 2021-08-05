module.exports=(sequelize,DataTypes)=>{

const Testimonial=sequelize.define('testimonial',{
   
         name: {
         type: DataTypes.STRING,
         allowNull: false
         }, 
         description: {
         type: DataTypes.STRING,
         allowNull: false
         }, 
         image: {
            type: DataTypes.STRING,
           allowNull: false
                }, 
         status: {
         type: DataTypes.ENUM('Y', 'N')
        // allowNull defaults to true
         }
      
 });
 return Testimonial;
}