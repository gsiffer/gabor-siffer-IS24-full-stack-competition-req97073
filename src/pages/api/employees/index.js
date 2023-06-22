import { employees } from "../../../../data/employees";

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      res.status(200).json(employees);
    } catch (err) {
      res.status(500).json({ status: 500, msg: `${err}` });
    }
  }
}
