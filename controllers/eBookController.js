import { Subject, Module, eBook } from '../models/EBook.js';
import { validateEBook } from '../validators/eBookValidator.js';
import fs from 'fs';
import path from 'path';

// **Subjects**

export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    // Check for duplicate subject name
    const existingSubject = await Subject.findOne({ name });
    if (existingSubject) {
      return res.status(400).json({ message: 'Subject with this name already exists' });
    }

    const newSubject = new Subject({ name });
    await newSubject.save();

    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// **Modules**

export const createModule = async (req, res) => {
  try {
    const { subjectId, title } = req.body;

    // Validate subject existence
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    const module = await Module.findOne({ title , subjectId  });
    if (module) {
      return res.status(404).json({ message: 'Module with this name already exists' });
    }
   

    const newModule = new Module({ subjectId, title });
    await newModule.save();

    res.status(201).json(newModule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getModulesBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const modules = await Module.find({ subjectId });
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// **eBooks**

export const createEBook = async (req, res) => {
  try {
    const { title, description, price, subject, moduleId } = req.body;

    // Check for uploaded file
    const doc = req.file ? `${process.env.ServerUrl}/rental_uploads/${req.file.filename}` : null
    if (!doc) {
      return res.status(400).json({ message: 'Document file is required' });
    }
    // Validate subject and module
    const subjectExists = await Subject.findById(subject);
    const moduleExists = await Module.findById(moduleId);

    if (!subjectExists || !moduleExists) {
      return res.status(404).json({ message: 'Subject or Module not found' });
    }

    const newEBook = new eBook({ title, description, price, subject, moduleId, doc });
    await newEBook.save();

    res.status(201).json(newEBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllEBooks = async (req, res) => {
  try {
    const eBooks = await eBook.find().populate('subject moduleId', 'name title');
    res.status(200).json(eBooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEBooksByModuleId = async (req, res) => {
  try {
    const { moduleId } = req.params;

    // Validate moduleId
    const moduleExists = await Module.findById(moduleId);
    if (!moduleExists) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Fetch eBooks for the given moduleId
    const eBooks = await eBook.find({ moduleId }).populate('subject moduleId', 'name title');

    if (!eBooks || eBooks.length === 0) {
      return res.status(404).json({ message: 'No eBooks found for the specified module' });
    }

    res.status(200).json(eBooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getEBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const eBookData = await eBook
      .findById(id)
      .populate('subject moduleId', 'name title');

    if (!eBookData) {
      return res.status(404).json({ message: 'eBook not found' });
    }

    res.status(200).json(eBookData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, subject, moduleId } = req.body;

    // Check for uploaded file
    const doc = req.file ? `${process.env.ServerUrl}/uploads/${req.file.filename}` : null;

    // Validate subject and module
    const subjectExists = await Subject.findById(subject);
    const moduleExists = await Module.findById(moduleId);

    if (!subjectExists || !moduleExists) {
      return res.status(404).json({ message: 'Subject or Module not found' });
    }

    const updateData = { title, description, price, subject, moduleId };
    if (doc) {
      updateData.doc = doc;
    }

    const updatedEBook = await eBook.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEBook) {
      return res.status(404).json({ message: 'eBook not found' });
    }

    res.status(200).json(updatedEBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEBook = async (req, res) => {
  try {
    const { id } = req.params;

    const eBookData = await eBook.findById(id);
    if (!eBookData) {
      return res.status(404).json({ message: 'eBook not found' });
    }

    // Delete associated file
    if (eBookData.doc) {
      const filePath = path.resolve(`.${eBookData.doc.replace(process.env.ServerUrl, '')}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await eBook.findByIdAndDelete(id);
    res.status(200).json({ message: 'eBook deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// i want something like that can have purchase api so that usr can buy e book can you do this  for me in the frontend backend and the dashboard 







