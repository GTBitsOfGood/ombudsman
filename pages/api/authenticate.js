import { authenticate } from '../../server/actions/database';

const handler = (req, res) => {
  const data = JSON.parse(req.body);
  authenticate(data.email, data.password)
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
}

export default handler;