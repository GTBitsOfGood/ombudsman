import { updateClicks } from "../../server/actions/database";

// @route   POST api/example
// @desc    Example API
// @access  Public
const handler = (req, res) => {
  const data = JSON.parse(req.body);
  updateClicks(data.category, data.filename.slice(0, -4))
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
};

export default handler;
