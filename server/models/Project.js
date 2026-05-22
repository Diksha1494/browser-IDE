import mongoose from "mongoose";

const projectSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,

        default: "My IDE",
      },

      files: {
        type: mongoose.Schema.Types.Mixed,

        default: {},
      },
    },

    {
      timestamps: true,
    }
  );

const Project =
  mongoose.model(
    "Project",
    projectSchema
  );

export default Project;