/**
 * 配置 HMR 插件
 * @returns
 */

export const configHmrPlugin = (isBuild: boolean) => {
  return isBuild
    ? {
        name: 'singleHMR',
        handleHotUpdate({ modules, file }) {
          if (file.match(/xml$/)) return [];

          modules.forEach(m => {
            if (!m.url.match(/\.(css|less)/)) {
              m.importedModules = new Set();
              m.importers = new Set();
            }
          });

          return modules;
        }
      }
    : [];
};
