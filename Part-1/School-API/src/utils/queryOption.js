import db from '../models/index.js';

export const buildQueryOptions = (req, allowedIncludes = []) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort === 'desc' ? 'DESC' : 'ASC';
  const populate = req.query.populate;

  const options = {
    limit,
    offset: (page - 1) * limit,
    order: [['createdAt', sort]],
  };

  if (populate) {
    const includes = [];
    const modelsToInclude = populate.split(',');

    modelsToInclude.forEach((modelName) => {
      if (allowedIncludes.includes(modelName)) {
        switch (modelName) {
          case 'Course':
            includes.push({ model: db.Course, as: 'Courses' });
            break;
          case 'Teacher':
            includes.push({ model: db.Teacher });
            break;
          case 'Student':
            includes.push({ model: db.Student, as: 'Students' });
            break;
          default:
            if (db[modelName]) {
              includes.push({ model: db[modelName] });
            }
        }
      }
    });

    if (includes.length > 0) options.include = includes;
  }

  return options;
};
