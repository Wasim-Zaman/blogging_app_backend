const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (email, name, password) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: password,
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email.toString(),
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data,
    });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
