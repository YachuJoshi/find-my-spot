import { pool } from "../db";

const getNearestParkingSpotLocation = async (req, res, next) => {
  const { lat, long } = req.query;

  if (!lat || !long) {
    return res.status(400).send("Bad Request");
  }

  const { rows } = await pool.query(
    `
    SELECT 
      c.id, c.name, 
      c.longitude, c.latitude, c.img_name,
      c.available_space, t.distance
    FROM camera AS c
    INNER JOIN (
        SELECT id, ST_DISTANCE(c.geolocation, ST_MakePoint($1, $2))
        AS distance
        FROM camera c
        WHERE c.available_space > 0
        ORDER BY distance
        LIMIT 1
    ) AS t
    ON c.id = t.id;
    `,
    [long, lat]
  );

  return res.status(200).json(rows[0]);
};

const recheckParkSpotById = async (req, res, next) => {
  const { id } = req.params;

  if (id === undefined || id === null) return;

  const { rows } = await pool.query(
    `SELECT * FROM available_spot WHERE id = $1`,
    [id]
  );

  if (rows.length < 1) {
    return res
      .status(404)
      .json({ message: `Parking Space w/ id ${id} not found!` });
  }

  const { available_space: availableSpace } = rows[0];

  if (availableSpace > 0)
    return res.status(200).json({
      isAvailable: true,
    });

  return res.status(200).json({
    isAvailable: false,
  });
};
export { getNearestParkingSpotLocation, recheckParkSpotById };
