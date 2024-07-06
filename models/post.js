const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPost = async (title, imageUrl, content, userId) => {
  const post = await prisma.post.create({
    data: {
      title,
      imageUrl,
      content,
      userId,
    },
  });
  return post;
};

const getPostById = async (id) => {
  return await prisma.post.findUnique({
    where: { id: Number(id) },
  });
};

const updatePost = async (id, data) => {
  return await prisma.post.update({
    where: { id: Number(id) },
    data,
  });
};

const deletePost = async (id) => {
  return await prisma.post.delete({
    where: { id: Number(id) },
  });
};

const getAllPosts = async () => {
  return await prisma.post.findMany();
};

const getPaginatedPosts = async (skip, take) => {
  const posts = await prisma.post.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" },
  });
  const totalPosts = await prisma.post.count();
  return { posts, totalPosts };
};

module.exports = {
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getAllPosts,
  getPaginatedPosts,
};
