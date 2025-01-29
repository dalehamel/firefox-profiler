async function tryLoadRubyHooks() {
    try {
        //const hookModule = await import(/* webpackIgnore: true */ 'firefox-profiler/utils/ruby-custom-hooks');

        const context = require.context('./', false, /ruby-custom-hooks\.js$/);
        const hookModule = context('./ruby-custom-hooks');

        if (hookModule) {
          return {
              rubyGemDownloadRecipe: hookModule.rubyGemDownloadRecipe,
              normalPathCatchall: hookModule.normalPathCatchall
          };
        } else {
          return null;
        }
    } catch (error) {
        // no hooks were defined, the default behaviour will be used
    }
    return null;
}
