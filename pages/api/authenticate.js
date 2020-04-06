import { authenticate } from '../../server/actions/database';

const handler = (req, res) =>
  authenticate()
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

export default handler;