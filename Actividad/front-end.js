/**
 * Funcionalidad para el front-end
 */

let gameMaster = new GameMaster();

/**
 * Crea un personaje jugador
 */
function createPlayer() {
    let character = gameMaster.createCharacter(true);
    verHojaDePersonaje("jugador", character);
    return character;
}

/**
 * Crea un enemigo.
 */
function createEnemy() {
    let character = gameMaster.createCharacter(false);
    verHojaDePersonaje("enemigo", character);
    return character;
}

/**
 * Subir de nivel al personaje y actualizar sus detalles por pantalla.
 */
function levelUp(character) {
    // subir personaje de nivel
    character.setLevelUp();
    // actualizar datos del personaje
    verHojaDePersonaje("jugador", character);
    // ocultar boton levelUp
    toggleElement(".level-up-btn", true);
    // mostrar boton Continuar
    toggleElement(".keep-going-btn", false);
}

/**
 * Continuar con la lucha generando un nuevo oponente y limpiando el log del combate anterior.
 */
function keepGoing(player, enemy) {
    // borrar log del combate
    borrarLogCombate();
    if (!enemy.isCharacterAlive()) {
        // generar nuevo oponente si ha muerto
        enemy = gameMaster.createCharacter(false);
        gameMaster.balanceLevel(enemy, player.level);
        // mostrar datos del nuevo oponente
        verHojaDePersonaje("enemigo", enemy);
    }
    // no restauramos la vida del oponente para dar una ventaja al jugador si pierde
    // restaurar vida del personaje jugador si ha muerto
    if (!player.isCharacterAlive()) {
        player.setLife();
    }
    // actualizar los datos en la hoja del personaje jugador
    verHojaDePersonaje("jugador", player);
    // ocultar boton continuar
    toggleElement(".keep-going-btn", true);
    return enemy;
}

/**
 * Combate!!!!
 */
function combate(player, enemy) {
    // borrar log del combate
    borrarLogCombate();
    // ocultar boton levelUp
    toggleElement(".level-up-btn", true);
    // ocultar boton Continuar
    toggleElement(".keep-going-btn", true);
    // empieza el combate
    if (typeof player != "undefined" && typeof enemy != "undefined") {
        gameMaster.combat(player, enemy);
        document.querySelector(".resumen-combate").innerHTML = gameMaster.combatBrief();
        if (player.isCharacterAlive()) {
            document.querySelector(".resultado-combate").innerHTML = "Enhorabuena! Has ganado el combate :)";
            // actualizar experiencia ganada
            player.setExperience();
            // actualizar datos en la hoja del jugador
            verHojaDePersonaje("jugador", player);
            // si el jugador puede subir de nivel, se muestra el boton de subir de nivel
            if (player.isLevelUp()) {
                // ocultar boton Continuar
                toggleElement(".keep-going-btn", true);
                // mostrar boton LevelUp
                toggleElement(".level-up-btn", false);
            } else {
                // mostrar boton Continuar
                toggleElement(".keep-going-btn", false);
            }
        } else {
            // mensaje al jugador de que ha perdido
            document.querySelector(".resultado-combate").innerHTML = "Has perdido :(. No te rindas! Prueba otra vez!";
            // mostrar boton Continuar
            toggleElement(".keep-going-btn", false);
        }
    } else {
        document.querySelector(".resultado-combate").innerHTML = "Genera un personaje y un oponente un para jugar!";
    }
}

/**
 * Muestra los detalle del personaje por pantalla.
 * @param characterType tipo de personaje (jugador o enemigo).
 * @param character personaje.
 */
function verHojaDePersonaje(characterType, character) {
    document.querySelector("." + characterType + "-nombre").innerHTML = character.fullName;
    document.querySelector("." + characterType + "-profesion").innerHTML = "Profesión: " + character.profession;
    document.querySelector("." + characterType + "-atributos").innerHTML = "Atributos: " + character.prettifyAttributes();
    document.querySelector("." + characterType + "-nivel").innerHTML = "Nivel: " + character.level;
    document.querySelector("." + characterType + "-vida").innerHTML = "Vida: " + character.life;
    if (character.isPlayer) {
        document.querySelector("." + characterType + "-experiencia").innerHTML = "Experiencia: " + character.experience;
    }
}

/**
 * Borra la hoja del personaje.
 * @param characterType tipo de personaje (jugador o enemigo).
 * @param character personaje.
 */
function borrarHojaDePersonaje(characterType, character) {
    document.querySelector("." + characterType + "-nombre").innerHTML = "";
    document.querySelector("." + characterType + "-profesion").innerHTML = "";
    document.querySelector("." + characterType + "-atributos").innerHTML = "";
    document.querySelector("." + characterType + "-nivel").innerHTML = "";
    document.querySelector("." + characterType + "-vida").innerHTML = "";
    if (character.isPlayer) {
        document.querySelector("." + characterType + "-experiencia").innerHTML = "";
    }
}

/**
 * Borra el log del combate en pantalla.
 */
function borrarLogCombate() {
    // borrar log anterior del combate
    document.querySelector(".resumen-combate").innerHTML = "";
    document.querySelector(".resultado-combate").innerHTML = "";
}

/**
 * Muestra u oculta el elemento seleccionado via class-selector.
 * @param elementSelector clase para buscar el elemento.
 * @param hide true o false para ocultar o mostrar el elemento.
 */
function toggleElement(elementSelector, hide) {
    let element = document.querySelector(elementSelector);
    if (element !== undefined) {
        // si queremos mostrar anadimos clase .d-block y quitamos la clase .d-none
        element.classList.remove(hide ? "d-block" : "d-none");
        // si queremos ocultar anadimos clase .d-none y quitamos la clase .d-block
        element.classList.add(hide ? "d-none" : "d-block");
    }
}