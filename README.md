# Auditorias Digitais: Boituva/SP

Dois diagnósticos independentes de site e presença no Google, publicados como páginas estáticas
no GitHub Pages. Cada relatório é autônomo e tem URL própria, para ser enviado separadamente
a cada empresa.

## Relatórios

| Empresa | Setor | Nota | Link |
|---|---|---|---|
| **RLS Motosport** | Revenda de motos | 51/100 | `/rls-motosport/` |
| **CowPig** | Frigorífico premium | 35/100 | `/cowpig/` |

## Princípio editorial

**O leitor é o dono do negócio, é leigo em internet e não terá ninguém do lado para explicar.**
Tudo decorre disso:

- O corpo do relatório **não tem uma palavra técnica**. Os problemas são explicados por analogia
  do mundo do próprio cliente: a placa da loja, a etiqueta de preço na vitrine, a lista de
  endereços do carteiro.
- Todo o jargão fica isolado numa seção final, **"recado pronto"**, escrita para o fornecedor de
  tecnologia. O dono copia, cola e encaminha sem precisar entender.
- Cada problema responde sempre as mesmas três perguntas, nesta ordem: **o que está acontecendo**,
  **o que isso te custa**, **quem resolve**.
- Mostrar em vez de descrever: o RLS traz um **mockup do resultado real do Google**, lado a lado
  com o que poderia ser. O CowPig traz uma **grade dos 27 estados com apenas um aceso**.
- Todo dado é marcado como **verificado** ou **não verificado**. O que não foi encontrado é
  declarado como lacuna, **nunca estimado**. Ambos registram que a nota em estrelas do Google não
  foi obtida e exige consulta manual.

## Design

- **Tipos:** Archivo (estrutura e dados), Source Serif 4 (leitura), IBM Plex Mono (evidência).
- **Cor:** um acento por cliente, tirado do mundo de cada um e afastado das cores semânticas.
  Azul-petróleo `#17515f` no RLS, ameixa `#5e2a45` no CowPig. Semânticos separados:
  verde `#0f7a2e`, âmbar `#b87503`, vermelho-tijolo `#c0342b`.
- Cor semântica **nunca** carrega significado sozinha: sempre acompanha ícone e rótulo.
- **Tema escuro por padrão** (tokens no `:root`); o claro existe só sob `data-theme="light"`, atrás do botão.
- Sem travessão em nenhum texto, por convenção do projeto.

## Estrutura

```
index.html              índice interno (não enviar aos clientes)
assets/report.css       sistema visual compartilhado
rls-motosport/          relatório autônomo
cowpig/                 relatório autônomo
```

As páginas dos clientes **não têm link entre si nem para o índice**. Cada uma pode ser enviada
isoladamente sem revelar a existência da outra.

## Como as auditorias foram feitas

Medições diretas contra os servidores em **15/07/2026**: cabeçalhos HTTP, tempo até o primeiro
byte, HTML, sitemap, robots.txt, certificado TLS e peso de imagens. Registros públicos na Receita
Federal (via BrasilAPI), CNA, LinkedIn, Indeed e diretórios locais. Layout mobile validado via
DevTools Protocol em 390px e 320px, sem rolagem horizontal.

### Régua das notas

Cada nota é a **porcentagem de itens aprovados** numa checagem objetiva. Item cumprido = 1,
parcial = 0,5, ausente = 0. Sem peso subjetivo. Nota geral: Google 30%, presença 35%,
velocidade 20%, segurança 15%. A régua completa está na seção "Método" de cada relatório.

## Achados principais

**RLS Motosport.** 100% dos anúncios de moto trazem a palavra "portas" no título, herdada de um
template de carros; as 182 URLs do sitemap apontam para `http://` e todas redirecionam; zero dados
estruturados; o H1 da home é a logomarca. O CNPJ que circula em sites de consulta associado à loja
é de outra empresa, em Alagoas, já baixada.

**CowPig.** Selo de inspeção **SISP 0543** (estadual), documentado em PDF oficial da CNA, o que
restringe a venda ao estado de São Paulo e torna um e-commerce nacional juridicamente inviável.
Dos 6 frigoríficos credenciados no protocolo Hereford, 4 podem vender no país e o CowPig não.
A home não tem H1 nem H2, o canonical aponta para `index.php` e o sitemap está congelado em 2021.
