import { getCategories } from "../../server/actions/database";

/**
 * Get a list of all categories and the PDFs in those categories. The response sends JSON in the format of {[category: string]: { fileName: string, views: number }[]}.
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
