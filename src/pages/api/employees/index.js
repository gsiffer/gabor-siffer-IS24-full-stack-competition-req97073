import { employees } from "../../../../data/employees";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(employees);
  }
}