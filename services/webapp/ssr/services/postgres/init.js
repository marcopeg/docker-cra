
const connectionHandler = require('./connection-handler')

const init = async (Sequelize, name, settings) => {
    const handler = new Sequelize(settings.database, settings.username, settings.password, {
        dialect: 'postgres',
        host: settings.host,
        port: settings.port,
        logging: settings.queryLogger,
        operatorsAliases: {
            $eq: Sequelize.Op.eq,
            // $ne: Sequelize.Op.ne,
            // $gte: Sequelize.Op.gte,
            // $gt: Sequelize.Op.gt,
            // $lte: Sequelize.Op.lte,
            // $lt: Sequelize.Op.lt,
            // $not: Sequelize.Op.not,
            // $in: Sequelize.Op.in,
            // $notIn: Sequelize.Op.notIn,
            // $is: Sequelize.Op.is,
            // $like: Sequelize.Op.like,
            // $notLike: Sequelize.Op.notLike,
            // $iLike: Sequelize.Op.iLike,
            // $notILike: Sequelize.Op.notILike,
            // $regexp: Sequelize.Op.regexp,
            // $notRegexp: Sequelize.Op.notRegexp,
            // $iRegexp: Sequelize.Op.iRegexp,
            // $notIRegexp: Sequelize.Op.notIRegexp,
            // $between: Sequelize.Op.between,
            // $notBetween: Sequelize.Op.notBetween,
            // $overlap: Sequelize.Op.overlap,
            // $contains: Sequelize.Op.contains,
            // $contained: Sequelize.Op.contained,
            // $adjacent: Sequelize.Op.adjacent,
            // $strictLeft: Sequelize.Op.strictLeft,
            // $strictRight: Sequelize.Op.strictRight,
            // $noExtendRight: Sequelize.Op.noExtendRight,
            // $noExtendLeft: Sequelize.Op.noExtendLeft,
            // $and: Sequelize.Op.and,
            // $or: Sequelize.Op.or,
            // $any: Sequelize.Op.any,
            // $all: Sequelize.Op.all,
            // $values: Sequelize.Op.values,
            // $col: Sequelize.Op.col,
        },
    })

    connectionHandler.set(name, {
        name,
        settings,
        handler,
        logger: settings.activityLogger || (() => {}),
    })
}

module.exports = init
