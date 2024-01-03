import { Request, Response } from "express";

const baseUrl: string = "";
class BaseController {
  success(res: Response, data: any) {
    return res.status(200).json({ message: "success", data });
  }
}

class Controller extends BaseController {
  async root(req: Request, res: Response) {
    return res.json({
      message: "welcome",
    });
  }
}

export default new Controller();
