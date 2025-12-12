# Development Workflow

## Quick Start

To develop the plugin with hot reload, you need to run two commands in separate terminals:

### Terminal 1: Plugin Watch Mode
```bash
cd medusa-documents-v2
yarn watch
```

This will automatically rebuild the plugin whenever you make changes to files in the `src/` directory.

### Terminal 2: Backend Dev Server
```bash
cd musafir-medusa-backend
USE_LOCAL_PLUGIN=true yarn dev
```

The backend's `medusa develop` command watches for changes in the `.medusa/server` directory and will reload when the plugin is rebuilt.

## How It Works

1. **Plugin Watch**: The `yarn watch` command uses nodemon to watch for file changes in `src/` and automatically runs `yarn build` when files change.

2. **Backend Reload**: When the plugin is rebuilt, the `.medusa/server` directory is updated. The backend's `medusa develop` command detects these changes and reloads the server.

## Alternative: Using Yalc (Recommended for Better Workflow)

If you want an even better development experience, you can use yalc:

### Setup Yalc:
```bash
# In medusa-documents-v2 directory
cd medusa-documents-v2
yalc publish --push
```

### In Backend:
```bash
cd musafir-medusa-backend
# Make sure USE_LOCAL_PLUGIN=false or remove it
yarn dev
```

### Watch and Push Changes:
```bash
# In medusa-documents-v2 directory
yarn watch  # This will rebuild and yalc will push changes automatically
```

## Troubleshooting

If changes don't appear:
1. Make sure `yarn watch` is running in the plugin directory
2. Make sure `yarn dev` is running in the backend directory
3. Check that `USE_LOCAL_PLUGIN=true` is set in your backend environment
4. Try a hard refresh in the browser (Cmd+Shift+R)
5. Check the browser console for any errors

