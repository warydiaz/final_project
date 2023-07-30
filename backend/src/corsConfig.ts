import cors from 'cors';

const allowedOrigins = ['https://www.tu-pagina-web.com'];

const corsOptions = {
  origin: (origin: string | undefined, callback: cors.OriginCallback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Access denied.'));
    }
  }
};

export default corsOptions;