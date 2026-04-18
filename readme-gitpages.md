# Deploy no GitHub Pages

Resumo do processo de publicação da aplicação React no GitHub Pages usando `gh-pages`.

## Configuração

1. **Instalar dependência:**

   ```bash
   npm install gh-pages --save-dev
   ```

2. **Ajustar `package.json`:**
   Adicione a URL do repositório e os scripts:

   ```json
       "homepage": "https://<seu-usuario>.github.io/<nome-do-repositorio>",
       "scripts": {
           "predeploy": "npm run build",
           "deploy": "gh-pages -d build"
       }
   ```

3. **Adaptações de Código:**
   react-router.config.js com ssr: false e adicionei o basename /atividade02/ para que o roteamento se adapte e crie o index.html na pasta .build/client/.

vite.config.js
export default defineConfig({
base: "/atividade02/",
plugins: [reactRouter(), tailwindcss()],
});

## Como Publicar

```bash
npm run deploy
```

---

**Documentação oficial:** [GitHub Pages Quickstart](https://docs.github.com/pt/pages/quickstart)
