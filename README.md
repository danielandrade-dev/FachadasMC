# Fachadas MC - Site em Twig

Site institucional da Fachadas MC desenvolvido com PHP e Twig.

## Requisitos

- PHP >= 7.4
- Composer
- Servidor web (Apache/Nginx) com mod_rewrite habilitado

## Instalação

1. Clone o repositório ou baixe os arquivos

2. Instale as dependências usando Composer:
```bash
composer install
```

3. Configure o servidor web para apontar para a pasta `public` (ou ajuste o caminho no `.htaccess`)

4. Certifique-se de que a pasta `cache` tem permissões de escrita:
```bash
chmod 777 cache
```

## Estrutura do Projeto

```
FachadasMC/
├── cache/              # Cache do Twig (gerado automaticamente)
├── public/             # Arquivos públicos
│   └── assets/         # CSS, JS e imagens
│       ├── css/
│       ├── js/
│       └── images/
├── src/                # Classes PHP (se necessário)
├── templates/          # Templates Twig
│   ├── base.twig       # Template base
│   ├── index.twig      # Página inicial
│   ├── servicos.twig   # Página de serviços
│   ├── sobre.twig      # Página sobre
│   └── contato.twig    # Página de contato
├── .htaccess           # Configuração Apache
├── composer.json       # Dependências
├── index.php           # Arquivo principal
└── README.md          # Este arquivo
```

## Uso

### Desenvolvimento Local

Para desenvolvimento local, você pode usar o servidor embutido do PHP:

```bash
php -S localhost:8000 -t public
```

Acesse `http://localhost:8000` no navegador.

### Rotas Disponíveis

- `/` ou `/?page=index` - Página inicial
- `/?page=servicos` - Página de serviços
- `/?page=sobre` - Página sobre nós
- `/?page=contato` - Página de contato

## Personalização

### Dados do Site

Os dados do site estão configurados no arquivo `index.php` na variável `$siteData`. Você pode modificar:

- Informações de contato (telefone, email, endereço)
- Horários de funcionamento
- Serviços oferecidos
- Estatísticas
- Missão, visão e valores
- Áreas de atendimento

### Estilos

Os estilos CSS estão em `public/assets/css/style.css`. Você pode personalizar as cores alterando as variáveis CSS no início do arquivo:

```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #004499;
    --accent-color: #ff6600;
    /* ... */
}
```

### Imagens

Adicione as imagens do portfólio na pasta `public/assets/images/` com os nomes:
- `portfolio-1.jpg`
- `portfolio-2.jpg`
- ... até `portfolio-21.jpg`

## Produção

Para ambiente de produção:

1. Desabilite o modo debug do Twig em `index.php`:
```php
'debug' => false,
```

2. Certifique-se de que a pasta `cache` tem permissões adequadas

3. Configure o servidor web para usar HTTPS

4. Otimize as imagens antes de fazer upload

## Suporte

Para dúvidas ou problemas, entre em contato através do email: contato@fachadasmc.com.br

## Licença

© 2025 Fachadas MC. Todos os direitos reservados.


