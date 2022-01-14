const db = require('../models/dogsmodels');

const dogscontroller = {};

dogscontroller.getDogs = async (req, res, next) => {
  try{
    const query = `
    SELECT pet.name, pet.breed, pet.gender, TO_CHAR(pet.birth_date, 'MM-DD-YYYY')AS birth_date, activity.type, TO_CHAR(activity.date, 'MM-DD-YYYY') AS date, 
    activity.time, activity.est_duration, facility.name AS facility_name, facility.address, 
    facility.city, facility.state, facility.zip, owner.phone, owner.email 
    FROM owner
    FULL OUTER JOIN pet_owner 
      ON owner.id = pet_owner.owner_id
    FULL OUTER JOIN pet
      ON pet_owner.pet_id = pet.id
    FULL OUTER JOIN activity
      ON pet.id = activity.pet_id
    FULL OUTER JOIN facility
      ON activity.id = facility.activity_id 
    ORDER BY activity.date 
      `;
    const result = await db.query(query);
    res.locals.dogs = result.rows;
    return next();
  }
  catch(err) {
    return next({
      log: `dogscontroller.getDogs: ERROR: ${err}`,
      message: {err: 'Error occured in dogscontroller.getDogs. Check server logs for more details.'}
    });
  }
};

module.exports = dogscontroller;