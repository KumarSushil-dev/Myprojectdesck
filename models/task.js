module.exports=(sequelize,DataTypes)=>{
    const Task=sequelize.define('tasks',{
       
        projects_id: {
          type: DataTypes.INTEGER,
          allowNull: false
           }, 
           userId: {
            type: DataTypes.INTEGER,
            allowNull: false
             }, 
             name: {
                type: DataTypes.STRING,
                allowNull: false
                 }, 
            priority: {
                    type: DataTypes.ENUM('Low', 'Medium', 'Urgent'),
                    allowNull: false
                     }, 
         startdate: {
                type: DataTypes.DATE,
                 allowNull: false
                         }, 
        enddate: {
                 type: DataTypes.DATE,
                 allowNull: false
                             },
        status: {
            type: DataTypes.ENUM('Y', 'N')
            // allowNull defaults to true
          }
          
     });
     return Task;
    }