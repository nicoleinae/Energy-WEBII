# Energy-WEBII

## Feito por Emerson Bottega da Silva, João Vitor Campõe Galescky e Nicole Inaê de Oliveira

- Repositório criado na diciplina de Programação na Web II do Instituto Federal do Paraná orientado pelo professor Herbert Rausch Fernandes.  Com o intuito de desenvolver um sistema web que gera insights para a instalação de painéis solares.

## Tecnologias Utilizadas:
- Visual Studio Code
- GitHub
- Framework Django, djangorestframework, django-corsheaders
- HTML5 & CSS

## Branches
main: Branch principal, onde apenas as alterações validadas serão mescladas. 
dev: Branch de desenvolvimento, onde as funcionalidades serão implementadas. 
branches por tasks: Branch onde dividimos as etapas de desenvolvimento.

## Tipos de Commit
docs: Alterações na documentação. 
feat: Implementação de novas funcionalidades. 
fix: Correção de bugs. 
perf: Melhorias de performance. 
refactor: Reorganização do código sem afetar funcionalidades ou corrigir bugs. 
style: Formatação e organização do código (espaços em branco, etc.). 
test: Adição ou correção de testes.

## Comandos para rodar no terminal após a instalação do Python:

```bash
python3 -m pip install Django djangorestframework django-cors-headers
```

## Comandos para executar a aplicação em Django:

- Para o banco de dados (opcional)
  
```bash
python3 manage.py makemigrations
```

- Para o banco de dados também (opcional)
  
```bash
python3 manage.py migrate
```

- Para rodar a aplicação e visualizar na WEB
  
```bash
python3 manage.py runserver
```
