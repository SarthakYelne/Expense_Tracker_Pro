const userDashboard = (req, res) => {
  res.status(200).json({
    status: "User Dashboard",
  });
};

module.exports = userDashboard;
