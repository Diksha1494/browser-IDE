import Project from "../models/Project.js";

export const saveProject =
  async (req, res) => {
    try {
      const { files } = req.body;

      let project =
        await Project.findOne();

      if (!project) {
        project =
          new Project({
            name: "My IDE",
            files,
          });
      } else {
        project.files = files;

        project.markModified(
          "files"
        );
      }

      await project.save();

      console.log(
        "PROJECT SAVED"
      );

      res.json(project);
    } catch (error) {
      console.log(error);

      res.status(500).json(error);
    }
  };

export const loadProject =
  async (_req, res) => {
    try {
      const project =
        await Project.findOne();

      res.json(project);
    } catch (error) {
      console.log(error);

      res.status(500).json(error);
    }
  };