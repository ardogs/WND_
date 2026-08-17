import { app } from 'electron';
import path from 'path';
import fs from 'fs';

/**
 * Obtiene la ruta base de la aplicación.
 * En Electron empaquetado/desarrollo usa app.getAppPath(), o process.cwd() como fallback.
 */
export const getAppBasePath = (): string => {
    try {
        if (app && typeof app.getAppPath === 'function') {
            return app.getAppPath();
        }
    } catch {
        // Fallback si no está en contexto de Electron
    }
    return process.cwd();
};

/**
 * Obtiene la ruta de la plantilla Excel de cotizaciones según el registration_number del proveedor.
 * Busca en orden de prioridad basándose estrictamente en el registration_number:
 * 1. template_{reg}.xlsx
 * 2. {reg}.xlsx
 * 3. template_quotation_{reg}.xlsx
 * 4. Variantes sanitizadas sin caracteres especiales
 * 5. Fallback a template_quotation.xlsx o primera plantilla disponible.
 */
export const getTemplatePath = (registrationNumber?: string): string => {
    const basePath = getAppBasePath();
    const resourcesPath = (process as unknown as { resourcesPath?: string }).resourcesPath || '';

    const baseDirs = [
        path.join(basePath, 'public/templates'),
        path.join(basePath, 'dist/templates'),
        path.join(resourcesPath, 'templates'),
        path.join(resourcesPath, 'public/templates'),
        path.join(__dirname, '../../public/templates'),
        path.join(__dirname, '../public/templates'),
        path.join(process.cwd(), 'public/templates'),
        path.join(process.cwd(), 'dist/templates'),
    ];

    // Si se proporciona registration_number, buscamos archivos específicos para ese registro
    if (registrationNumber && registrationNumber.trim() !== '') {
        const rawReg = registrationNumber.trim();
        const sanitizedReg = rawReg.replace(/[\/\\:*?"<>|]/g, '_');

        const fileNamesToSearch = [
            `template_${rawReg}.xlsx`,
            `${rawReg}.xlsx`,
            `template_${sanitizedReg}.xlsx`,
            `${sanitizedReg}.xlsx`,
            `template_quotation_${rawReg}.xlsx`,
            `template_quotation_${sanitizedReg}.xlsx`,
        ];

        for (const dir of baseDirs) {
            for (const fileName of fileNamesToSearch) {
                const candidate = path.join(dir, fileName);
                if (fs.existsSync(candidate)) {
                    console.log(`🎯 Plantilla encontrada para proveedor (${rawReg}): ${candidate}`);
                    return candidate;
                }
            }
        }
    }

    // Si no se encontró plantilla específica o no se indicó registration_number,
    // buscamos la plantilla por defecto (template_quotation.xlsx) o cualquier .xlsx en la carpeta
    const defaultFileNames = [
        'template_quotation.xlsx',
        'template.xlsx',
        'quotation_template.xlsx',
    ];

    for (const dir of baseDirs) {
        for (const defaultName of defaultFileNames) {
            const candidate = path.join(dir, defaultName);
            if (fs.existsSync(candidate)) {
                console.log(`📄 Plantilla por defecto encontrada: ${candidate}`);
                return candidate;
            }
        }

        // Si existe el directorio, revisamos si contiene algún archivo .xlsx
        if (fs.existsSync(dir)) {
            try {
                const files = fs.readdirSync(dir);
                const firstXlsx = files.find(f => f.toLowerCase().endsWith('.xlsx'));
                if (firstXlsx) {
                    const fallbackPath = path.join(dir, firstXlsx);
                    console.log(`📄 Usando primera plantilla disponible en ${dir}: ${fallbackPath}`);
                    return fallbackPath;
                }
            } catch {
                // Continuar buscando en otros directorios
            }
        }
    }

    // Fallback absoluto por defecto
    return path.join(baseDirs[0], 'template_quotation.xlsx');
};

/**
 * Obtiene el directorio seguro para archivos temporales del sistema operativo.
 * Utiliza app.getPath('temp')/wnd_temp o process.env.TEMP/wnd_temp.
 * Crea el directorio si no existe.
 */
export const getTempDir = (): string => {
    let baseTemp: string;
    try {
        if (app && typeof app.getPath === 'function') {
            baseTemp = app.getPath('temp');
        } else {
            baseTemp = process.env.TEMP || process.env.TMP || '/tmp';
        }
    } catch {
        baseTemp = process.env.TEMP || process.env.TMP || '/tmp';
    }

    const tempDir = path.join(baseTemp, 'wnd_temp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
    return tempDir;
};
