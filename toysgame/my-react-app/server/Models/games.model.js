module.exports = (connection, DataTypes) => {

    const Games = connection.define(
      "Games",
      {

      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
    } ,
        imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    } ,   price: {
      type: DataTypes.INTEGER,
      allowNull: false
  } ,
      quantity: {
    type: DataTypes.INTEGER,
     defaulValue: 0,
}
    
      },{    timestamps: false
      }
    );
    return Games;
  };
  