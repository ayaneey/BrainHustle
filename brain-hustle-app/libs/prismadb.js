const { PrismaClient } = require("@prisma/client");

// Declare global variable
global.prisma = global.prisma || new PrismaClient();

// Check if not in production environment
if (process.env.NODE_ENV !== "production") global.prisma = global.prisma;

module.exports = global.prisma;
