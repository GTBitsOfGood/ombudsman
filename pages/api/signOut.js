import { signOut } from '../../server/actions/database';

const handler = (req, res) =>
  signOut()
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