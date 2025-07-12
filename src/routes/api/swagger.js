import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const swaggerDocument = YAML.load(path.join(__dirname, '../../../openapi.yaml'));

const options = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
  },
};

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument, options));

export default router;