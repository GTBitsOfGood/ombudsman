import { getPDF } from "../../server/actions/database";

/**
 * Get all PDFs. Sends JSON in the format of {success: boolean, payload: {pdfMap: Object.<[category: string], pdf[]>, sortedPdfs: pdf[]}}, where pdf is in the format of { url: string, fileName: string, views: number, category: string }
 *
 * @route GET api/getPDF
 * @access Public
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 * @typedef {import("next").NextApiRequest} NextApiRequest
 * @typedef {import("next").NextApiResponse} NextApiResponse
 * @typedef {{ url: string, fileName: string, views: number, category: string }} pdf
 */
const handler = (req, res) =>
  getPDF()
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
