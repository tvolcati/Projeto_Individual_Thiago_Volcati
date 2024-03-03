export default class nivel1 extends Phaser.Scene { //a classe nivel1 herdando a classe de cenas do phaser

    constructor() {
        super({ key: "nivel1" }); // dando nome
    };

    // definindo as varáveis necessárias
    cloud1;
    cloud2;
    cloud3;
    cloud4;
    touchableObjects=[];
    passarinho;
    passo_x=5;
    passo_y=2;
    alienigena;
    passo_x_alien=8;
    passo_y_alien=2;
    deathObjects=[]
    inteli;
    aviao;
    teclado;
    placar;
    pontuacao=0;
    
    preload() {
        // Carregamento dos recursos do nível 1
        this.load.image("fundo_level1", "assets/nivel1/background.png");
        this.load.image("clouds", "assets/nivel1/clouds.png");
        this.load.spritesheet('passaro','assets/nivel1/passaro.png', {frameWidth:697,frameHeight:800}); //carregamento do sprite do passarinho
        this.load.image('alienigena','assets/nivel1/alienigena.png');
        this.load.image('inteli','assets/nivel1/inteli.png');
        this.load.image('aviao','assets/nivel1/aviao.png');
    }

    create() {

        // Criação do cenário e do personagem + configuração da câmera e dos limites do mundo
        this.add.image(360, 640, 'fundo_level1'); // carregando a imagem do background no fundo da tela

        //adicionando todos os recursos visuais que irão interferir com física no jogo
        this.cloud1 = this.physics.add.staticImage(100, 950, 'clouds').setScale(0.8).setSize(500,100);
        this.cloud2 = this.physics.add.staticImage(760, 950, 'clouds').setScale(0.8).setSize(240,100);
        this.cloud3 = this.physics.add.staticImage(-120, 600, 'clouds').setScale(0.8).setSize(500,100);
        this.cloud4 = this.physics.add.staticImage(600, 600, 'clouds').setScale(0.8).setSize(250,100);
        this.inteli = this.physics.add.staticImage(374, 100, 'inteli').setScale(1).setSize(200,100);
        this.passarinho = this.physics.add.sprite(100, 750, 'passaro').setScale(0.18).setFlip(true,false); 
        this.alienigena = this.physics.add.sprite(100, 350, 'alienigena').setScale(1.15); 
        this.aviao = this.physics.add.sprite(400, 1150, 'aviao').setScale(0.8).setSize(150,200);

        // configurando a animação do passarinho
        this.anims.create({
            key: 'fly', // nome da animação
            frames: this.anims.generateFrameNumbers('passaro', {start:0, end:11}), // definindo os sprites dessa animação
            frameRate:10, // taxa de quadros por segundo
            repeat:-1 // repetir infinitamente
        }); 

        // rodando a animação do passarinho
        this.passarinho.anims.play('fly',true); //adicionado a animação fly a variavel (agora com spritesheet) corespondente
       
        // definindo a variável teclado como receptor do hardware
        this.teclado = this.input.keyboard.createCursorKeys()

        // dizendo que o avião não deve passar das bordas do mapa
        this.aviao.setCollideWorldBounds(true);

        // adicionando as nuvems a lista de Objetos tocáveis
        this.touchableObjects.push(this.cloud1, this.cloud2, this.cloud3, this.cloud4)

        // adicionando o passaro e o alienigena a lista de objetos que te fazem perder o jogo
        this.deathObjects.push(this.passarinho, this.alienigena)

        // dizendo que os tocáveis devem colidir com o avião (controlável)
        this.physics.add.collider(this.aviao,this.touchableObjects); 

        // dizendo que caso o avião encoste nos objetos que fazem perder, o código deve redirecionar pro menu
        this.physics.add.overlap(this.aviao,this.deathObjects, () => {
            this.scene.start('menu');
        });

        // caso ele chegue no inteli no final da fase, deve redirecionar pra uma página de vitória
        this.physics.add.overlap(this.aviao,this.inteli, () => {
            this.scene.start('win');
            this.pontuacao +=1;         // deve-se somar 1 na pontuação toda vez que o player ganhar o jogo
        });

        this.placar = this.add.text(40, 1230, 'Quantidade de Vitórias:' + this.pontuacao, {fontSize:'45px', fill:'#495613'}); // adiconando placar visivelmente
    };


    

     update() {

        // definindo tudo que vai acontecer simultaneamente
        this.movimentoPassarinho()
        this.movimentoAlienigena()
        this.movimentoAviao()
    }
            
    movimentoPassarinho() { // configurando a movimentação do passarinho
    
        while(this.passarinho.x>=100 && this.passarinho.x<=650){
            this.passarinho.x += this.passo_x // enquanto o objeto estiver entre um range de pixels, será repetido o comando "de um passo", definido por 5px na variavel
            if(this.passarinho.x===100 || this.passarinho.x===650){
                this.passarinho.setFlip(!this.passarinho.flipX,false); // se alcançar o limite do range de pixels enquadrado, o passarinho deve espelhar a imagem na horizontal 
                this.passo_x *=-1 // dessa forma conseguimos inverter o sentido  do "passo"
            }
         break;   // fechar a estrutura While
        }

        // linha para correção de um bug que estava tendo, cujo o passarinho ficava parado nas outras jogadas da fase
        if (this.passarinho.x<100){
            this.passo_x *=-1 
            this.passarinho.x += this.passo_x }
    }
    movimentoAlienigena() {
    
        if (this.alienigena.x <= 100) {
            this.passo_x_alien = Math.abs(this.passo_x_alien); // faz com que sempre que o personagem esteja na borda esquerda, ele retorne ao valor absoluto de 'passo_x_alien', que foi declarado lá em cima
        }

        if (this.alienigena.x >= 650) {
            this.passo_x_alien = this.passo_x_alien*-1; // faz com que quando ele chegue na borda direita do mapa, ele inverta o movimento
        }

        this.alienigena.x += this.passo_x_alien; // faz com que a posição do alien seja manipulado por uma variável

        if (this.alienigena.y <= 300) {
            this.passo_y_alien = this.passo_y_alien*-1; // faz com que sempre que o personagem esteja no ponto máximo superior, ele inverta o movimento
        }

        if (this.alienigena.y >= 450) {
            this.passo_y_alien = this.passo_y_alien*-1; // faz com que sempre que o personagem esteja no ponto máximo inferior, ele inverta o movimento
        }

        this.alienigena.y += this.passo_y_alien; // faz com que a posição do alien seja manipulado por uma variável
}
  
movimentoAviao(){

    // definindo toda a movimentação com uma lógica de se o respectivo botão estiver apertado, deve se deslocar uma determinada quantidade de pixels no determinado eixo
    if (this.teclado.left.isDown){
        this.aviao.setVelocityX (-300); }
    
    else if (this.teclado.right.isDown) {
        this.aviao.setVelocityX (300);}
        
    else {
        this.aviao.setVelocityX(0) } // se nenhum desses botões estiver apertado, deve ficar imóvel no eixo
    
    if (this.teclado.up.isDown){
        this.aviao.setVelocityY(-300);
        }

    else if (this.teclado.down.isDown) {
        this.aviao.setVelocityY (300);}
            
    else {
        this.aviao.setVelocityY(0) } // se nenhum desses botões estiver apertado, deve ficar imóvel no eixo
}
}