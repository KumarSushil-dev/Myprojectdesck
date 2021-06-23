module.exports=(sequelize,DataTypes)=>{
    const Sitesettings=sequelize.define('site_settings',{
       
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
           }, 
           screenshot_freq: {
            type: DataTypes.ENUM('12', '6','4', '3')
            // allowNull defaults to true
          },
          is_screenshot_enable: {
            type: DataTypes.ENUM('Y', 'N')
            // allowNull defaults to true
          },
          user_logintime: {
            type: DataTypes.INTEGER,
             }, 
             idle_threshold: {
                type: DataTypes.INTEGER,
                 }, 
                 idle_threshold_punchout: {
                    type: DataTypes.INTEGER,
                     }, 
                     is_auto_punchout: {
                        type: DataTypes.ENUM('Y', 'N')
                         }, 
                         punchout_time: {
                            type: DataTypes.STRING,
                             }, 
          
     });
     return Sitesettings;
    }