import { OpenAPIBackend } from 'openapi-backend';
import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yamljs';
import addFormats from 'ajv-formats';
import * as micropostController from './controllers/micropost.controller.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const openapiPath = path.join(__dirname, '..', 'openapi.yaml');

const spec = YAML.load(openapiPath);

const api = new OpenAPIBackend({
  definition: spec,
  strict: false,
  validate: true, // バリデーションを再度有効化
  customizeAjv: (ajv) => {
    addFormats(ajv);
    return ajv;
  },
  handlers: {
    getMicroposts: micropostController.getAllMicroposts,
    getMicropostById: micropostController.getMicropostById,
    createMicropost: micropostController.createMicropost,
    notFound: (c, req, res) => {
      res.status(404).json({
        success: false,
        message: 'Not found'
      });
    },
    validationFail: (c, req, res) => {
      res.status(400).json({
        success: false,
        message: 'Request validation failed',
        errors: c.validation.errors
      });
    },
    unauthorizedHandler: (c, req, res) => {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
  }
});

api.init();

export default api;