var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./gold_medals.sqlite');

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {
  const SQLstring = `
  CREATE TABLE Country (
    name TEXT NOT NULL,
    code INTEGER NOT NULL,
    gdp INTEGER,
    population INTEGER);`
  return SQLstring
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {
  const SQLstring = `
  CREATE TABLE GoldMedal (
    id INTEGER PRIMARY KEY,
    year INTEGER NOT NULL,
    city TEXT NOT NULL,
    season TEXT NOT NULL,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    gender TEXT NOT NULL,
    sport TEXT NOT NULL,
    discipline TEXT NOT NULL,
    event TEXT NOT NULL
  );`;
  return SQLstring;
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = country => {
  const SQLstring = `
  SELECT COUNT(*) AS count
  FROM GoldMedal
  WHERE country = '${country}';`;
  return SQLstring;
};

/*
Returns a SQL query string that will find the year where the given country
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = country => {
  const SQLstring = `
  WITH previous_query AS (
    SELECT year, COUNT(*) AS count
    FROM GoldMedal
    WHERE country = '${country}' AND season = 'Summer'
    GROUP BY year
  )

  SELECT year, MAX(previous_query.count)
  FROM previous_query;`;
  return SQLstring;
};

/*
Returns a SQL query string that will find the year where the given country
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = country => {
  const SQLstring = `
  WITH previous_query AS (
    SELECT year, COUNT(*) AS count
    FROM GoldMedal
    WHERE country = '${country}' AND season = 'Winter'
    GROUP BY year
  )

  SELECT year, MAX(previous_query.count)
  FROM previous_query;`;
  return SQLstring;
};

/*
Returns a SQL query string that will find the year where the given country
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestYear = country => {
  const SQLstring = `
  WITH previous_query AS (
    SELECT year, COUNT(*) AS count
    FROM GoldMedal
    WHERE country = '${country}'
    GROUP BY year
  )

  SELECT year, MAX(previous_query.count)
  FROM previous_query;`;
  return SQLstring;
};

/*
Returns a SQL query string that will find the discipline this country has
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = country => {
  const SQLstring = `
  WITH previous_query AS (
    SELECT discipline, COUNT(*) AS count
    FROM GoldMedal
    WHERE country = '${country}'
    GROUP BY discipline
  )

  SELECT discipline, MAX(previous_query.count)
  FROM previous_query;`;
  return SQLstring;
};

/*
Returns a SQL query string that will find the sport this country has
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = country => {
  const SQLstring = `
  WITH previous_query AS (
    SELECT sport, COUNT(*) AS count
    FROM GoldMedal
    WHERE country = '${country}'
    GROUP BY sport
  )

  SELECT sport, MAX(previous_query.count)
  FROM previous_query;`;
  return SQLstring;
};

/*
Returns a SQL query string that will find the event this country has
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = country => {
  const SQLstring = `
  WITH previous_query AS (
    SELECT event, COUNT(*) AS count
    FROM GoldMedal
    WHERE country = '${country}'
    GROUP BY event
  )

  SELECT event, MAX(previous_query.count)
  FROM previous_query;`;
  return SQLstring;
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = country => {
  const SQLstring = `
  SELECT COUNT(DISTINCT name)
  FROM GoldMedal
  WHERE country = '${country}' AND gender = 'Men';`;
  return SQLstring;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = country => {
  const SQLstring = `
  SELECT COUNT(DISTINCT name)
  FROM GoldMedal
  WHERE country = '${country}' AND gender = 'Women';`;
  return SQLstring;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = country => {
  const SQLstring = `
  SELECT DISTINCT name
  FROM GoldMedal
  WHERE country = '${country}'
  ORDER BY 1 DESC
  LIMIT 1;`;
  return SQLstring;
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, sortAscending) => {
  let SQLstring = '';
  let orderBy = '';

  let order = '';
  sortAscending ? order = 'ASC': order = 'DESC'

  if (field) {
    orderBy = `ORDER BY ${field} ${order}`
  }

  SQLstring = `
  SELECT *
  FROM GoldMedal
  WHERE country = '${country}'
  ${orderBy};`;
  
  return SQLstring;
};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, sortAscending) => {
  return;
};

module.exports = {
  createCountryTable,
  createGoldMedalTable,
  goldMedalNumber,
  mostSummerWins,
  mostWinterWins,
  bestDiscipline,
  bestSport,
  bestYear,
  bestEvent,
  numberMenMedalists,
  numberWomenMedalists,
  mostMedaledAthlete,
  orderedMedals,
  orderedSports
};
