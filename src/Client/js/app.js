
// CONTROLLER MODULE -->-->-->-->-->-->-->-->-->-->-->-->

import {dataModule} from './data-module';
import {userInterfaceModule} from './ui-module';

let controllerModule = (function(UImodule, userDataModule){
  UImodule.submitButton.addEventListener('click', function(){
    let object = userDataModule.getData();
    userDataModule.sendToAPI(object);
  })
})(userInterfaceModule, dataModule);
