const fs = require('fs-extra');
const path = require('path');

try {
    const swaggerDistPath = require('swagger-ui-dist').getAbsoluteFSPath();
    const targetPath = path.join(__dirname, 'public/swagger-ui');

    fs.ensureDirSync(targetPath);

    fs.copySync(swaggerDistPath, targetPath);
    console.log('Successfully copied Swagger UI assets.');
} catch (e) {
    console.error('Failed to copy Swagger UI assets:', e);
}