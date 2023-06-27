import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === 'GET') {
    try {
      const entries = await prisma.todos.findMany();
      res.status(200).json(entries);
    } catch (error) {
      res.status(400).send(error);
    }
  } else if (req.method === 'POST') {
    const {disc } = req.body;
    try {
      const entries = await prisma.todos.create({
        data: { disc },
      });
      res.status(201).json(entries);
    } catch (error) {
      res.status(400).send(error);
    }
  } 

  await prisma.$disconnect();
}