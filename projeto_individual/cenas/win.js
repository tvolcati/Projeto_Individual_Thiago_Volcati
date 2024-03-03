export default class win extends Phaser.Scene { //a classe win herdando a classe de cenas do phaser

    constructor() {
        super({ key: "win" }); // nome
    };

    //declarando as variáveis necessárias
    botaoJogar;

    preload() {
        // Carregamento dos recursos da fase de vitória
        this.load.image("win", "assets/win/win.png");
        this.load.image("win", "assets/win/buttons/jogar.png");
    }

    create() {
    this.add.image(360, 640, 'win'); // carregando a imagem do background no fundo da tela

     // colocando o botao jogar
     this.botaoJogar = this.add.image(360, 900, "jogar").setScale(1.5);


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