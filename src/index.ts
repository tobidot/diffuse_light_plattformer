import { help } from './helper';
import * as jQuery from 'jquery';
import { Game } from './game/Game';


(function ($) {
    jQuery(document).css('background', 'black');
    let canvas = document.getElementById('game-canvas');
    if (canvas) {
        let game = new Game(<HTMLCanvasElement>canvas);
        setInterval(() => {
            game.update(33);
        }, 33);
    } else {
        throw "No Canvas found";
    }
})(jQuery);
