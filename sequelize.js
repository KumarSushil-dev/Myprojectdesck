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
const SitesettingsModel = require('./models/sitesettings')
const UsersnapshotsModel = require('./models/usersnapshots')
const RolesModel = require('./models/roles')
const BreakModel = require('./models/break')
const UsersbreakslogsModel = require('./models/userbreaklog')
const UserapplistModel = require('./models/usersapplist')
const TaskModel = require('./models/task')
const TasksactivitiesModel = require('./models/tasksactivities')
const ProjectsModel = require('./models/projects')
const SettingsModel = require('./models/settings')
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
const Sitesettings = SitesettingsModel(sequelize, Sequelize)
const Usersnapshots = UsersnapshotsModel(sequelize, Sequelize)
const Roles = RolesModel(sequelize, Sequelize)
const Break = BreakModel(sequelize, Sequelize)
const Usersbreakslogs = UsersbreakslogsModel(sequelize, Sequelize)
const Userapplist = UserapplistModel(sequelize, Sequelize)
const Task = TaskModel(sequelize, Sequelize)
const Tasksactivities = TasksactivitiesModel(sequelize, Sequelize)
const Projects = ProjectsModel(sequelize, Sequelize)
const Settings = SettingsModel(sequelize, Sequelize)
//const Location = LocationModel(sequelize, Sequelize)
User.belongsTo(Country, { foreignKey: 'country_id' });
User.belongsTo(State, { foreignKey: 'state_id' });
User.belongsTo(Plan, { foreignKey: 'plan_id' });
User.belongsTo(Roles, { foreignKey: 'role_id' });

Subscriptions.belongsTo(Plan, { foreignKey: 'plan_id' });
Subscriptions.belongsTo(User, { foreignKey: 'userId' });
Sitesettings.belongsTo(User, { foreignKey: 'userId' });
Usersnapshots.belongsTo(User, { foreignKey: 'userId' });
Settings.belongsTo(User, { foreignKey: 'userId' });
Userapplist.belongsTo(User, { foreignKey: 'userId' });
Break.belongsTo(User, { foreignKey: 'userId' });
Usersbreakslogs.belongsTo(Break, { foreignKey: 'breaks_id' });
Tasksactivities.belongsTo(Task, { foreignKey: 'tasks_id' });
Tasksactivities.belongsTo(User, { foreignKey: 'userId' });
Task.belongsTo(Projects, { foreignKey: 'projects_id' });
Task.belongsTo(User, { foreignKey: 'userId' });
Projects.belongsTo(User, { foreignKey: 'userId' });
Userattendancelog.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Subscriptions);
User.hasMany(Usersnapshots);
//Subscriptions.hasMany(User, { foreignKey: 'id' });
//Subscriptions.hasMany(Plan, { foreignKey: 'id' });
//Location.belongsTo(User, { foreignKey: 'user_id' });

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,Country,State,Plan,Userattendancelog,Settings,Emailtemplate,Usersbreakslogs,Subscriptions,Break,Usersnapshots,Static,Sitesettings,Roles,Userapplist,Task,Tasksactivities,Projects,Op,sequelize
}