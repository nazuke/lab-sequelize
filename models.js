/** BEGIN: Initialize Sequelize Database **************************************/
const Sequelize = require('sequelize');

const conn = new Sequelize(
  'macroscope',
  '',
  '',
  {
    dialect: 'sqlite',
    storage: 'database.sqlite'
  }
);
/** CEASE: Initialize Sequelize Database **************************************/

/** BEGIN: Project Model ******************************************************/
const Project = conn.define(
  'projects',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    indexes: []
  }
);
/** CEASE: Project Model ******************************************************/

/** BEGIN: Engine Model *******************************************************/
const Engine = conn.define(
  'engines',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    result_depth: {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: 1
    },
    result_selector: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    indexes: []
  }
);
/** CEASE: Engine Model *******************************************************/

/** BEGIN: Keyword Model ******************************************************/
const Keyword = conn.define(
  'keywords',
  {
    project_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: 'id'
      }
    },
    keyword: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    indexes: []
  }
);
/** CEASE: Keyword Model ******************************************************/

/** BEGIN: Ranking Model ******************************************************/
const Ranking = conn.define(
  'rankings',
  {
    project_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: 'id'
      }
    },
    engine_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Engine,
        key: 'id'
      }
    },
    rank: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    on_page_number: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    indexes: []
  }
);
/** CEASE: Ranking Model ******************************************************/

conn.sync();