import { addInfo } from '../../server/actions/database';

/**
 * Add key word to the metedata of a PDF given its category, file name, and a keyword.
 * Sends JSON {success: boolean, payload: void}
 *
 * @route POST api/addKeyword
 * @access Public
 * @param {NextApiRequest} req
 * @param {string} req.body.category category name
 * @param {string} req.body.fileName file name
 * @param {string} req.body.tag tag* 
 * @param {string} req.body.description description
 * @param {Array} req.body.keyWords keyWords
 * @param {NextApiResponse} res
 * @typedef {import("next").NextApiRequest} NextApiRequest
 * @typedef {import("next").NextApiResponse} NextApiResponse
 */
const handler = (req, res) => {
  const data = JSON.parse(req.body);
  addInfo(data.category, data.fileName.slice(0, -4), data.tag, data.description, data.keyWords)
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
