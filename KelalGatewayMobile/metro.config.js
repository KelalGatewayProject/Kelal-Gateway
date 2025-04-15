// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable experimental features for expo-router
  resolver: {
    unstable_enablePackageExports: true,
  },
});

// Add support for mjs files
config.resolver.sourceExts.push('mjs');

// Add support for native modules
config.resolver.assetExts = [...config.resolver.assetExts, 'db', 'sqlite'];

module.exports = config; 