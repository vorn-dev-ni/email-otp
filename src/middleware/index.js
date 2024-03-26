export const CustomMiddleware = (req, res, next) => {
  next();
};

export const restrictUser = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user?.role)) {
      return next();
    }

    return next({
      message: "Unauthorize",
      name: "RoleError",
      status: 402,
    });
  };
};
