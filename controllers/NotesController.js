const prisma = require('../utils/PrismaClients');


async function addTags(req, res) {
    const data = req.body;
    const note = await prisma.note.create({data});
}

module.exports = {
    addTags
}