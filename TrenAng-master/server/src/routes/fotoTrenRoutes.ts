import { Router, Request, Response } from 'express';

class FotoTrenRoutes{
    public router : Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', (req, res) => {
            res.send('Trenes');
        });
    }
}

const fotoTrenRoutes = new FotoTrenRoutes();
export default fotoTrenRoutes.router;