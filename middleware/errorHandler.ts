import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import { ConflictError, NotFoundError, ValidationError } from '../exceptions/CustomError';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  if(err instanceof NotFoundError){
    return res.status(404).json({success:false,message:err.message});
  }else if(err instanceof ConflictError){
    return res.status(404).json({success:false,message:err.message});
  }else if(err instanceof ValidationError){
    return res.status(404).json({success:false,message:err.message});
  }else{
    return res.status(500).json({
                                  success: false,
                                  message
                                });
  }
};

export default errorHandler;
