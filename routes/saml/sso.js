import SamlAuthController from '../../app/controllers/user/SamlAuthController';

const express = require('express');

const router = express.Router() ;

router.get('/metadata', SamlAuthController.getMetaDataInfo );

export default router;