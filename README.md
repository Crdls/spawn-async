# Spawn inline
Simple wrapper for spawn() function to make it work with await and line-command without need of array of attributes.  

Usage sample:
```
const spawnInline = require('spawn-inline');
await spawnInline('git status', {cwd: 'repo-dir'}, (text, err) => console.log(text));
// or
await spawnInline('git status', 'repo-dir');
```

## Function attributes
async function (command, options, callback)  
- *command* - text command to spawn, e.g. 'git status'
It can be an array. In that case the first element counts as command, and rest of the array - as parameters.  
- *(optional) options* - original child_process.spawn options  
https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback  
It can be a string - in this case parameter counts as "cwd" option (working directory)
- *(optional) callback* - function to call on stdout or stderr, if not specified - will call process.stdout.write/process.stderr.write  

## Callback
function (out, err)  
- *text* - text output of called command
- *err* - boolean, indicates if error occured

## Return value
Spawn-inline return an array filled with output lines.

## Bugs
Be aware, that if *command* attribute is string, it is splitted by split(' '), so if you have spaces in your parameters values (e.g. commit message) you'll need to use array-style command.
```
await spawnInline('git commit -a -mMy new commit'); // - will result in error (caused by splitting "My new commit" string)
await spawnInline(['git', 'commit', '-a', '-mMy new commit']); // - will do the job traditional way

``` 

## License
MIT 

