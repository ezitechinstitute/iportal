const Intern = require('../../models/Intern');

// Get interns with review status 'Review'
const GetReviewInterns = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchTerm = req.query.search || '';

    const query = {
      review: 'Review',
      status: 'Active',
    };
    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: 'i' };
    }

    const total = await Intern.countDocuments(query);
    const data = await Intern.find(query)
      .select('image name technology email joinDate phone internType')
      .skip((page - 1) * limit)
      .limit(limit);

    const results = data.map(row => ({
      image: row.image,
      name: row.name,
      technology: row.technology,
      joinDate: row.joinDate,
      phone: row.phone,
      internType: row.internType,
      email: row.email
    }));

    return res.json({
      data: results,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    console.error("GetReviewInterns error:", err);
    return res.status(500).json({ error: "Database query failed" });
  }
};

// Get interns with review status 'Non-Review'
const GetNonReviewInterns = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchTerm = req.query.search || '';

    const query = {
      review: 'Non-Review',
      status: 'Active',
    };
    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: 'i' };
    }

    const total = await Intern.countDocuments(query);
    const data = await Intern.find(query)
      .select('image name technology email joinDate phone internType')
      .skip((page - 1) * limit)
      .limit(limit);

    const results = data.map(row => ({
      image: row.image,
      name: row.name,
      technology: row.technology,
      joinDate: row.joinDate,
      phone: row.phone,
      internType: row.internType,
      email: row.email
    }));

    return res.json({
      data: results,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    console.error("GetNonReviewInterns error:", err);
    return res.status(500).json({ error: "Database query failed" });
  }
};

// Count total interns with review status 'Review'
const CountReviewInterns = async (req, res) => {
  try {
    const totalReviewInterns = await Intern.countDocuments({
      review: 'Review',
      status: 'Active'
    });
    return res.json({ totalReviewInterns });
  } catch (err) {
    console.error("CountReviewInterns error:", err);
    return res.status(500).json({ error: "Database query failed" });
  }
};

// Count total interns with review status 'Non-Review'
const CountNonReviewInterns = async (req, res) => {
  try {
    const totalNonReviewInterns = await Intern.countDocuments({
      review: 'Non-Review',
      status: 'Active'
    });
    return res.json({ totalNonReviewInterns });
  } catch (err) {
    console.error("CountNonReviewInterns error:", err);
    return res.status(500).json({ error: "Database query failed" });
  }
};

// Update review status for an intern
const UpdateReviewStatus = async (req, res) => {
  try {
    const { email, reviewStatus } = req.body;
    if (!email || !reviewStatus) {
      return res.status(400).json({ error: "Email and reviewStatus are required" });
    }

    const intern = await Intern.findOneAndUpdate(
      { email },
      { review: reviewStatus },
      { new: true }
    );

    if (!intern) {
      return res.status(404).json({ error: "Intern not found" });
    }

    return res.json({ message: "Review status updated successfully" });
  } catch (err) {
    console.error("UpdateReviewStatus error:", err);
    return res.status(500).json({ error: "Database query failed" });
  }
};

module.exports = {
  GetReviewInterns,
  GetNonReviewInterns,
  CountReviewInterns,
  CountNonReviewInterns,
  UpdateReviewStatus
};