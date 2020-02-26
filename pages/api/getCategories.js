import { getCategories } from "../../server/actions/database";

// @route   POST api/getCategories
// @desc    Example API
// @access  Public
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
