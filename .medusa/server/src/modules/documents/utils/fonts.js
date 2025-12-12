"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFontPath = resolveFontPath;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * Resolves the font file path, checking both compiled and source locations
 */
function resolveFontPath(fontFileName) {
    // Try compiled location first (relative to __dirname in compiled code)
    // When compiled, __dirname will be in .medusa/server/src/modules/documents/utils/
    const compiledPath = path_1.default.resolve(__dirname, '../assets/fonts', fontFileName);
    if (fs_1.default.existsSync(compiledPath)) {
        return compiledPath;
    }
    // Try alternative compiled path structure
    const compiledPath2 = path_1.default.resolve(__dirname, '../../assets/fonts', fontFileName);
    if (fs_1.default.existsSync(compiledPath2)) {
        return compiledPath2;
    }
    // Try source location (relative to project root)
    const projectRoot = process.cwd();
    const sourcePath = path_1.default.resolve(projectRoot, 'src/modules/documents/assets/fonts', fontFileName);
    if (fs_1.default.existsSync(sourcePath)) {
        return sourcePath;
    }
    // Try going up from __dirname to find assets
    let currentDir = __dirname;
    for (let i = 0; i < 10; i++) {
        const testPath = path_1.default.resolve(currentDir, 'assets/fonts', fontFileName);
        if (fs_1.default.existsSync(testPath)) {
            return testPath;
        }
        // Also try going up and looking for src/modules/documents/assets
        const srcPath = path_1.default.resolve(currentDir, 'src/modules/documents/assets/fonts', fontFileName);
        if (fs_1.default.existsSync(srcPath)) {
            return srcPath;
        }
        const parentDir = path_1.default.dirname(currentDir);
        if (parentDir === currentDir)
            break; // Reached root
        currentDir = parentDir;
    }
    // Last resort: return the expected compiled path (will throw error if not found)
    return compiledPath;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9udHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvdXRpbHMvZm9udHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFNQSwwQ0F3Q0M7QUE5Q0QsZ0RBQXdCO0FBQ3hCLDRDQUFvQjtBQUVwQjs7R0FFRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxZQUFvQjtJQUNsRCx1RUFBdUU7SUFDdkUsa0ZBQWtGO0lBQ2xGLE1BQU0sWUFBWSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzlFLElBQUksWUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwwQ0FBMEM7SUFDMUMsTUFBTSxhQUFhLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDbEYsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7UUFDakMsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUVELGlEQUFpRDtJQUNqRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbEMsTUFBTSxVQUFVLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsb0NBQW9DLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDakcsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDOUIsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVELDZDQUE2QztJQUM3QyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzVCLE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN4RSxJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUM1QixPQUFPLFFBQVEsQ0FBQztRQUNsQixDQUFDO1FBQ0QsaUVBQWlFO1FBQ2pFLE1BQU0sT0FBTyxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLG9DQUFvQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzdGLElBQUksWUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzNCLE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLFNBQVMsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLElBQUksU0FBUyxLQUFLLFVBQVU7WUFBRSxNQUFNLENBQUMsZUFBZTtRQUNwRCxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxpRkFBaUY7SUFDakYsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQyJ9