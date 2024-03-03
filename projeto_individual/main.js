// Importações das cenas que fazem parte do jogo, assim a gente vai conseguir por elas dentro de "scene"
    import nivel1 from "./cenas/nivel1.js";
    import menu from "./cenas/menu.js"
    import win from "./cenas/win.js"


// Configuração para inicialização do jogo

// definindo tamanho da página
    const larguraJogo = 720;
    const alturaJogo = 1280;
const config = {
   
    //  configuração padrão do Phaser
        type: Phaser.AUTO,
        width: larguraJogo,
        height: alturaJogo,
    
        // trazendo física pro jogo (hitboxes)
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }

    },

    // tratando como cenas as outras páginas de código e definindo que a menu será a primeira
    scene: [menu,nivel1,win]
};

// Inicialização do jogo
const game = new Phaser.Game(config);