# ignore 规范

- `.gitignore`：主要是在 `git` 提交的时候忽略掉某些目录或者文件
- `.eslintignore`：`eslint` 校验执行时，忽略某些文件
- `.prettierignore`：不使用 `prettier` 格式化的文件填写在项目的.prettierignore 文件中
- `.stylelintignore`: 忽略某些目录或者文件不检验`stylelint`规则

## .gitignore

```bash
# gitignore 忽略规范

.DS_Store
node_modules
coverage

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# test unit
/tests/e2e/videos/
/tests/e2e/screenshots/

# production
/dist
```

## .eslintignore

```bash
# eslintignore 忽略规范

bash
/dist/
/node_modules/
/public/
/coverage/
/package.json
/package-lock.json
**/*.d.ts
```

## .prettierignore

```bash
# .prettierignore 忽略规则

node_modules
dist
build

.DS_Store
.eslintignore
.gitignore
.prettierignore

LICENSE
yarn.lock
```

## .stylelintignore

```bash
# stylelintignore 忽略规则

**/*.min.css
**/dist/
**/public/
**/node_modules/
```
