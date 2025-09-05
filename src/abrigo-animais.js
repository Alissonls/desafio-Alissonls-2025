class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    };

    this.brinquedosValidos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"];
  }

  // Verificador de brinquedos , do animal aparecem em ordem na lista da pessoa
  checkSequence(preferencia, brinquedosPessoa) {
    let idx = 0;
    for (let b of brinquedosPessoa) {
      if (b === preferencia[idx]) idx++;
      if (idx === preferencia.length) return true;
    }
    return false;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const pessoa1 = brinquedosPessoa1.split(",").map((b) => b.trim());
    const pessoa2 = brinquedosPessoa2.split(",").map((b) => b.trim());
    const ordem = ordemAnimais.split(",").map((a) => a.trim());

    // Validação duplicados e inválidos
    if (new Set(pessoa1).size !== pessoa1.length || new Set(pessoa2).size !== pessoa2.length) {
      return { erro: "Brinquedo inválido" };
    }
    if (![...pessoa1, ...pessoa2].every((b) => this.brinquedosValidos.includes(b))) {
      return { erro: "Brinquedo inválido" };
    }

    // Validação  animais duplicados ou inválidos
    if (new Set(ordem).size !== ordem.length || !ordem.every((a) => this.animais[a])) {
      return { erro: "Animal inválido" };
    }

    let resultado = [];
    let adotados = { "pessoa 1": 0, "pessoa 2": 0 };
    let animaisAdotadosAntes = 0; // conta para a regra do Loco

    for (let animal of ordem) {
      const infoAnimal = this.animais[animal];
      const preferencia = infoAnimal.brinquedos;

      const p1ok = this.checkSequence(preferencia, pessoa1);
      const p2ok = this.checkSequence(preferencia, pessoa2);

      // Caso especial do Loco (jabuti)
      if (animal === "Loco") {
        if (animaisAdotadosAntes > 0) {
          if (adotados["pessoa 1"] < 3) {
            resultado.push(`${animal} - pessoa 1`);
            adotados["pessoa 1"]++;
          } else if (adotados["pessoa 2"] < 3) {
            resultado.push(`${animal} - pessoa 2`);
            adotados["pessoa 2"]++;
          } else {
            resultado.push(`${animal} - abrigo`);
          }
        } else {
          resultado.push(`${animal} - abrigo`);
        }
        continue;
      }

      // Regra de conflitos e gatos
      if (p1ok && p2ok) {
        resultado.push(`${animal} - abrigo`);
      } else if (p1ok && adotados["pessoa 1"] < 3) {
        resultado.push(`${animal} - pessoa 1`);
        adotados["pessoa 1"]++;
        animaisAdotadosAntes++;
      } else if (p2ok && adotados["pessoa 2"] < 3) {
        resultado.push(`${animal} - pessoa 2`);
        adotados["pessoa 2"]++;
        animaisAdotadosAntes++;
      } else {
        resultado.push(`${animal} - abrigo`);
      }
    }

    // Ordena pelo nome do animal (alfabética)
    resultado.sort((a, b) => a.split(" - ")[0].localeCompare(b.split(" - ")[0]));

    return { lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
