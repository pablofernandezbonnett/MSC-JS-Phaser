class GameMaster {

    /**
     * La clase GameMaster define la informacion y funcionalidad que modela este sencillo sistema RPG.
     */

    // variables para generar cierta aleatoriedad en la generación de personaje.
    names = [ "CafeOle", "Tronco", "Snack", "Elena", "Bhazuc", "Roberta", "Lucifer", "El Llanero", "Azrael", "Garfield"];
    surnames = [ "EspinaSangrante", "TePartoLosDientez", "Nube Danzante", "Nito Del Bosque", "Frostfinger", "Malos Pelos", "MorningStar", "Solitario", "Cookie Monster"];
    professions = [ "Guerrero", "Picaro", "Explorador", "Barbaro" ];
    // log del combate
    combat_log = [];

    /**
     * Devuelve valores enteros aleatorios dentro de un rango definido por un minimo y maximo valores.
     * @param min valor minimo inclusivo.
     * @param max valor maximo exclusivo.
     * @returns {int} valor entero aleatorio.
     */
    static diceRoller(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Crea un personaje.
     * @param isPlayer es personaje jugador o enemigo
     * @returns {Character} personaje.
     */
    createCharacter(isPlayer) {
        let name = this.names[GameMaster.diceRoller(0, this.names.length)];
        let surname = this.surnames[GameMaster.diceRoller(0, this.surnames.length)];
        let profession = this.professions[GameMaster.diceRoller(0, this.professions.length)];
        let character = new Character(name, surname, profession, isPlayer);
        character.generateAttributes();
        character.setLife();
        character.setDamage();
        return character;
    }

    /**
     * Ajusta el nivel de los enemigos segun el nivel del jugador.
     * @param character personaje que recibe el ajuste de nivel.
     * @param level nuevo nivel del personaje.
     */
    balanceLevel(character, level) {
        character.level = level;
        character.setLife();
        character.setDamage();
    }

    /**
     * Simula un combate entre personajes.
     * @param player1 jugador 1.
     * @param player2 jugador 2.
     */
    combat(player1, player2) {
        // borramos el log del combate al principio de cada combate
        this.combat_log = [];
        this.combat_log.push("<br/>A mi izquierda " + player1.fullName + " y a mi derecha " + player2.fullName + "<br/>");
        let total_life_p1 = player1.life;
        let total_life_p2 = player2.life;
        while (player1.isCharacterAlive() && player2.isCharacterAlive() ) {
            let turn = GameMaster.diceRoller(0, 2);
            if (turn === 0) {
                this.attack(player1, player2, total_life_p2);
            } else {
                this.attack(player2, player1, total_life_p1);
            }
        }
    }

    /**
     * Simula el ataque que hace un personaje al otro.
     * @param player1 jugador atacante.
     * @param player2 jugador atacado.
     * @param total_life vida total del jugador atacado.
     */
    attack(player1, player2, total_life) {
        let damage = this.calculateDamage(player1);
        this.calculateLife(player2, damage);
        this.combat_log.push("<br/>" + player1.fullName + " hace " + damage + " de daño a " + player2.fullName + ", le quedan " + player2.life + "/" + total_life + " puntos de vida" + "<br/>");
    }

    /**
     * Calcula el daño base del personaje junto con la fuerza durante el combate.
     * @param character personaje.
     */
    calculateDamage(character) {
        return character.damage + GameMaster.diceRoller(1, 7) * character.level;
    }

    /**
     * Calcula la vida restante del personaje despues de recibir un ataque, jugador o enemigo.
     * @param character
     * @param damage
     * @returns {number}
     */
    calculateLife(character, damage) {
        character.life = character.life - damage;
    }

    /**
     * Devuelve el log del combate.
     * @returns {[combat log]} log del combate.
     */
    combatBrief() {
        return this.combat_log.join(" ");
    }

}