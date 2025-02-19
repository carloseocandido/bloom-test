# Fazer uma API REST em (LINGUAGEM DO TESTE) de uma agenda telefônica

## Fazer um CRUD de uma agenda telefônica com os atributos:
- Nome
- Endereço
- Telefone
- Email

## Regras de negócio

### Criar contato
- O contato pode ter mais de um número de telefone.

### Listagem dos contatos
- Filtros na listagem:
    - Nome
    - Endereço
    - Email
    - Telefone

### Exibir contato
- Consumir a API HgBrasil Weather (https://console.hgbrasil.com/documentation/weather)
- Quando o usuário exibir um contato, trazer informações da temperatura e condição do tempo na cidade do contato e exibir uma mensagem com sugestão:
    - Temperatura menor ou igual a 18° graus:
        - Ofereça um chocolate quente ao seu contato...
    - Temperatura maior ou igual a 30° graus e tempo ensolarado:
        - Convide seu contato para ir à praia com esse calor!
    - Temperatura maior ou igual a 30° graus, com condição tempo com chuva ou chuviscos:
        - Convide seu contato para tomar um sorvete
    - Temperatura menor que 30° e maior que 18° graus, com condição tempo ensolarado:
        - Convide seu contato para fazer alguma atividade ao ar livre
    - Temperatura menor que 30° e maior que 18° graus, com condição tempo com chuva ou chuviscos:
        - Convide seu contato para ver um filme

### Atualizar contato

### Deletar contato
- A exclusão não deve ser física, apenas lógica e o contato “excluído” não deve mais aparecer na listagem

## Requisitos não funcionais
- Deve estar preparado para ser tolerante a falhas
- Ter cobertura de testes
- Documentação para que outras pessoas possam consumir sua API
- Utilize as ferramentas e estruturas que você se sinta confortável e elabore brevemente sua solução, detalhes de arquitetura, escolha de padrões e estruturas.
- Criar o readme
- Além disso, facilite a execução de seus serviços localmente (considere usar alguma solução de container/vm)

Depois de concluído, compartilhe seu código conosco. Mesmo se não conseguir concluir, envie o que já foi desenvolvido para análise.
