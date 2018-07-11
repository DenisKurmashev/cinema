module.exports = (mongoose, config) => {
    mongoose.connect(config.db.host, config.db.options);
    return mongoose;
};