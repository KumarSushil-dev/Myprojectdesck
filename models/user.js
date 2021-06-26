module.exports=(sequelize,DataTypes)=>{
const User=sequelize.define('users',{
   
    companyname: {
      type: DataTypes.STRING,
      allowNull: false
       }, 
      firstname: {
      type: DataTypes.STRING,
   // allowNull: false
      },
      lastname: {
       type: DataTypes.STRING,
     // allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false 
       },
       dob: {
        type: DataTypes.STRING,
        //allowNull: false 
      },
      mobile: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      activation_key: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      plan_id: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      parent_id: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
      },
      country_id: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
      },
      state_id: {
        type: DataTypes.INTEGER
        // allowNull defaults to true
      },
      address: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      city: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      zipcode: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      logo: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      status: {
        type: DataTypes.ENUM('Y', 'N')
        // allowNull defaults to true
      },
      is_screenshot: {
        type: DataTypes.ENUM('Y', 'N')
        // allowNull defaults to true
      }
      
 });
 return User;
}