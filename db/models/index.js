const { User,UserSchema } = requiere('./user.model');

function setupModels(sequelize){
    User.init(UserSchema,User.config(sequelize));
}

module.exports = setupModels;