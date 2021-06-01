# Spawn async
Simple wrapper for spawn() function.  
  
Minimal usage:
```
const spawnAsync = require('spawn-async');
spawnAsync('git status');
```

## Description
```
async (command, options, callback)
command - text command to spawn, e.g. 'git status'
(optional) options - original child_process.spawn options (see https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)
(optional) callback - function to call on stdout or stderr, if not specified - will call process.stdout.write/process.stderr.write
```

