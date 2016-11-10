import { Router, Response, Request, NextFunction } from 'express';

const router: Router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
  	title: 'mancalaNg'
  });
});

export { router }
