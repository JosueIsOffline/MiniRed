module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: 'cascade'
        })

        Posts.hasMany(models.Likes, {
            onDelete: 'cascade'
        })
    }
    // We're saying that a Post should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    // Posts.belongsTo(models.Users);

    return Posts
}