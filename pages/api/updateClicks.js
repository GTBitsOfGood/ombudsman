import { updateClicks } from "../../server/actions/database";

/**
 * Increment clicks for a PDF.
 * 
 * @route POST api/updateClicks
 * @access Public
 * @param {object} req
 * @param {string} req.body.category
 * @param {string} req.body.filename
 * @param {object} res 
 * Sends JSON {success: boolean, payload: void}
 */
const handler = (req, res) => {
  const data = JSON.parse(req.body);
  updateClicks(data.category, data.filename.slice(0, -4))
    .then(text =>
      res.status(201).json({
        success: true,
        payload: text
      })
    )
    .catch(() =>
      res.status(201).json({
        success: false,
        message: "Failed to run action!"
      })
    );
};

export default handler;
