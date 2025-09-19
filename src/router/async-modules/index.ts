const modules = import.meta.glob('./**/*.ts', { eager: true });

const asyncModules: any[] = [];

Object.keys(modules).forEach((path) => {
  if (path.startsWith('./index.')) return;
  const module = modules[path] as any;
  const value = module?.default;
  if (Array.isArray(value)) {
    asyncModules.push(...value);
  }
});

export default asyncModules;
