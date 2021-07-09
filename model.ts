import { Router, Response, Request } from "express";
import * as express from "express";
import { ControllerInterface } from "src/utils/interfaces/controller.interface";

class model implements ControllerInterface {
  // public path = "/posts";
  // public router = express.Router();
  path = "/posts";
  router = express.Router();

  constructor() {
    this.intializeRoutes();
  }
  public intializeRoutes() {}
}
