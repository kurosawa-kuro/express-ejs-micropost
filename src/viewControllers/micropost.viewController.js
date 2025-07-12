import { MicropostModel } from '../models/micropost.js';

export const index = async (req, res) => {
  const microposts = await MicropostModel.getAll();
  res.render('pages/index', { 
    title: 'Microposts',
    microposts
  });
};

export const show = async (req, res) => {
  const { id } = req.params;
  const micropost = await MicropostModel.getById(id);
  
  if (!micropost) {
    return res.status(404).render('pages/error', {
      title: 'Not Found',
      error: { message: 'Micropost not found' },
      statusCode: 404
      });
  }
  
  res.render('pages/show', {
    title: micropost.title,
    micropost
  });
};

export const newForm = (req, res) => {
  res.render('pages/new', {
    title: 'New Micropost',
  });
};

export const create = async (req, res) => {
  const { title } = req.body;
  
  if (!title || title.trim().length === 0) {
    return res.render('pages/new', {
      title: 'New Micropost',
      error: 'Title is required'
      });
  }
  
  await MicropostModel.create(title);
  res.redirect('/');
};

export const editForm = async (req, res) => {
  const { id } = req.params;
  const micropost = await MicropostModel.getById(id);
  
  if (!micropost) {
    return res.status(404).render('pages/error', {
      title: 'Not Found',
      error: { message: 'Micropost not found' },
      statusCode: 404
      });
  }
  
  res.render('pages/edit', {
    title: 'Edit Micropost',
    micropost
  });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  if (!title || title.trim().length === 0) {
    const micropost = await MicropostModel.getById(id);
    return res.render('pages/edit', {
      title: 'Edit Micropost',
      micropost,
      error: 'Title is required'
      });
  }
  
  const updated = await MicropostModel.update(id, title);
  
  if (!updated) {
    return res.status(404).render('pages/error', {
      title: 'Not Found',
      error: { message: 'Micropost not found' },
      statusCode: 404
      });
  }
  
  res.redirect(`/microposts/${id}`);
};

export const destroy = async (req, res) => {
  const { id } = req.params;
  await MicropostModel.delete(id);
  res.redirect('/');
};