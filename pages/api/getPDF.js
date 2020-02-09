import { getPDF } from "../../server/actions/storage";

// @route   POST api/example
// @desc    Example API
// @access  Public
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
