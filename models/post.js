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
  return await prisma.post.findUnique({
    where: { id },
  });
};

const updatePost = async (id, data) => {
  return await prisma.post.update({
    where: { id },
    data,
  });
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
