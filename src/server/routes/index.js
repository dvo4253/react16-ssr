import express from 'express';
import fallback from './fallback';
import root from './root';

const router = express.Router();

router.use('/', root);
router.use('*', fallback);

export default router;
