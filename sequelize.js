const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const UserModel = require('./models/user')
const CountryModel = require('./models/country')
const StateModel = require('./models/state')
const PlanModel = require('./models/plan')
const UserattendancelogModel = require('./models/userattendancelog')
const EmailtemplateModel = require('./models/emailtemplate')
const SubscriptionsModel = require('./models/subscription')
const StaticModel = require('./models/staticpages')
//const LocationModel = require('./models/location')


const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    multipleStatements: true
  }
})

const User = UserModel(sequelize, Sequelize)
const Country = CountryModel(sequelize, Sequelize)
const State = StateModel(sequelize, Sequelize)
const Plan = PlanModel(sequelize, Sequelize)
const Userattendancelog = UserattendancelogModel(sequelize, Sequelize)
const Emailtemplate = EmailtemplateModel(sequelize, Sequelize)
const Subscriptions = SubscriptionsModel(sequelize, Sequelize)
const Static = StaticModel(sequelize, Sequelize)
//const Location = LocationModel(sequelize, Sequelize)
User.belongsTo(Country, { foreignKey: 'country_id' });
User.belongsTo(State, { foreignKey: 'state_id' });
User.belongsTo(Plan, { foreignKey: 'plan_id' });
User.hasMany(Subscriptions);
//Subscriptions.hasMany(User, { foreignKey: 'id' });
//Subscriptions.hasMany(Plan, { foreignKey: 'id' });
//Location.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,Country,State,Plan,Userattendancelog,Emailtemplate,Subscriptions,Static,Op
}