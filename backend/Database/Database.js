const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  user: process.env.POSTGRESUSER,
  host: "127.0.0.1",
  database: process.env.POSTGRESNAME,
  password: process.env.POSTGRESPW,
  port: 5432, // portnumber
});

async function getPerson(name, nationality, gender, height, weight, sport){
  const values = [];
  let conditions = ["m.medal_name IN ('Gold', 'Silver', 'Bronze')"];

  let query = "SELECT\
  p.id,\
  p.full_name,\
  COUNT(*) FILTER (WHERE m.medal_name = 'Gold') AS gold_medals,\
  COUNT(*) FILTER (WHERE m.medal_name = 'Silver') AS silver_medals,\
  COUNT(*) FILTER (WHERE m.medal_name = 'Bronze') AS bronze_medals,\
  p.gender,\
  p.height,\
  p.weight,\
  nr.region_name,\
  s.sport_name\
  FROM olympics.person p\
  INNER JOIN olympics.games_competitor gc ON p.id = gc.person_id\
  INNER JOIN olympics.competitor_event ce ON gc.id = ce.competitor_id\
  INNER JOIN olympics.medal m ON ce.medal_id = m.id\
  INNER JOIN olympics.person_region pr ON p.id = pr.person_id\
  INNER JOIN olympics.noc_region nr ON pr.region_id = nr.id\
  INNER JOIN olympics.event e ON ce.event_id = e.id\
  INNER JOIN olympics.sport s ON e.sport_id = s.id";

  const last =  "GROUP BY p.id, p.full_name, nr.region_name, s.sport_name\
  ORDER BY gold_medals DESC, silver_medals DESC, bronze_medals DESC;\
  "

  if (name) {
    values.push(name);
    conditions.push(`p.full_name LIKE \'%\' || $${values.length} || \'%\'`);
  }

  if (nationality) {
    values.push(nationality);
    conditions.push(`nr.region_name = $${values.length}`);
  }
  if (gender) {
    if(gender === 'male'){
      values.push('M');
    }else{
      values.push('F');
    }
    conditions.push(`p.gender = $${values.length}`);
  }
  if (height) {
    values.push(height.value);
    if(height.comp === 'equal'){
      conditions.push(`p.height = $${values.length}`);
    }else if(height.comp === 'more'){
      conditions.push(`p.height > $${values.length}`);
    }else{
      conditions.push(`p.height < $${values.length}`);
    }
  }
  if (weight) {
    values.push(weight.value);
    if(weight.comp === 'equal'){
      conditions.push(`p.weight = $${values.length}`);
    }else if(weight.comp === 'more'){
      conditions.push(`p.weight > $${values.length}`);
    }else{
      conditions.push(`p.weight < $${values.length}`);
    }
  }
  if (sport) {
    values.push(sport);
    conditions.push(`s.sport_name = $${values.length}`)
  }

  if (conditions.length) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  query += " " + last;

  console.log(query)

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.log(error);
    return -1;
  }
} 

module.exports = {pool, getPerson};
