import express from 'express';
import service from '../services/transactionService.js';
const entriesRouter = express.Router();

entriesRouter.post('/', service.postEntry);
entriesRouter.get('/', service.getEntriesByPeriod);
entriesRouter.get('/periods', service.getPeriods);
entriesRouter.patch('/:id', service.patchEntry);
entriesRouter.delete('/:id', service.deleteEntry);

export default entriesRouter;
