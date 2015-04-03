 var JSInput = (function() {
              var channel,
              // The above wrapper function and channel variable are both necessary,
              // REQUIRED --- DO NOT REMOVE/CHANGE!!
                
              // The "state" JSON dictionary below is passed to the platform for grading and saving.
              // Pass through whatever you wish
              state = {
                       0: false,
                       1: false,
                       2: false,
                       3: false,
               };
            
              // Establish a channel only if this application is embedded in an iframe.
              // This will let the parent window communicate with this application using
              // RPC and bypass SOP restrictions.
              //
              // REQUIRED --- DO NOT REMOVE/CHANGE!!
              if (window.parent !== window) {
                  channel = Channel.build({
                      window: window.parent,
                      origin: "*",
                      scope: "JSInput"
                  });
                  channel.bind("getGrade", getGrade);
                  channel.bind("getState", getState);
                  channel.bind("setState", setState);
               }
               
              // Initialize function: is run every time the iframe is loaded.
              //
              // Custom functions and scripting should be defined here.
              function init() {
                   $("#mirror-response a.element").click(function() {
                       event.preventDefault();
                       var stateID = $(this).attr('id') + '';
                       if ($(this).hasClass('on')) {
                           state[stateID] = false;
                           $(this).removeClass('on');
                       } else {
                           state[stateID] = true;
                           $(this).addClass('on');
                      }
                   });
               }
                
                // function that displays saved state changes to the user.
                //
                // Customize to load saved state
                function updateState() {
                    var count = Object.keys(state).length
                    for(var i=0;i<count;i++){
                        var elementOn = state[i];
                        var elementID = '#' + i;
                        if (elementOn) {
                            $(elementID).addClass('on');
                        }
                    }
                }
                
                init();
                
                // This function gets called by the platform to get the student grade when the submit button is clicked.
                //
                // Can be customized, but this is a good default.
                function getGrade() {
                    return JSON.stringify(state);
                }
                
                // This function gets called by the platform to save the student state when the submit button is clicked.
                //
                // Can be customized, but this is a good default.
                function getState() {
                    return JSON.stringify(state);
                }
                
                // This function gets called by the platform to set the student state when the iframe is loaded.
                //
                // Can be customized, but this is a good default.
                function setState() {
                    stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
                    state = JSON.parse(stateStr);
                    updateState();
                }
                
                // return that gives the platform the names of the functions it has available.
                //
                // REQUIRED --- DO NOT REMOVE/CHANGE!!
                return {
                    getState: getState,
                    setState: setState,
                    getGrade: getGrade
                };
}());
       
