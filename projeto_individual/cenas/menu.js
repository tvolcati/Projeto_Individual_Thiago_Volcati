export default class menu extends Phaser.Scene { // classe menu herdando a classe de cenas do phaser
    
    // defininfo as varáveis necessárias
    botaoJogar; 

    constructor() {
        super({ key: "menu" }); //dando o nome menu pra essa página
    };

    preload() {
        // Carregamento das imagens do menu
        this.load.image("background", "assets/menu/background.png");
        this.load.image("jogar", "assets/menu/buttons/jogar.png");

    }

    create() {
        // Criando o background do menu
        this.add.image(0,0, "background").setOrigin(0);

        // colocando o botao jogar
        this.botaoJogar = this.add.image(360, 800, "jogar").setScale(1.5);

       // Dizendo para o Phaser que os botões não são apenas imagens, mas sim objetos com que se pode interagir
       this.botaoJogar.setInteractive();

       // Configurar o que o botão de jogar deve fazer ao ser clicado
       this.botaoJogar.on("pointerup", this.apertouBotaoJogar, this);

    }

    apertouBotaoJogar() {
        // Desabilitar interações com os botões
        this.botaoJogar.disableInteractive();
        // Iniciar o Nivel1 como próxima cena
        this.comecarProximaCena("nivel1")
    }


    // Começa a próxima cena
    comecarProximaCena(cena) {
        this.scene.start(cena)
    }

}