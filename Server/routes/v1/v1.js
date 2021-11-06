import express from 'express';
import * as USER from './user';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        code: 200,
        v: 'v1',
        status: 'OK'
    });
});

router.post('/user/signUp', USER.signUp);

export default router;