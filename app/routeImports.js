// Explanation of why to use import rather than require
// @link https://github.com/webpack/webpack/issues/1973#issuecomment-185744317
const routeImports = {
  alpha: () => [
    import('containers/Alpha/reducer'),
    import('containers/Alpha/sagas'),
    import('containers/Alpha'),
  ]
};

export default routeImports;
