import { addKeyword } from '../../server/actions/database';

/**
 * Add key word to the metedata of a PDF given its category, file name, and a keyword.
 * Sends JSON {success: boolean, payload: void}
 *
 * @route POST api/addKeyword
 * @access Public
 * @param {NextApiRequest} req
 * @param {string} req.body.category category name
 * @param {string} req.body.fileName file name
 * @param {string} req.body.keyWord keyword
 * @param {NextApiResponse} res
 * @typedef {import("next").NextApiRequest} NextApiRequest
 * @typedef {import("next").NextApiResponse} NextApiResponse
 */
const handler = (req, res) => {
  const data = JSON.parse(req.body);
  addKeyword(data.category, data.fileName.slice(0, -4), data.keyWord)
    .then(text =>
      res.status(201).json({
        success: true,
        payload: text
      })
    )
    .catch((error) =>
      res.status(201).json({
        success: false,
        message: error
      })
    );
};

export default handler;
