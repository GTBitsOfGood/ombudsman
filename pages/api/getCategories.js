import { getCategories } from "../../server/actions/database";

/**
 * @typedef {{ url: string, fileName: string, views: number, category: string }} pdf Note that url refers to the image URL.
 */

/**
 * Get a list of all categories.
 * 
 * @route GET api/getCategories
 * @access Public
 * @param {object} req 
 * @param {object} res 
 * Sends JSON in the format of {Promise<{[category: string]: pdf[]}>}
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
