const fs = require('fs');
const ErrorResponse = require('../model/response/ErrorResponse');

module.exports = class FileService {
  /**
   * Start service.
   *
   * @author Guilherme da Silva Martin
   */
  static async init() {
    return this;
  }

  /**
   * Return the content of a file.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} fileName
   */
  static async getFileContent(codeName, fileName) {
    try {
      const fullPath = process.env.CODE_LOCATION + codeName + '/' + fileName;

      if (fs.existsSync(fullPath)) {
        const file = fs.readFileSync(fullPath, 'utf8');

        return file;
      } else {
        throw new ErrorResponse('Your file could not be found.');
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * List content of code folder.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   */
  static async listContentOfCodeFolder(codeName) {
    try {
      const files = fs.readdirSync(process.env.CODE_LOCATION + codeName);

      return files;
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Create a new file into a code folder.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} fileName
   */
  static async createNewCodeFile(codeName, fileName) {
    try {
      const fullPath = process.env.CODE_LOCATION + codeName + '/' + fileName;

      if (!fs.existsSync(fullPath)) {
        return fs.writeFileSync(fullPath, '');
      } else {
        throw new ErrorResponse(401, 'File already exists.', null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Delete a file inside a code folder.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} fileName
   */
  static async deleteCodeFile(codeName, fileName) {
    try {
      const fullPath = process.env.CODE_LOCATION + codeName + '/' + fileName;

      if (fs.existsSync(fullPath)) {
        return fs.unlinkSync(fullPath, '');
      } else {
        throw new ErrorResponse(401, 'File not found.', null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Update code file name.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} fileName
   */
  static async updateCodeFileName(codeName, oldFileName, newFileName) {
    try {
      const fullPathOld = process.env.CODE_LOCATION + codeName + '/' + oldFileName;
      const fullPathNew = process.env.CODE_LOCATION + codeName + '/' + newFileName;

      if (fs.existsSync(fullPathOld)) {
        return fs.renameSync(fullPathOld, fullPathNew);
      } else {
        throw new ErrorResponse(401, 'File not found.', null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Update code file content.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} fileName
   * @param {*} fileContent
   */
  static async updateCodeFileContent(codeName, fileName, fileContent) {
    try {
      const fullPath = process.env.CODE_LOCATION + codeName + '/' + fileName;

      if (fs.existsSync(fullPath)) {
        return fs.writeFileSync(fullPath, fileContent);
      } else {
        throw new ErrorResponse(401, 'File not found.', null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Delete a code folder.
   *
   * @author Guilherme da Silva Martin
   * @param {*} codeName
   * @param {*} fileName
   */
  static async deleteCodeFolder(codeName) {
    try {
      const fullPath = process.env.CODE_LOCATION + codeName;

      if (fs.existsSync(fullPath)) {
        return fs.rmdirSync(fullPath);
      } else {
        throw new ErrorResponse(401, 'Folder not found.', null);
      }
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Create a new code folder.
   *
   * @author Matheus Muriel
   * @param {*} codeName
   */
  static async createCodeFolder(codeName) {
    try {
      const fullPath = process.env.CODE_LOCATION + codeName;

      if (!fs.existsSync(fullPath)) {
        return fs.mkdirSync(fullPath);
      } else {
        throw new ErrorResponse(401, 'Code folder already exists.', null);
      }
    } catch (ex) {
      throw ex;
    }
  }
};
