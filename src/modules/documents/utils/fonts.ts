import path from "path";
import fs from "fs";

/**
 * Resolves the font file path, checking both compiled and source locations
 */
export function resolveFontPath(fontFileName: string): string {
  // Try compiled location first (relative to __dirname in compiled code)
  // When compiled, __dirname will be in .medusa/server/src/modules/documents/utils/
  const compiledPath = path.resolve(__dirname, '../assets/fonts', fontFileName);
  if (fs.existsSync(compiledPath)) {
    return compiledPath;
  }

  // Try alternative compiled path structure
  const compiledPath2 = path.resolve(__dirname, '../../assets/fonts', fontFileName);
  if (fs.existsSync(compiledPath2)) {
    return compiledPath2;
  }

  // Try source location (relative to project root)
  const projectRoot = process.cwd();
  const sourcePath = path.resolve(projectRoot, 'src/modules/documents/assets/fonts', fontFileName);
  if (fs.existsSync(sourcePath)) {
    return sourcePath;
  }

  // Try going up from __dirname to find assets
  let currentDir = __dirname;
  for (let i = 0; i < 10; i++) {
    const testPath = path.resolve(currentDir, 'assets/fonts', fontFileName);
    if (fs.existsSync(testPath)) {
      return testPath;
    }
    // Also try going up and looking for src/modules/documents/assets
    const srcPath = path.resolve(currentDir, 'src/modules/documents/assets/fonts', fontFileName);
    if (fs.existsSync(srcPath)) {
      return srcPath;
    }
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break; // Reached root
    currentDir = parentDir;
  }

  // Last resort: return the expected compiled path (will throw error if not found)
  return compiledPath;
}

