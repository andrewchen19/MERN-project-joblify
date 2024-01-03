const createPayload = (user) => {
  return { userName: user.name, userId: user._id, userRole: user.role };
};

module.exports = createPayload;
