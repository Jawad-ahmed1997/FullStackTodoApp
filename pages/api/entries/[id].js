import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
        const todoId = parseInt(id);
      const todoEntry = await prisma.todos.findUnique({
        where: { id: todoId }
      });

      if (todoEntry) {
        res.status(200).json(todoEntry);
      } else {
        res.status(404).json({ message: 'todo not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }else if (req.method === 'PUT') {
    const {disc} = req.body;
    const {id} = req.query

    console.log(id, disc)
    try {
        const todoId = parseInt(id);
      const updatedtodo = await prisma.todos.update({
        where: { id: todoId},
        data: {disc},
      });
      res.status(200).json(updatedtodo);
    } catch (error) {
        console.log(error)
      res.status(400).send(error);
    }
  } else if (req.method === 'DELETE') {
    try {
        const todoId = parseInt(id);
      const deletedtodo = await prisma.todos.delete({
        where: { id: todoId }
      });
      res.status(200).json(deletedtodo);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  await prisma.$disconnect();
}