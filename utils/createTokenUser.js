const createTokenUser = (user) => {
  return {
    name: user.firstname,
    userId: user.id,
    universityId: user.university_id,
    role: user.role,
  };
};

module.exports = createTokenUser;
