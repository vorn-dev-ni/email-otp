 const notFoundController = (req, res, next) => {
  res.status(404).json({
    message: "page is not found",
  });
};
export default notFoundController