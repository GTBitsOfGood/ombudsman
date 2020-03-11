import { updateClicks } from '../../server/actions/database';

/**
 * Increment clicks for a PDF given its category and file name.
 * Sends JSON {success: boolean, payload: void}
 *
 * @route POST api/updateClicks
 * @access Public
 * @param {NextApiRequest} req
 * @param {string} req.body.category category name
 * @param {string} req.body.fileName file name
 * @param {NextApiResponse} res
 * @typedef {import("next").NextApiRequest} NextApiRequest
 * @typedef {import("next").NextApiResponse} NextApiResponse
 */
const handler = (req, res) => {
  const data = JSON.parse(req.body);
  updateClicks(data.category, data.fileName.slice(0, -4))
    .then(text =>
      res.status(201).json({
        success: true,
        payload: text
      })
    )
    .catch(() =>
      res.status(201).json({
        success: false,
        message: 'Failed to run action!'
      })
    );
};

export default handler;
