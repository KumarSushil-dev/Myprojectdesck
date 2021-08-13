module.exports = (sequelize, DataTypes) => {
  const Subscriptions = sequelize.define('subscriptions', {

    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Y', 'N', 'D')
      // allowNull defaults to true
    },
    plantotalprice: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    taxprice: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    peruserprice: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    payment_detail: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    payment_id: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    order_id: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    signature_razorpay: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    totaluser: {
      type: DataTypes.INTEGER,
      // allowNull: false
    }, discount: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    dropreason: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    isdrop: {
      type: DataTypes.ENUM('Y', 'N')
      // allowNull: false
    },
    dropdate: {
      type: DataTypes.DATE
      // allowNull: false
    }

  });



  return Subscriptions;
}