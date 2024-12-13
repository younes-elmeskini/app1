const prisma = require('../utils/PrismaClients');

// notes
async function addNotes(req, res) {
    // Vérifiez si l'utilisateur est authentifié
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'User  is not authenticated' });
    }
    // Récupère les données du formulaire
    try {
        const { name, content, categoryId, tagNotes } = req.body;
        // Vérifiez que les données nécessaires sont présentes
        if (!name ) {
            return res.status(400).json({ message: 'Name, content, and categoryId are required' });
        }

        const note = await prisma.notes.create({
            data: {
                name,
                content,
                categoryId,
                tagNotes,
                userId: req.session.userId
            }
        });
        res.status(200).json({ message: "Note added successfully", note });
    } catch (error) {
        res.status(500).json({ message: "Error adding note", error: error.message });
    }
}

async function getNotes(req, res) {
    try {
        const notes = await prisma.notes.findMany({
            where: { userId: req.session.userId },
        });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving notes" });
    }
}

// tags
async function addTags(req, res) {

    try{
        const data = req.body;
        const note = await prisma.tags.create({data});
        res.status(200).json({message : "tags added successfully"})
    }catch{
        res.status(500).json({message : "error"})
    }
}

async function getTags(req, res) {
    try {
        const tags = await prisma.tags.findMany(); // Fetch all tags from the database
        res.status(200).json(tags); // Return the tags in the response
    } catch (error) {
        res.status(500).json({ message: "error" }); // Handle any errors
    }
}

async function getTagById(req, res) {
    const { id } = req.params; // Extract the ID from the request parameters
    try {
        const tag = await prisma.tags.findUnique({
            where: { id }, // Find the tag by ID
        });
        
        if (!tag) {
            return res.status(404).json({ message: "Tag not found" }); // Handle case where tag is not found
        }
        
        res.status(200).json(tag); // Return the found tag
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tag" }); // Handle any errors
    }
}

async function updateTagById(req, res) {
    const { id } = req.params; // Extract the ID from the request parameters
    const data = req.body; // Get the data to update from the request body

    try {
        const tag = await prisma.tags.update({
            where: { id }, // Find the tag by ID
            data, // Update the tag with the new data
        });

        res.status(200).json({ message: "Tag updated successfully", tag }); // Return the updated tag
    } catch (error) {
        if (error.code === 'P2025') { // Prisma error code for "Record to update not found"
            return res.status(404).json({ message: "Tag not found" }); // Handle case where tag is not found
        }
        res.status(500).json({ message: "Error updating tag" }); // Handle any other errors
    }
}

async function deleteTagById(req, res) {
    const { id } = req.params; // Extract the ID from the request parameters

    try {
        await prisma.tags.delete({
            where: { id }, // Find the tag by ID and delete it
        });

        res.status(200).json({ message: "Tag deleted successfully" }); // Return success message
    } catch (error) {
        if (error.code === 'P2025') { // Prisma error code for "Record to delete not found"
            return res.status(404).json({ message: "Tag not found" }); // Handle case where tag is not found
        }
        res.status(500).json({ message: "Error deleting tag" }); // Handle any other errors
    }
}

// categories
async function addCategory(req, res) {

    try{
        const data = req.body;
        const note = await prisma.categories.create({data});
        res.status(200).json({message : "category added successfully"})
    }catch{
        res.status(500).json({message : "error"})
    }
}

async function getCategories(req, res) {
    try {
        const category = await prisma.categories.findMany(); // Fetch all tags from the database
        res.status(200).json(category); 
    } catch (error) {
        res.status(500).json({ message: "error" }); // Handle any errors
    }
}

async function getCategoryById(req, res) {
    const { id } = req.params; // Extract the ID from the request parameters
    try {
        const category = await prisma.categories.findUnique({
            where: { id }, // Find the tag by ID
        });
        
        if (!category) {
            return res.status(404).json({ message: "Tag not found" }); // Handle case where tag is not found
        }
        
        res.status(200).json(category); // Return the found tag
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tag" }); // Handle any errors
    }
}

async function updateCategoryById(req, res) {
    const { id } = req.params; // Extract the ID from the request parameters
    const data = req.body; // Get the data to update from the request body

    try {
        const category = await prisma.categories.update({
            where: { id }, // Find the tag by ID
            data, // Update the tag with the new data
        });

        res.status(200).json({ message: "Tag updated successfully", category }); // Return the updated tag
    } catch (error) {
        if (error.code === 'P2025') { // Prisma error code for "Record to update not found"
            return res.status(404).json({ message: "Tag not found" }); // Handle case where tag is not found
        }
        res.status(500).json({ message: "Error updating tag" }); // Handle any other errors
    }
}

async function deleteCategoryById(req, res) {
    const { id } = req.params; // Extract the ID from the request parameters

    try {
        await prisma.category.delete({
            where: { id }, // Find the tag by ID and delete it
        });

        res.status(200).json({ message: "Tag deleted successfully" }); // Return success message
    } catch (error) {
        if (error.code === 'P2025') { // Prisma error code for "Record to delete not found"
            return res.status(404).json({ message: "Tag not found" }); // Handle case where tag is not found
        }
        res.status(500).json({ message: "Error deleting tag" }); // Handle any other errors
    }
}

module.exports = {
    addTags,
    getTags,
    getTagById,
    updateTagById,
    deleteTagById,
    addCategory,
    getCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
    addNotes,
    getNotes,
}