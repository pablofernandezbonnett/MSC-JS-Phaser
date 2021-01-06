class Character {

    /**
     * La clase Character define la informacion y funcionalidad que modela a un personaje.
     * Un personaje tiene los siguientes attributos/campos/propiedades
     * nombre, apellido, profesion, vida, atributos
     */

    /**
     * Crea un nuevo personaje recibiendo como parametros nombre, apellido y profesion.
     * @param name nombre del personaje.
     * @param surname apellido del personaje.
     * @param profession profesion del personaje.
     * @param isPlayer es personaje jugador o enemigo.
     */
    constructor(name, surname, profession, isPlayer) {
        this.name = name;
        this.surname = surname;
        this.profession = profession;
        this.level = 1;
        this.experience = 0;
        this.isPlayer = isPlayer;
        // atributos definidos por defecto a 0
        this.attributes = [ {name : "STR", value : 0}, {name : "DEX", value : 0}, {name : "CON", value : 0},
            {name : "INT", value : 0}, {name : "WIS", value : 0}, {name : "CHAR", value : 0} ];
    }

    /**
     * Devuelve el nombre completo del personaje.
     * @returns {string} nombre completo del personaje.
     */
    get fullName() { return this.name + " " + this.surname; }

    /**
     * Devuelve el bonus basado en el valor del atributo correspondiente.
     * @param attributeName nombre del atributo.
     * @returns {number} bonus.
     */
    getAttribute(attributeName) {
        let bonus = 0;
        this.attributes.forEach((attribute) => {
            if (attribute.name === attributeName) {
                bonus = attribute.value;
            }
        });
        return bonus;
    }

    /**
     * Sube el nivel del personaje jugador. Por cada nivel actualizamos la vida y el danio
     */
    setLevelUp() {
        this.level++;
        // actualizamos los puntos de vida
        this.setLife(this.life);
        // actualizamos damage
        this.setDamage();
    }

    /**
     * Comprueba si el personaje puede subir de nivel o no.
     */
    isLevelUp() {
        return this.experience >= this.level * 10;
    }

    /**
     * Define la experiencia del personaje.
     */
    setExperience() {
        this.experience = this.experience + 10;
    }

    /**
     * Comprueba si el personaje del jugador sigue vivo o no.
     * @returns {boolean} true or false.
     */
    isCharacterAlive() {
        return this.life > 0;
    }

    /**
     * Define la vida del personaje a partir de su nivel y atributo de Constitucion.
     */
    setLife(life) {
        // definimos la vida base como 1d6 * nivel del personaje + el atributo de Constitucion como bonus
        // si ha subido de nivel, se suma la vida anterior a la nueva cantidad de puntos de vida disponibles
        let bonus = this.getAttribute("CON");
        if (life !== undefined) {
            this.life = GameMaster.diceRoller(1, 7) * this.level + bonus + life;
        } else {
            this.life = GameMaster.diceRoller(1, 7) * this.level + bonus;
        }
    }

    /**
     * Define el daño base del personaje basado en el atributo de fuerza
     */
    setDamage() {
        // definimos como damagecomo 1d6 * nivel del personaje + el atributo de Fuerza como bonus
        let bonus = this.getAttribute("STR");
        this.damage = GameMaster.diceRoller(1, 7) * this.level + bonus;
    }

    /**
     * Genera, con valores aleatorios, los atributos basicos del personaje.
     */
    generateAttributes() {
        this.attributes.forEach((attribute) => { attribute.value = GameMaster.diceRoller(5, 11); });
    }

    /**
     * Devuelve los detalles principales del personaje.
     * @returns {string} detalles del personaje.
     */
    printCharacter() { return this.fullName + " is a " + this.profession + " and its stats are " + this.prettifyAttributes(); }

    /**
     * Devuelve los atributos del personaje formateados (prettified).
     * @returns {string} atributos.
     */
    prettifyAttributes() {
        let pretty = "";
        this.attributes.forEach((attribute) => { pretty = pretty + "<br/>" + attribute.name + " : " + attribute.value });
        return pretty;
    }

}