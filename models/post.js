const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPost = async (title, imageUrl, content, creator) => {
  return await prisma.post.create({
    data: {
      title,
      imageUrl,
      content,
      creator,
    },
  });
};

const getPostById = async (id) => {
  try {
    return await prisma.post.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};

const updatePost = async (id, data) => {
  try {
    return await prisma.post.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
    console.error("Error updating post by ID:", error);
    throw error;
  }
};

const deletePost = async (id) => {
  return await prisma.post.delete({
    where: { id },
  });
};

const getAllPosts = async () => {
  return await prisma.post.findMany();
};

module.exports = {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getAllPosts,
};
