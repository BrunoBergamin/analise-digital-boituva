# Auditorias Digitais: Boituva/SP

Duas auditorias técnicas independentes de site e presença no Google, publicadas como páginas estáticas
no GitHub Pages. Cada relatório é autônomo e tem URL própria, para ser compartilhado separadamente
com cada empresa.

## Relatórios

| Empresa | Setor | Índice | Link |
|---|---|---|---|
| **RLS Motosport** | Revenda de motos | 51/100 | `/rls-motosport/` |
| **CowPig** | Frigorífico premium | 35/100 | `/cowpig/` |

## Estrutura

```
index.html              hub (uso interno; não compartilhar com os clientes)
assets/report.css       folha de estilo compartilhada
rls-motosport/          relatório autônomo
cowpig/                 relatório autônomo
```

As páginas dos clientes **não têm link entre si nem para o hub**. Cada uma pode ser enviada isoladamente
sem revelar a existência da outra.

## Como as auditorias foram feitas

Medições diretas contra os servidores em **15/07/2026**: cabeçalhos HTTP, tempo até o primeiro byte,
HTML, sitemap, robots.txt, certificado TLS e peso de imagens. Registros públicos consultados na Receita
Federal (via BrasilAPI), CNA, LinkedIn, Indeed e diretórios locais.

### Régua das notas

Cada nota é a **porcentagem de itens aprovados** numa checagem objetiva. Item cumprido = 1, parcial =
0,5, ausente = 0. Sem peso subjetivo.

- **SEO técnico**: 16 itens
- **Performance**: 7 itens
- **Presença (local/digital)**: 10 itens
- **Segurança**: 8 itens
- **Índice geral**: SEO 30%, presença 35%, performance 20%, segurança 15%

A régua completa e a lista de itens estão na seção "Método" de cada relatório.

### Princípio editorial

Todo dado é marcado como **verificado** (fonte aberta e lida) ou **não verificado** (snippet de índice de
busca). O que não foi encontrado é declarado como lacuna, **nunca estimado**. As duas auditorias
registram explicitamente que a nota em estrelas do Google não pôde ser obtida e exige consulta manual.

## Achados principais

**RLS Motosport**: 100% dos anúncios de moto trazem a palavra "portas" no título, herdada de um template
de carros; as 182 URLs do sitemap apontam para `http://` e todas redirecionam; zero dados estruturados;
o H1 da home é a logomarca. O CNPJ que circula em sites de consulta associado à loja é de outra empresa,
em Alagoas, já baixada.

**CowPig**: Selo de inspeção **SISP 0543** (estadual), documentado em PDF oficial da CNA, o que restringe
a venda ao estado de São Paulo e torna um e-commerce nacional juridicamente inviável. A home não tem H1
nem H2, o canonical aponta para `index.php` e o sitemap está congelado em 2021.

## Detalhes técnicos

- HTML/CSS estáticos, sem dependências externas nem build.
- Tema claro/escuro, seguindo o sistema e com alternância manual persistida.
- Paleta de status validada; cor **nunca** carrega significado sozinha (sempre ícone + rótulo).
- Responsivo; tabelas largas rolam no próprio contêiner.
- `noindex, nofollow` nos relatórios, para não competirem com os sites auditados na busca.
