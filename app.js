


class App {
    constructor() {
      this.server = express() ;
      this.middlewares() ;
      this.routes() ;
      this.exceptionHandler() ;
    }
  
    middlewares() {
      this.server.disable('x-powered-by');
      this.server.use(cors());
      this.server.use(cookieParser());
      this.server.use(bodyParser.urlencoded({extended: false}));
      this.server.use(bodyParser.json());
      
      this.server.use(xss());
      this.server.use(hpp()) ;      
    }
  
    routes() {
      this.server.use('/sso', sso) ;
      
      this.server.use('*' , (req, res, next) => { 
        const err = new AppError(404, 'fail', 'Undefined route.') ;
        next(err, req, res, next) ;
      }) ;      
  
      this.server.use(GlobalErrorHandler) ;
    }
  
    exceptionHandler() {
      this.server.use(async (err, req, res, _next) => {
        if (process.env.NODE_ENV === 'development') {
          const errors = await new Youch(err, req).toJSON();
          return res.status(500).json(errors);
        }
  
        return res.status(500).json({ error: 'Internal server error' });
      });
    }
  }