(function(window) {
    const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
    const importObj = {
        'global': {},
        env: {
            abortStackOverflow: () => { throw new Error('overflow'); },
            table: new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' }),
            tableBase: 0,
            memory: memory,
            memoryBase: 1024,
            STACKTOP: 0,
            STACK_MAX: memory.buffer.byteLength,
        }
    };

    fetch('test.wasm', { credentials: 'same-origin' }).then(res => {
        return res.arrayBuffer()
    }).then(bytes => {
        console.log('bytes:', bytes)
        // 利用WebAssembly.instantiate接口将wasm模块的方法与importObject进行映射
        return WebAssembly.instantiate(bytes, importObj)
    }).then(obj => {
        console.log('obj:', obj)
        // 执行调用factorial
        obj.instance.exports._factorial(10);
    })

    window.factorial = function() {
        var num = document.getElementById('Input').value;
        console.log('num', num)
        // console.log('Module:', Module)
        // Module.callMain()
        // var fac = ccall('_factorial', 'number', ['number']);
        // console.log('res:', res)
    }
})(window)