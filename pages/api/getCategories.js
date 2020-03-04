import { getCategories } from "../../server/actions/database";

/**
 * @typedef {{ url: string, fileName: string, views: number, category: string }} pdf Note that url refers to the image URL.
 */

/**
 * Get a list of all categories. Sends JSON in the format of {[category: string]: pdf[]}, where pdf is { url: string, fileName: string, views: number, category: string } (and url refers to the image URL).
 * 
 * @route GET api/getCategories
 * @access Public
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 * @typedef {import("next").NextApiRequest} NextApiRequest
 * @typedef {import("next").NextApiResponse} NextApiResponse
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
