const logger = require("../../../utils/logger");


module.exports =  {
    launch : () => {
        logger.info('this is the sample')
        logger.debug('this is the sample')
    }
};

//infos :
/*
* Pour k éléments parmi n, le nombre d'arrangements est
* n!/(n−k)!
* */