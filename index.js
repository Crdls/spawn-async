const {spawn} = require('child_process');

module.exports = async (command, options, callback) => {
    let params = []
    let run = '';

    if (Array.isArray(command)) {
        run = command.shift();
        params = command;
    } else {
        params = command.split(' ');
        run = params.shift();
    }

    // to run tsc and npm on win and linux with same command
    if ((run === 'npm' || run === 'tsc') && /^win/.test(process.platform)) {
        run = `${run}.cmd`;
    }

    if (!callback || typeof callback !== 'function') {
        callback = (data, err) => err ? process.stderr.write(data) : process.stdout.write(data);
    }

    if (typeof options === 'string') {
        options = {cwd: options};
    }

    options.shell = true;

    const output = [];
    try {
        const com = spawn(run, params, options);
        com.stderr.on("data", data => callback(data.toString(), true));
        com.stdout.on("data", data => callback(data.toString()));
        com.on("error", error => callback(error.toString(), true));
        for await (const data of com.stdout) {
            output.push(data.toString());
        }
        return output;
    } catch (e) {
        throw new Error(e);
    }
}
