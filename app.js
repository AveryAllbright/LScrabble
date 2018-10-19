let LScrabble = (function (Maxiom) {

    /*
     * L System via Scrabble (Working Title)
     * By Emma Banks (Working Title)
     */



    let canvas = document.getElementById("mainCanvas");
    let ctx = mainCanvas.getContext('2d', {
        alpha: false
    });

    let TWO_PI = 2 * Math.PI;

    let w, h, counter = 0;
    let scale = 1;
    let rotation = 90;
    let axiom = Maxiom;
    let Scrabble = false;
    let moveStep = 1;

    let palette = [["#E70000", "#FF8C00", "#FFEF00", "#00811F", "#0044FF", "#760089"],
                   ["#FF148C", "#FFDA00", "#05AEFF"],
                   ["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"],
                   ["#a40061", "#b75592", "#ececea", "#c44e55", "#8a1e04"]];

    let paletteNum = 0;
    let designNum = 0;
    let ruleNum = 0;
    let next = 0;

    let tick = 0;
    let displayOver = ["E", 0, "A", 0, "O, T", 0, "I, N, R", 0, "S", 0, "D", 0, "L, U", 0, "C, M", 0, "G", 0, "H",
        0, "B, P", 0, "F, W, Y", 0, "V", 0, "K", 0, "J, X", 0, "Q, Z", 0];
    let Over = false;

    /* use to update global w and h and reset canvas width/height */
    function updateCanvasSize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        requestAnimationFrame(draw);
    }


    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);


    /* SETUP LSYSTEM */

    // calculate radians from degrees
    function radians(degrees) {
        return (degrees / 180) * Math.PI;
    }

    function randRange(min, max) {
        return min + Math.random() * (max - min);
    }

    function randItem(arr) {
        return arr[Math.ceil(Math.random() * arr.length)];
    }

    // L-System for this Project
    let grammar = new LSystem;



    class LTree {
        constructor() {
            this.grammar = new LSystem();
            this.grammar.addRule('A', [0, '_NE', 1, '_INE', 2, 'R_INE', 3, 'WHIPJ_CK']);
            this.grammar.addRule('B', [0, '_EE', 1, '_ARK', 2, '_AJAN', 3, 'JAM_EAUX']);
            this.grammar.addRule('C', [0, 'I_E', 1, 'MO_K', 2, 'PSY_H', 3, 'SKYJA_KS']);
            this.grammar.addRule('D', [0, '_IE', 1, 'AI_E', 2, 'AILE_', 3, 'JACK_AWS']);
            this.grammar.addRule('E', [0, '_AR', 1, 'A_ON', 2, 'ALON_', 3, 'J_JUNITY']);
            this.grammar.addRule('F', [0, '_IE', 1, '_UNK', 2, 'HE_TY', 3, 'JACK_ISH']);
            this.grammar.addRule('G', [0, 'A_E', 1, '_ONK', 2, '_ENOA', 3, 'HI_HJACK']);
            this.grammar.addRule('H', [0, 'T_Y', 1, '_OOK', 2, '_UNKY', 3, '_IJACKED']);
            this.grammar.addRule('I', [0, 'S_C', 1, 'ED_T', 2, 'RA_SE', 3, 'SK_PJACK']);
            this.grammar.addRule('J', [0, '_UD', 1, '_UDO', 2, '_OWLS', 3, 'CRACK_AW']);
            this.grammar.addRule('K', [0, '_HI', 1, 'BAC_', 2, 'CHEC_', 3, '_ICKBACK']);
            this.grammar.addRule('L', [0, 'A_E', 1, 'A_OE', 2, 'A_IEN', 3, 'F_APJACK']);
            this.grammar.addRule('M', [0, 'HE_', 1, 'PO_P', 2, 'HU_PH', 3, 'JI_CRACK']);
            this.grammar.addRule('N', [0, '_YE', 1, 'SEA_', 2, 'ATO_E', 3, 'BA_JAXED']);
            this.grammar.addRule('O', [0, 'E_N', 1, 'I_TA', 2, '_ILER', 3, 'WAXW_RKS']);
            this.grammar.addRule('P', [0, 'A_E', 1, 'CHO_', 2, 'EX_EL', 3, 'HEXA_ODY']);
            this.grammar.addRule('Q', [0, '_IS', 1, '_UIT', 2, '_UEEN', 3, '']);
            this.grammar.addRule('R', [0, 'A_E', 1, 'DA_E', 2, 'ADO_E', 3, 'HIJACKE_']);
            this.grammar.addRule('S', [0, '_EA', 1, '_ITE', 2, '_AINE', 3, 'JUMBUCK_']);
            this.grammar.addRule('T', [0, 'A_E', 1, 'EDI_', 2, 'RA_IO', 3, 'MA_CHBOX']);
            this.grammar.addRule('U', [0, 'R_E', 1, 'B_FF', 2, 'ADIE_', 3, 'H_MMOCKY']);
            this.grammar.addRule('V', [0, '_IE', 1, 'DI_E', 2, 'WA_ED', 3, 'CON_EXLY']);
            this.grammar.addRule('W', [0, 'A_E', 1, '_EAK', 2, '_HIFT', 3, 'KAJA_AHS']);
            this.grammar.addRule('X', [0, 'SI_', 1, 'A_LE', 2, 'VARI_', 3, 'E_OPHAGY']);
            this.grammar.addRule('Y', [0, 'A_E', 1, 'H_PO', 2, 'MIFF_', 3, 'KEFFI_EH']);
            this.grammar.addRule('Z', [0, '_AP', 1, '_EST', 2, 'HA_ER', 3, '']);

            this.iterations = 5;
            this.axiom = axiom;
            this.counter = 0;
            this.x = randRange(w / 4, w * 3 / 4);
            this.y = randRange(h * 3 / 4, h);
            this.height = randRange(h / 2, this.y);

            this.regenerate();
        }

        regenerate() {
            this.x = randRange(w / 4, w * 3 / 4);
            this.y = randRange(h / 4, h * 3 / 4);
            this.height = randRange(h / 2, this.y);
            this.rotation = randItem([0, radians(90), radians(180), radians(270)]);


            let result = this.grammar.generate(axiom, this.iterations, ruleNum);


            // keep our state stack here that we will push/pop the turtle's state onto
            let stateStack = [];

            // keep track of all of our line segments here
            let lines = [];

            let maxY = 0;

            let turtle = new Turtle(Vec2(0, 0));
            let angle = radians(rotation);

            for (let i = 0; i < result.length; i++) {
                let c = result[i];

                switch (c) {
                    case '[':
                        // push a copy our turtle's current state on to the state stack
                        stateStack.push([turtle.pos.copy(), turtle.angle]);
                        break;
                    case ']':
                        // pop the turtle's state and restore those values to the turtle
                        let state = stateStack.pop();
                        turtle.pos = state[0];
                        turtle.angle = state[1];
                        break;

                    case 'E':
                        let p1 = turtle.pos.copy();
                        turtle.moveForward(moveStep);
                        let p2 = turtle.pos.copy();
                        lines.push([p1, p2]);

                        // use min since we're actually going negative in 
                        // in our coordinate space
                        maxY = Math.min(maxY, p2.y);
                        displayOver[1]++;
                        break;
                    case 'A':
                        angle += radians(15);
                        turtle.rotate(angle);
                        displayOver[3]++;
                        break;
                    case 'O':
                    case 'T':
                        angle -= radians(15);
                        turtle.rotate(angle);
                        displayOver[5]++;
                        break;
                    case 'I':
                    case 'N':
                    case 'R':
                        turtle.moveForward(moveStep);
                        displayOver[7]++;
                        break;
                    case 'S':
                        moveStep++;
                        if (moveStep > 15) moveStep = 1;
                        displayOver[9]++;
                        break;
                    case 'D':
                        //Anim up step
                        displayOver[11]++;
                        break;
                    case 'L':
                    case 'U':
                        // anim down step
                        displayOver[13]++;
                        break;
                    case 'C':
                    case 'M':
                        scale += .0001;
                        displayOver[15]++;
                        break;
                    case 'G':
                        scale -= .01;
                        displayOver[17]++;
                        break;
                    case 'H':
                        turtle.angle = radians(90);
                        displayOver[19]++;
                        break;
                    case 'B':
                    case 'P':
                        paletteNum++;
                        if (paletteNum > 3) paletteNum = 0;
                        displayOver[21]++;
                        break;
                    case 'F':
                    case 'W':
                    case 'Y':
                        designNum = 0;
                        displayOver[23]++;
                        break;
                    case 'V':
                        designNum = 1;
                        displayOver[25]++;
                        break;
                    case 'K':
                        designNum = 2;
                        displayOver[27]++;
                        break;
                    case 'J':
                    case 'X':
                        designNum = 3;
                        displayOver[29]++;
                        break;
                    case 'Q':
                    case 'Z':
                        ruleNum++;
                        displayOver[31]++;
                        break;

                    default:
                        break;
                }
            }

            // we will scale all points now by max
            let max = this.height / maxY;

            // draw each line segment for the tree
            lines.forEach((d) => {
                // multiply by max so we scale to the screen height
                d[0].mul(max);
                d[1].mul(max);

            });

            this.lines = lines;

            this.lineColor = randRange(0.5, 1.0);
            this.lineWidth = 2;
            this.maxLineSegs = Math.floor(randRange(20, 40));
        }

        draw(ctx) {
            ctx.save();

            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.scale(1, -1);

            next += .00005;
            if (next > palette[paletteNum].length) {
                next = 0;

            };

            let numLines = this.lines.length;

            let percent = (1 - (this.counter / numLines));
            let alpha = this.lineColor * percent;

            ctx.fillStyle = palette[paletteNum][Math.floor(next)];
            ctx.strokeStyle = palette[paletteNum][Math.floor(next)];
            ctx.lineWidth = this.lineWidth;

            let start = Math.max(0, this.counter - this.maxLineSegs)

            for (let i = start; i < this.counter; i++) {
                let line = this.lines[i];
                scale = Math.abs(scale);


                /*Change Draw Pattern*/
                /*Line, Rect, Tri, Arc*/

                if (designNum == 0) {

                    ctx.beginPath();
                    ctx.moveTo(line[0].x, line[0].y);
                    ctx.lineTo(line[1].x, line[1].y);
                    ctx.stroke();

                } else if (designNum == 1) {
                    ctx.fillRect(line[0].x, line[0].y, line[1].x, line[1].y);
                    ctx.fill();


                } else if (designNum == 2) {

                    ctx.beginPath();
                    ctx.moveTo(line[0].x, line[0].y);
                    ctx.lineTo(line[0].x, line[1].y);
                    ctx.lineTo(line[1].x, line[1].y);
                    ctx.fill();

                } else {
                    ctx.beginPath();
                    ctx.arc(line[0].x, line[0].y, scale, 0, Math.PI * 2, false);
                    ctx.arc(line[1].x, line[1].y, scale, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.fill();
                }
            }

            if (Math.random() < 0.1) {
                this.counter = (this.counter + 1) % this.lines.length;

                if (this.counter == 0) {
                    this.regenerate();
                }
            }

            ctx.restore();
        }
    }




    let trees = Array.from({
        length: 120
    }, () => new LTree())

    /* MAIN DRAWING CODE */

    function draw(t) {

        ctx.fillStyle = '#00001F';
        ctx.fillRect(0, 0, w, h);


        ctx.save();


        trees.forEach((tree) => {
            tree.draw(ctx);
        });

        if (scale > 25) {
            scale = 25;
        }
        if (scale < -25) {
            scale = -25;
        }

        ctx.restore();
        if (!Over) {

            if (tick > 120) {
                Over = true;
            }
            requestAnimationFrame(draw);
        }

        if (Over) {
            for (let i = 0; i < displayOver.length; i + 2) {
                console.log(displayOver[i] + " : " + displayOver[i + 1]);
            }
            
        }

        tick++;
    }

    requestAnimationFrame(draw);


});
