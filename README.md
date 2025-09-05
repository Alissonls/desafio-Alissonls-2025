# Desafio Abrigo de Animais - 2025

## Descrição
Este projeto implementa a lógica para organizar a adoção de animais em um abrigo, seguindo as regras do desafio:

- O animal vai para a pessoa que mostrar todos os seus brinquedos favoritos na ordem desejada.  
- Uma pessoa pode intercalar brinquedos que o animal queira ou não, desde que estejam na ordem desejada.  
- Gatos não dividem seus brinquedos: se ambas as pessoas podem adotar, o animal vai para o abrigo.  
- Uma pessoa não pode levar mais de três animais.  
- Loco (jabuti) não se importa com a ordem dos brinquedos, desde que outro animal já tenha sido adotado.  
- Caso animal ou brinquedo seja inválido ou duplicado, retorna o erro correspondente.

## Animais e brinquedos
| Animal | Tipo  | Brinquedos             |
|--------|-------|----------------------|
| Rex    | Cão   | RATO, BOLA           |
| Mimi   | Gato  | BOLA, LASER          |
| Fofo   | Gato  | BOLA, RATO, LASER    |
| Zero   | Gato  | RATO, BOLA           |
| Bola   | Cão   | CAIXA, NOVELO        |
| Bebe   | Cão   | LASER, RATO, BOLA    |
| Loco   | Jabuti| SKATE, RATO          |

## Estrutura do projeto
- `src/abrigo-animais.js` → arquivo principal contendo a classe `AbrigoAnimais` com a lógica de adoção.  
- `abrigo-animais.test.js` → arquivo de testes fornecido para validar a solução.  

## Uso
Importe a classe e chame o método `encontraPessoas` com três parâmetros:  
1. Brinquedos da primeira pessoa (string separada por vírgula).  
2. Brinquedos da segunda pessoa (string separada por vírgula).  
3. Ordem dos animais a serem considerados (string separada por vírgula).  

### Exemplo de chamada
```js
import { AbrigoAnimais } from './src/abrigo-animais.js';

const abrigo = new AbrigoAnimais();

const resultado = abrigo.encontraPessoas(
  'RATO,BOLA',
  'RATO,NOVELO',
  'Rex,Fofo'
);

console.log(resultado);
// Saída:
// { lista: ['Fofo - abrigo', 'Rex - pessoa 1'] }