import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config.js';
import StudentModel from './student.model.js';
import CourseModel from './course.model.js';
import TeacherModel from './teacher.model.js';
import UserModel from './user.model.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student = StudentModel(sequelize, Sequelize);
db.Course = CourseModel(sequelize, Sequelize);
db.Teacher = TeacherModel(sequelize, Sequelize);
db.User = UserModel(sequelize, Sequelize);

// Associations
db.Teacher.hasMany(db.Course);
db.Course.belongsTo(db.Teacher);

db.Course.belongsToMany(db.Student, { through: "CourseStudent" });
db.Student.belongsToMany(db.Course, { through: "CourseStudent" });

// Sync database with safer options
try {
  await sequelize.sync({ force: false, alter: false }); // Changed to safer sync
  console.log('✅ Database synced successfully');
} catch (error) {
  console.error('❌ Database sync failed:', error.message);
}

export default db;
