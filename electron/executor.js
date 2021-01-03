const vm = require('vm')

let __instance = null

class Executor {
    constructor() {
        this.results = []
        this.cache = null
        this.counter = 0
        this.context = this.__getContext()
        vm.createContext(this.context)
    }

    /**
     * Reset the editor.
     * - clears cache and resets counter
     */
    reset() {
        this.cache = null
        this.counter = 0
        this.results = []
    }

    /**
     * Execute a code
     * @param {str} code - The code to execute
     */
    run(code, name='<anonymous>') {
        // clear previous results
        this.results = []
        this.counter++
        let error = null
        let script;
        if (this.cache) {
            script = new vm.Script(code, {
                filename: name,
                cachedData: this.cache
            })
        }
        else {
            script = new vm.Script(code)
        }
        try {
            // run script
            const res = script.runInContext(this.context)
            (res !== undefined) && this.results.push({type: 'result', value: res})
        }
        catch (err) {
            error = {message: err.message, code: err.code, stack: err.stack}
        }
        // update cache
        this.cache = script.createCachedData()
        // return results
        return {
            results: this.results, 
            error, 
            counter: this.counter
        }
    }

    __getContext() {
        return {
            console: {
                log: (message, ...params) => {
                    this.results.push({type: 'log', value: message})
                    console.log("[LOG]:" + message, ...params)
                }
            }
        }
    }
}

/**
 * @returns {Executor} The current executor instance
 */
module.exports = function () {
    if (__instance === null) {
        __instance = new Executor()
    }
    return __instance
}