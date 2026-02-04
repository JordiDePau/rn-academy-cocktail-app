const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Make Metro treat .svg as source (transformed) instead of asset
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts.push('svg');

module.exports = config;
