Deno.stdin.setRaw(true)


const encoder = new TextEncoder();

const currentLine = new Uint8Array(10240)
const ctrlLetters = new Uint8Array(10)
ctrlLetters[0] = 13
ctrlLetters[1] = 10

const CARRIAGE_RETURN = ctrlLetters.slice(0,1)
const NEW_LINE = ctrlLetters.slice(0,2)

ctrlLetters[2] = 27
ctrlLetters[3] = 91
ctrlLetters[4] = 68

const CNTRL_LEFT_KEY = ctrlLetters.slice(2,5)

ctrlLetters[5] = 32
const SPACE = ctrlLetters.slice(5,6)


const LEFT_SEQUENCE = [27,91,68]
const UP_SEQUENCE = [27, 91, 65]
const RIGHT_SEQUENCE = [27, 91, 67]

const history: Uint8Array[] = []
let historicalLine = 0

function transform(readline: ReadLine, chunk: Uint8Array, controller: TransformStreamDefaultController<Uint8Array>) {
    let cntrl = false

    for(const unit of chunk) {
        if(unit === 3) {
            Deno.exit(-1)
        }

        if(unit === LEFT_SEQUENCE[readline.state.leftSequencePostion]) {
            readline.state.leftSequencePostion += 1
            cntrl = true
        } else {
            readline.state.leftSequencePostion = 0
        }

        if(unit === UP_SEQUENCE[readline.state.upSequencePostion]) {
            ++readline.state.upSequencePostion
            cntrl = true
        } else {
            readline.state.upSequencePostion = 0
        }

        if(unit === RIGHT_SEQUENCE[readline.state.rightSequencePostion]) {
            ++readline.state.rightSequencePostion
            cntrl = true
        } else {
            readline.state.rightSequencePostion = 0
        }

        if(readline.state.leftSequencePostion === 3 || unit === 127 /* DEL */) {
            readline.state.leftSequencePostion = 0
            if(readline.state.currentPosition > 0) {
                readline.state.currentPosition -= 1
                controller.enqueue(CNTRL_LEFT_KEY)
                controller.enqueue(SPACE)
                controller.enqueue(CARRIAGE_RETURN)
                controller.enqueue(readline.PROMPT)
                const lineEncoded = currentLine.slice(0, readline.state.currentPosition)
                controller.enqueue(lineEncoded)
            }
            return // TODO: don't reset state on cntrl input -- this can make piped input incorrect
        }

        if(readline.state.upSequencePostion == 3) {
            --historicalLine
            
            controller.enqueue(CARRIAGE_RETURN)
            for(let i=0; i < readline.PROMPT.length+readline.state.currentPosition; ++i) {
                controller.enqueue(SPACE)
            }
            controller.enqueue(CARRIAGE_RETURN)
            controller.enqueue(readline.PROMPT)

            if(history.length+historicalLine >= 0) {
                currentLine.set(history[history.length+historicalLine])
                
                readline.state.currentPosition = history[history.length+historicalLine].length

                controller.enqueue(currentLine.slice(0, readline.state.currentPosition))
            } else {
                readline.state.currentPosition = 0
            }

            readline.state.upSequencePostion = 0
            return // TODO: don't reset state on cntrl input -- this can make piped input incorrect
        }

        if(cntrl) {
            cntrl = false
            continue
        }
        
        if (unit === 13 ) {
            controller.enqueue(NEW_LINE)

            const lineEncoded = currentLine.slice(0, readline.state.currentPosition)
            historicalLine=0
            history.push(lineEncoded)

            const decoder = new TextDecoder();
            const line = decoder.decode(lineEncoded)
            readline.state.currentPosition = 0

            const output = readline.method(line)
            const outputEncoded = encoder.encode(output)
            
            controller.enqueue(outputEncoded)
            controller.enqueue(NEW_LINE)
            controller.enqueue(readline.PROMPT)

            return  // TODO: don't reset state on cntrl input -- this can make piped input incorrect
        } 
    }

    currentLine.set(chunk, readline.state.currentPosition)
    readline.state.currentPosition += chunk.length
    controller.enqueue(chunk)
}

type ReadLineState = {
    currentPosition: number
    leftSequencePostion: number 
    upSequencePostion: number
    rightSequencePostion: number
}

export class ReadLine extends TransformStream {
    method: (query: string) => string
    state: ReadLineState
    public readonly PROMPT: Uint8Array

    constructor(_method: (query: string) => string, prompt: string) {
        super({
            transform: (chunk, controller) => transform(this, chunk, controller)
        })

        this.method = _method
        this.state = {currentPosition: 0, leftSequencePostion: 0, upSequencePostion: 0, rightSequencePostion: 0}
        this.PROMPT = encoder.encode(prompt)
    }   
}