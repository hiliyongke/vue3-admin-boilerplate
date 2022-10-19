const modules = import.meta.glob('./**/*.ts', { eager: true });

const asyncModules: any[] = [];

Object.keys(modules).forEach(path => {
  if (path.startsWith('./index.')) return;
  const value = modules[path].default;
  asyncModules.push(...value);
});

export default asyncModules;
