import { getPDF } from "../../server/actions/database";

/**
 * Get all PDFs.
 *
 * @route GET api/getPDF
 * @access Public
 * @param {object} req
 * @param {object} res
 * Send JSON in the format of {success: boolean, payload: {pdfMap: Object.<string, pdf[]>, sortedPdfs: pdf[]}
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
