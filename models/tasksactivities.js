module.exports=(sequelize,DataTypes)=>{
    const Tasksactivities=sequelize.define('tasks_activities',{
       
          userId: {
          type: DataTypes.INTEGER,
          allowNull: false
           }, 
           tasks_id: {
          type: DataTypes.INTEGER,
          allowNull: false
           }, 
           keypress: {
          type: DataTypes.STRING,
         
           }, 
          mouseclicked: {
            type: DataTypes.STRING,
          
             },
          mousemoved: {
              type: DataTypes.STRING,
            
               },
           starttime: {
          type: DataTypes.DATE,
          allowNull: false
          },
          endtime: {
           type: DataTypes.DATE,
         //  allowNull: false
          },
          manuallyend_time: {
           type: DataTypes.DATE,
         //  allowNull: false
          },
          status: {
            type: DataTypes.ENUM('Y', 'N')
            // allowNull defaults to true
          }
          
     });
     return Tasksactivities;
    }