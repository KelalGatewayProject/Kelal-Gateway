# Kelal Gateway

A modern event ticketing and management platform built with React, Vite, and Tailwind CSS.

## Features

- Event discovery and ticketing
- User authentication with Supabase
- Interactive maps with OpenStreetMap
- Dark mode support
- Responsive design

## Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/kelal-gateway.git
cd kelal-gateway
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your environment variables:
```env
VITE_API_URL=your_api_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Building for Production

1. Update `.env.production` with your production environment variables.

2. Build the project:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment to Render

1. Create a new Static Site on Render.
2. Connect your GitHub repository.
3. Configure the following settings:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Add your environment variables in the Render dashboard.
5. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
