const prisma = require('../utils/PrismaClients');


async function addTags(req, res) {

    try{
        const data = req.body;
        const note = await prisma.tags.create({data});
        res.status(200).json({message : "tags added successfully"})
    }catch{
        res.status(500).json({message : "error"})
    }
}


module.exports = {
    addTags
}