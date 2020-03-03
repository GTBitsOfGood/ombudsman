import { getCategories } from "../../server/actions/database";

/**
 * Get a list of all categories.
 * 
 * @route GET api/getCategories
 * @access Public
 * @param {object} req 
 * @param {object} res 
 * Sends JSON in the format of {success: boolean, payload: string[]}
 */
const handler = (req, res) =>
  getCategories()
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

export default handler;
