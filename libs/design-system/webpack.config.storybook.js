const path = require('path');

module.exports = async ({ config }) => {
  console.log('Custom Storybook webpack config is being used');

  // Add path aliases
  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    '@shared/icons': path.resolve(__dirname, '../../libs/shared-icons/src'),
    '@design-system': path.resolve(__dirname, 'src'),
  };

  // Add resolve modules
  config.module = config.module || { rules: [] };
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    'node_modules',
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, 'libs')
  ];

  // Add resolve extensions (put .ts and .tsx first to prioritize them)
  config.resolve.extensions = [
    '.ts',
    '.tsx',
    ...(config.resolve.extensions || []),
    '.js',
    '.jsx',
    '.json'
  ];

  // Disable source maps in development to avoid the invalid mapping error
  config.devtool = false; // Disable source maps temporarily to fix the issue

  // Ignore source map warnings
  config.ignoreWarnings = [
    /Failed to parse source map/,
    /Can't resolve .* in/,
    /export .* was not found in/,
    /the request of a dependency is an expression/
  ];

  // Remove all existing CSS rules
  config.module.rules = config.module.rules.filter(
    rule => !rule.test || !rule.test.toString().includes('css')
  );

  // Single CSS rule to handle all CSS files
  config.module.rules.push({
    test: /\.css$/,
    oneOf: [
      // Handle CSS Modules (files with .module.css)
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '../shared-icons/src')
        ],
      },
      // Handle regular CSS
      {
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, '../../node_modules')
        ],
      },
      // Handle node_modules CSS
      {
        use: ['style-loader', 'css-loader'],
        include: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, '../../node_modules')
        ],
      },
    ],
  });

  // Add file-loader for font files
  config.module.rules.push({
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][ext]'
    }
  });

  // Add file-loader for image files
  config.module.rules.push({
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'images/[name][ext]'
    }
  });

  // Clear existing rules for TypeScript/JavaScript files
  config.module.rules = config.module.rules.filter(
    rule => !rule.test ||
      !rule.test.toString().includes('js') &&
      !rule.test.toString().includes('ts') &&
      !rule.test.toString().includes('svg')
  );

  // Add TypeScript/JavaScript loader with Babel
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules\/(?!(react-syntax-highlighter|@storybook\/.*\/node_modules\/react-syntax-highlighter)\/).*/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          presets: [
            ['@babel/preset-env', {
              loose: true,
              modules: false,
              targets: { esmodules: true }
            }],
            ['@babel/preset-react', {
              runtime: 'automatic'
            }],
            '@babel/preset-typescript'
          ],
          plugins: [
            ['@babel/plugin-transform-runtime', {
              regenerator: true
            }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            ['@babel/plugin-proposal-private-methods', { loose: true }],
            ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
          ]
        },
      },
    ],
  });

  // Add SCSS support
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            auto: true,
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
      },
      'sass-loader',
    ],
    include: path.resolve(__dirname, '../'),
  });

  // Add SVG support
  const svgRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
  if (svgRule) {
    svgRule.exclude = [path.resolve(__dirname, 'src')];
  }

  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          svgo: false,
          titleProp: true,
          ref: true,
        },
      },
      'url-loader',
    ],
    include: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, '../shared-icons/src')
    ],
  });

  // Important: return the modified config
  return config;
};
