const modules = import.meta.glob('./**/*.ts', { eager: true });

const asyncMoudles: any[] = [];

Object.keys(modules).forEach(path => {
  if (path.startsWith('./index.')) return;
  const value = modules[path].default;
  asyncMoudles.push(...value);
});

export default asyncMoudles;
