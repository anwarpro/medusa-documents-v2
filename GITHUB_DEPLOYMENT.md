# GitHub Deployment Guide

## ✅ Yes, you can push to GitHub and use it in production!

The format `github:anwarpro/medusa-documents-v2.git#musafir` will work, but you need to follow these steps:

## Step 1: Prepare the Plugin for GitHub

### 1.1 Build the Plugin
Before pushing to GitHub, make sure the plugin is built:

```bash
cd medusa-documents-v2
yarn build
```

This creates the `.medusa/server` directory which is required for the plugin to work.

### 1.2 Update .gitignore (if needed)
Make sure `.medusa/server` is **NOT** in `.gitignore` because it needs to be in the repository for production use.

Check your `.gitignore`:
```bash
# If .medusa is ignored, you need to allow .medusa/server
!.medusa/server
```

### 1.3 Commit and Push to GitHub

```bash
# Create and switch to musafir branch (if not exists)
git checkout -b musafir

# Add all files including .medusa/server
git add .
git commit -m "Add medusa-documents-v2 plugin"
git push origin musafir
```

## Step 2: Update Backend package.json

In `musafir-medusa-backend/package.json`, change the dependency:

**Current:**
```json
"@rsc-labs/medusa-documents-v2": "file:.yalc/@rsc-labs/medusa-documents-v2"
```

**Change to:**
```json
"@rsc-labs/medusa-documents-v2": "github:anwarpro/medusa-documents-v2.git#musafir"
```

**Note:** The package name (`@rsc-labs/medusa-documents-v2`) stays the same. Only the source URL changes.

## Step 3: Install in Production Backend

```bash
cd musafir-medusa-backend
yarn install
```

Yarn will automatically:
1. Clone the repository from GitHub
2. Checkout the `musafir` branch
3. Install the plugin

## Step 4: Update medusa-config.ts (if needed)

Your `medusa-config.ts` already uses `@rsc-labs/medusa-documents-v2`, so no changes needed! Just make sure `USE_LOCAL_PLUGIN=false` or remove it in production.

## Important Notes

### ⚠️ Build Before Push
**CRITICAL:** Always run `yarn build` before pushing to GitHub. The `.medusa/server` directory must be in the repository.

### 🔄 Update Workflow
When you make changes:
1. Make your code changes
2. Run `yarn build` in the plugin directory
3. Commit and push to the `musafir` branch
4. In production, run `yarn install` to get the latest version

### 📦 Alternative: Use prepublishOnly Hook
The `package.json` already has:
```json
"prepublishOnly": "npm run build"
```

This ensures the plugin is built automatically, but you still need to commit the built files.

## Verification

After installation, check:
1. The plugin appears in `node_modules/@rsc-labs/medusa-documents-v2`
2. The `.medusa/server` directory exists in the installed package
3. The backend starts without errors

## Troubleshooting

### Issue: "Cannot find module"
- Make sure `.medusa/server` is committed to GitHub
- Run `yarn build` before pushing

### Issue: "Wrong branch"
- Verify the branch name matches: `#musafir`
- Check the GitHub URL format: `github:anwarpro/medusa-documents-v2.git#musafir`

### Issue: "Authentication required"
- For private repos, you may need to use SSH: `git+ssh://git@github.com/anwarpro/medusa-documents-v2.git#musafir`
- Or use a GitHub token in the URL (not recommended for security)

