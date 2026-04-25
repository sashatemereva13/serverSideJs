import validator from "validator";

const validateStudent = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "request body is missing" });
  }

  const { name, email, password, major, gpa } = req.body;

  // Name
  if (!name || name.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "Name must be at least 2 characters" });
  }

  // Email
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  // Password
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }

  // GPA (optional but if present must be valid)
  if (gpa !== undefined) {
    if (!validator.isFloat(gpa.toString(), { min: 0, max: 4 })) {
      return res.status(400).json({ error: "GPA must be between 0 and 4" });
    }
  }

  next();
};

export default validateStudent;
