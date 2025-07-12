import { MicropostModel } from '../models/micropost.js';
import { createMicropostSchema, micropostIdSchema } from '../schemas/micropost.schema.js';

export const getAllMicroposts = async (c, req, res) => {
  try {
    const microposts = await MicropostModel.getAll();
    return res.status(200).json({
      success: true,
      data: microposts,
      count: microposts.length
    });
  } catch (error) {
    console.error('Error getting microposts:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getMicropostById = async (c, req, res) => {
  try {
    const validatedParams = micropostIdSchema.parse(req.params);
    const micropost = await MicropostModel.getById(validatedParams.id);
    
    if (!micropost) {
      return res.status(404).json({
        success: false,
        message: 'Micropost not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: micropost
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID parameter'
      });
    }
    console.error('Error getting micropost:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createMicropost = async (c, req, res) => {
  try {
    const validatedData = createMicropostSchema.parse(req.body);
    const newPost = await MicropostModel.create(validatedData.title);
    
    return res.status(201).json({
      success: true,
      data: newPost,
      message: 'Micropost created successfully'
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: error.errors[0]?.message || 'Validation error'
      });
    }
    console.error('Error creating micropost:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

