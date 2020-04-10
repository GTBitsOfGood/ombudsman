import { isSignedIn } from '../../server/actions/database';

/**
 * Returns the user object if signed in or null otherwise.
 *
 * @route GET api/getPDF
 * @access Public
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @typedef {import("next").NextApiRequest} NextApiRequest
 * @typedef {import("next").NextApiResponse} NextApiResponse
 */
const handler = (req, res) =>
  isSignedIn()
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

export default handler;
