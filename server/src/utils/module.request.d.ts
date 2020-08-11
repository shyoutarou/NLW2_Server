declare module 'express-serve-static-core' {
    interface Request {
      user?: any;
    }
  }
  
  export default Request;