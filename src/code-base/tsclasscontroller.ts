import { Router, Response, Request } from "express";
import * as express from "express";
import { ControllerInterface } from "src/utils/interfaces/controller.interface";

class DemoController implements ControllerInterface {
  path = "/test";
  router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.index);
  }
  public index(req: Request, res: Response) {
    res.json({});
  }
}
export default DemoController;
