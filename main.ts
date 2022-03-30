let y_j = 0
let x_j = 0
let hero = game.createSprite(2, 2)
let food = game.createSprite(4, 4)
let ghost = game.createSprite(0, 0)
ghost.change(LedSpriteProperty.Blink, 100)
ghost.set(LedSpriteProperty.Brightness, 10)
food.set(LedSpriteProperty.Brightness, 5)
while (true) {
    basic.pause(400)
    x_j = pins.analogReadPin(AnalogPin.P0)
    y_j = pins.analogReadPin(AnalogPin.P1)
    if (ghost.get(LedSpriteProperty.X) < hero.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, 1)
    } else if (ghost.get(LedSpriteProperty.X) > hero.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, -1)
    } else if (ghost.get(LedSpriteProperty.Y) < hero.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, 1)
    } else if (ghost.get(LedSpriteProperty.Y) > hero.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, -1)
    }
    if (x_j > 823) {
        hero.change(LedSpriteProperty.X, 1)
    } else if (x_j < 200) {
        hero.change(LedSpriteProperty.X, -1)
    }
    if (y_j > 823) {
        hero.change(LedSpriteProperty.Y, 1)
    } else if (y_j < 200) {
        hero.change(LedSpriteProperty.Y, -1)
    }
    if (hero.isTouching(food)) {
        music.startMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once)
        game.addScore(1)
        food.set(LedSpriteProperty.X, randint(0, 5))
        food.set(LedSpriteProperty.Y, randint(0, 5))
        if (food.get(LedSpriteProperty.X) < 2 && food.get(LedSpriteProperty.Y) < 2) {
            ghost.set(LedSpriteProperty.X, 4)
            ghost.set(LedSpriteProperty.Y, 4)
        } else if (food.get(LedSpriteProperty.X) > 2 && food.get(LedSpriteProperty.Y) < 2) {
            ghost.set(LedSpriteProperty.X, 0)
            ghost.set(LedSpriteProperty.Y, 4)
        } else if (food.get(LedSpriteProperty.X) < 2 && food.get(LedSpriteProperty.Y) > 2) {
            ghost.set(LedSpriteProperty.X, 4)
            ghost.set(LedSpriteProperty.Y, 0)
        } else {
            ghost.set(LedSpriteProperty.X, 0)
            ghost.set(LedSpriteProperty.Y, 0)
        }
    }
    if (hero.isTouching(ghost)) {
        music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
        game.gameOver()
    }
}
ghost.set(LedSpriteProperty.X, 4)
